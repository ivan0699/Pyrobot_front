export async function getRobots(){

    const settings = {
        method: 'GET',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("UserT")}` // copiado desde una pagina de curl to fetch (RESOLVER DEVUELVE 401)
        }
    };
  
    try {
        const fetchResponse = await fetch('http://127.0.0.1:8000/robot/list', settings); //fetch with settings
        const data = await fetchResponse.json();
        const status = await fetchResponse.status;
        console.log(status);
        return data;
    } catch (e) {
        return e;
    }    
}
export async function joinPlayer(match_id,robot,password){
    const settings = {
        method: 'POST',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("UserT")}`, 
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            id: match_id,
            robot: robot,
            password: password
        })
    };
  
    try {
        const fetchResponse = await fetch(`http://127.0.0.1:8000/match/join`, settings); //fetch with settings
        const data = await fetchResponse.json();
        console.log(data);
        const status = await fetchResponse.status;
        console.log(status);
        const infoFetch = {
            code : status,
            response : data
        }
        
        
        // if(status != 200){
        //     console.log(data);
        // }
        
        return infoFetch;
    } catch (e) {
        return e;
    }    
}

