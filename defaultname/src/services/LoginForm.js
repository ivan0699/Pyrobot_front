'use strict'

const url = 'http://127.0.0.1:8000/user/login'

export function validateInput(usernameField,passwordField){
    let validationBool ={
        empty: true,
        inputMail:true
    };
    if( (usernameField == '') && (passwordField == '') ){
        console.log(usernameField);
       
        validationBool.empty = false; 
    }
    if(/\S+@\S+\.\S+/.test(usernameField)){
        validationBool.inputMail = false;
    }

    return validationBool;
}


export async function sendData(data){

    let usernameField=data.name;
    let passwordField=data.password;

    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(
        `grant_type=&username=${usernameField}&password=${passwordField}&scope=&client_id=&client_secret=`
      )
    };

   
    const fetchResponse = await fetch(url, settings); //fetch with settings

    const response = await fetchResponse.json();

    const status = await fetchResponse.status;
    console.log(response);
    if(status === 200){
        localStorage.setItem("UserT", response.access_token);
    }
    let userState = {
        status: status,
        info: response
    }
    return(userState);
  
     
}