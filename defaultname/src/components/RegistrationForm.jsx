import React, { useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';

import '../services/RegistrationService';
import '../style/RegistrationForm.css';
import { sendData, validateFields } from '../services/RegistrationService';

export const RegistrationForm = () => {

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState("");

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validate: (data) => validateFields(data),
        onSubmit: async (data) => {
            setFormData(data);
            try {
                let res = await sendData(data);
                let resJson = await res.json();
                if (res.status === 201) {
                    setShowSuccess(true);
                    formik.resetForm();
                } else {
                    setError(resJson.detail)
                    setShowError(true);
                }
            } catch (err) {
                console.log(err);
            }   
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => {setShowSuccess(false); setShowError(false)}} /></div>;
    const passwordHeader = <h6>Elija una contraseña</h6>;

    return (
        <div className="form-demo">
            
            {/* Mensaje de éxito */}
            <Dialog visible={showSuccess} onHide={() => setShowSuccess(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Succesful</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your account was registerd as <b>{formData.email}</b>. We have sent you a confirmation email.
                    </p>
                </div>
            </Dialog>
            <Dialog visible={showError} onHide={() => setShowError(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-times-circle" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
                    <h5>Oops!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        {error}
                    </p>
                </div>
            </Dialog>

            {/* Form */}
            <div className="flex justify-content-center">
                <div className="card">
                    <div className='outter'>
                        <h1 id="titleRegistration">Register</h1>
                    </div>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="name" name="name" value={formik.values.name} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                                <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>Nombre de usuario</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Email</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask
                                    className={classNames({ 'p-invalid': isFormFieldValid('password') })} header={passwordHeader} />
                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Contraseña</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                        <Button type="submit" label="Registrarse" className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegistrationForm;