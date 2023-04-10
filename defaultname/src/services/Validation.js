const url = 'http://127.0.0.1:8000/user/validation'

export async function sendValidation(data){
    console.log(data);
    const settings = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: data.name,
            code: data.code 
        })
    };
    const fetchResponse = await fetch(url, settings);
    return fetchResponse;
}
