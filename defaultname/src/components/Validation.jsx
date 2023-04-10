import React, { useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useParams } from 'react-router-dom';
import { classNames } from 'primereact/utils';

import { sendValidation } from '../services/Validation.js';

export const RobotForm = () => {
    const {name} = useParams();

    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});


    // Formik
    const formik = useFormik({
        initialValues: {
            name: '',
            code: '',
        },
        validate: (data) => {
            let errors = {};

            if (!data.code) {
                errors.code = 'Codigo es requerido.';
            }

            return errors;
        },
        onSubmit: async (data) => {

            data.name = name;
            setFormData(data);
            try {
                let res = await sendValidation(data);
                let resJson = await res.json();
                if (res.status === 200) {
                    console.log(res.json())
                    setShowMessage(true);
                    formik.resetForm();
                } else {
                    console.log(resJson);
                }
            } catch (err) {
                console.log(err);
            }
        }
    });

    const isFormFieldValid = (code) => !!(formik.touched[code] && formik.errors[code]);
    const getFormErrorMessage = (code) => {
        return isFormFieldValid(code) && <small className="p-error">{formik.errors[code]}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;

    return (
        <div>

            <div className="form-demo">

                {/* Mensaje de éxito */}
                <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                    <div className="flex align-items-center flex-column pt-6 px-3">
                        <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                        <h5>Your account is validated <b>{formData.name}</b>.</h5>
                    </div>
                </Dialog>

                {/* Form */}
                <div className="flex justify-content-center">
                    <div className="card">
                        <form onSubmit={formik.handleSubmit} className="p-fluid">
                            <div className="field">
                                <span className="p-float-label">
                                    <InputText id="code" code="code" value={formik.values.code} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('code') })} />
                                    <label htmlFor="code" className={classNames({ 'p-error': isFormFieldValid('code') })}>Code</label>
                                </span>
                                {getFormErrorMessage('code')}
                            </div>
                            <Button type="submit" label="Validate" className="mt-2" />
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default RobotForm;
