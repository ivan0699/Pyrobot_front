const url = 'http://localhost:8000/match/list'
export async function getMatchs(){
        const settings = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('UserT')}`
            }
        }
        const fetchResponse = await fetch(url, settings)
        const response = await fetchResponse.json()
        const status = await fetchResponse.status
        return response
    }

