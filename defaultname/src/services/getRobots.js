const url = 'http://127.0.0.1:8000/robot/list'

export async function getRobots(data) {
    const settings = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('UserT')}`
        }
    }

    const fetchResponse = await fetch(url, settings); //fetch with settings
    const res = await fetchResponse.json();
    return (res);

}

