//Solicitar info Usuario
export async function getUserInfo() {
    const settings = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('UserT')}`
        }
    }

    const fetchResponse = await fetch('http://127.0.0.1:8000/user/profile', settings); 
    const res = await fetchResponse.json();
    return res;
}

//Solicitar cambio de imagen
async function changeProfilePic(ext_fromForm, content_fromForm) {
    console.log("============== Servicio ============")
    console.log(ext_fromForm);
    console.log(content_fromForm);
    const settings = {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('UserT')}`
        },
        body: JSON.stringify({
            avatar:{
                ext: ext_fromForm,
                content: content_fromForm
            }
        })
    }
    const fetchResponse = await fetch('http://127.0.0.1:8000/user/avatar', settings);
    return fetchResponse;
}

//Solicitar cambio de contraseña
async function changePassword(newPasswordFromForm) {
    debugger;
    const settings = {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('UserT')}`
        },
        body: JSON.stringify({
            password: newPasswordFromForm
        })
    }
    const fetchResponse = await fetch('http://127.0.0.1:8000/user/password', settings);
    console.log(fetchResponse.json())
    return fetchResponse.status;
}



export const servicioPerfil = {getUserInfo,changeProfilePic,changePassword}