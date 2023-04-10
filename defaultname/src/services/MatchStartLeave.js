export async function startMatch(match_id){
    const settings = {
        method: 'POST',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("UserT")}`, 
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            id:match_id
        })
    };
  
    try {
        //debugger;
        const fetchResponse = await fetch(`http://127.0.0.1:8000/match/start`, settings); //fetch with settings
        const data = await fetchResponse.json();
        //console.log(data);
        const status = await fetchResponse.status;
        console.log(status);
        // if(status != 200){
        //     console.log(data);
        // }

    } catch (e) {
        return e;
    }    
}

export async function leaveMatch(match_id){
    const settings = {
        method: 'POST',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("UserT")}`, 
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            id:match_id
        })
    };
  
    try {
        
        const fetchResponse = await fetch(`http://127.0.0.1:8000/match/leave/`, settings); //fetch with settings
        const data = await fetchResponse.json();
        //console.log(data);
        const status = await fetchResponse.status;
        console.log(status);
        console.log(data);
        // if(status != 200){
        //     console.log(data);
        // }

    } catch (e) {
        return e;
    }    
}
