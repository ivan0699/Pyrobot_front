import React, { useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import { FileUpload } from 'primereact/fileupload';
import utf8 from 'utf8'
import '../style/CreateRobot.css'
import '../services/CreateRobot.js';
import { sendRobot } from '../services/CreateRobot.js';

export const RobotForm = () => {

    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [base64Content, setBase64Content] = useState("");
    const [ext, setExt] = useState("");
    const [visibleFullScreen, setVisibleFullScreen] = useState(false);

    const customBase64Uploader = async (event) => {
        // convert file to base64 encoded
        const file = event.files[0];
        const reader = new FileReader();



        reader.readAsDataURL(file);

        reader.onloadend = function () {
            var base64data = reader.result.split(',').pop();
            base64data = utf8.decode(base64data);
            setBase64Content(base64data);
            setExt((file.type).split('/').pop());
        };
    };

    // Formik
    const formik = useFormik({
        initialValues: {
            name: '',
            code: '',
            avatar: {
                ext: '',
                content: ''
            }
        },
        validate: (data) => {
            let errors = {};

            if (!data.name) {
                errors.name = 'Nombre de robot es requerido';
            }

            if (!data.code) {
                errors.code = 'Codigo es requerido.';
            }

            return errors;
        },
        onSubmit: async (data) => {
            data.avatar.ext = ext;
            data.avatar.content = base64Content;
            setFormData(data);
            try {
                let res = await sendRobot(data);
                debugger;
                if (res.status === 201) {
                  

                    setShowMessage(true);
                    formik.resetForm();
                } else {
                    console.log("Some error occured");
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

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;

    return (
        <div className='containerCR'>
                <div className="form-demo">

                    {/* Mensaje de éxito */}
                    <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                        <div className="flex align-items-center flex-column pt-6 px-3">
                            <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                            <h5>Your robot has been created</h5>
                            <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                            Your robot has been created with the name of <b>{formData.name}</b>
                            </p>
                        </div>
                    </Dialog>

                    {/* Form */}
                  
                 
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="field1">
                           
                                <input type="text" placeholder='Robot Name' id="name" name="name" value={formik.values.name} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
     
                     
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="field2">
                            <span className="p-float-label">
                                <InputTextarea  rows={14} id="code" data-testid="code" name="code" value={formik.values.code} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('code') })} />
                                <label htmlFor="code" className={classNames({ 'p-error': isFormFieldValid('code') })}>Code</label>
                            </span>
                            {getFormErrorMessage('code')}
                        </div>
                        <div className='field3'>
                        <FileUpload  auto={true} data-testid="upload" maxFileSize={5 * 1024 * 1024 /*5 mega*/}
                            accept="image/*" customUpload={true} uploadHandler={customBase64Uploader}
                            invalidFileSizeMessageSummary="Tu imagen es muy grande"
                            invalidFileSizeMessageDetail="El maximo tamaño permitido para una imagen son 5MB" />
                        </div>
                        <div className='upload'>
                        <Button type="submit" label="Upload" className="mt-2" />
                        </div>
                    </form>
                </div>
                    

            
        </div>
    );
}

export default RobotForm;
