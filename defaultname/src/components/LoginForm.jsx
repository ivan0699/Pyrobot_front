import React, {useState} from 'react';
import {sendData, validateInput} from '../services/LoginForm'
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Button } from 'primereact/button';
import '../services/LoginForm.js';
import '../style/LoginForm.css';

import { Dialog } from 'primereact/dialog';

export const LoginForm = () => {
    const [data, setData] = useState({
        username: '',
        password: ''
    })
    const [showAlert, setShowAlert] = useState(false);
    const [showError, setShowError] = useState(false);

    // const dispatch = useDispatch() // dispatch function
    // const {userState} = useSelector(state => state.user)

    const navigate = useNavigate();
    const handleInput = (event) => {
        console.log(data.username);
        setData({
            ...data,
            [event.target.name] : event.target.value //set data targeting name=""
        })
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let dataJSON = {
            name: data.username,
            password: data.password
        }
        let validated = validateInput(data.username,data.password);
        if (validated.empty && validated.inputMail){
            let response = await sendData(dataJSON);
            // dispatch(setUser(response.dataUser.access_token))
            
            localStorage.setItem("username",data.username);
            response.status===200 ?  navigate('/menu'): alert(response.info.detail)
           
            
        }
        else if (!validated.empty){
            setShowAlert(true);
        }
        else if(!validated.inputMail){
            setShowError(true)
        }

    }
    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Ok" icon="pi pi-times" onClick={() =>{setShowAlert(false); setShowError(false)} } className="p-button-text" />
            </div>
        );
    }

    return (
        <div className="card">
            <Dialog visible={showAlert} onHide={() => setShowAlert(false)} position="top" footer={renderFooter('displayBasic')} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center justify-content-center">
                    
                    <h2>Warning</h2>
                    <h3 style={{ lineHeight: 5.2, textIndent: '1rem' }}>
                        empty field detected
                    </h3>
                </div>
            </Dialog>
            <Dialog visible={showError} onHide={() => setShowAlert(false)} position="top" footer={renderFooter('displayBasic')} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center justify-content-center">
                <h2>Warning</h2>
                    <h3 style={{ lineHeight: 5.2, textIndent: '1rem' }}>
                        Don't use an email
                    </h3>
                </div>
            </Dialog>
            <div className='outter'>
                <h1 id="loginTitle">Login</h1>
            </div>
            <form className="loginForm " onSubmit={handleFormSubmit} >
                <div className="field-container">
                    <div className="field">

                        <input type="text" name="username" onChange={handleInput} />
                        <label>Username</label>
                        
                    </div>
                    <div className="field">   
                        
                        <input type="password" name="password" onChange={handleInput} />
                        <label>Password</label>
                        
                    </div>

                    <div className="signupLink">
                    Not registered? <a href="/registration">Sign up</a>
                    </div>
                </div>
                <div className='buttonContainer'>
                    <Button label="Sign In" aria-label="Submit"  />
                </div>
            </form>
        </div>
    );
}

export default LoginForm;