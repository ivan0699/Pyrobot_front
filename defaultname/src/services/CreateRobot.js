const url = 'http://127.0.0.1:8000/robot/create'

export async function sendRobot(data){
    console.log(data);
    const settings = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('UserT')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: data.name,
            code: data.code,
            avatar:{
                content: data.avatar.content,
                ext: data.avatar.ext
            } 
        })
    };

    const fetchResponse = await fetch(url, settings);
    const response ={
        data: fetchResponse.json(),
        status: fetchResponse.status
    }
    return response
}
