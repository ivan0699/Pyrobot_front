const url = "http://localhost:8000/user/create"

export async function sendData(data) {
    const settings = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: data.name,
            password: data.password,
            email: data.email
        })
    }
    const fetchResponse = await fetch(url, settings);
    return fetchResponse;
}

export function validateFields(data) {
    let errors = {};

    if (!data.name) {
        errors.name = 'User name is required.';
    }

    if (!data.email) {
        errors.email = 'Email is required.';
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'Invalid email. Ej: example@email.com';
    }

    if (!data.password) {
        errors.password = 'Password is required.';
    }
    else if (!/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*-)/g.test(data.password) || data.password.length < 8) {
        errors.password = 'Password must contain 1 lowecase, 1 uppercase, 1 number, 1 - and at least 8 characters'
    }

    return errors;
}