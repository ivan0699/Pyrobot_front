// Header: [ token: str ] Body: { name: str, rounds: int, games: int, min_players: int, max_players: int, password: str }
// In the new version, add robot's name and match's password
import {MainMenu} from '../components/mainMenu'
const url = 'http://127.0.0.1:8000/match/create'

function validationData(name,password,games,rounds,min_players,max_players,robot_name){

    let gamesBool = (games <= 200 && games > 0) ? true : alert("games between 1 and 200");
    let roundsBool = (rounds > 0 && rounds <=10000) ? true : alert("rounds between 1 and 10000")
    let minMaxBool = (min_players <= 4 && min_players >= 2) && (max_players <= 4 && max_players >= 2) && (min_players <= max_players) ? true : alert("min: 2 and max:4")

    let isCorrectData = gamesBool && roundsBool && minMaxBool

    console.log('el validationData dio: ', isCorrectData);
    console.log('los datos son: ',name,password,games,rounds,min_players,max_players,robot_name)
    return isCorrectData;
}

async function handleCreate(matchN,matchP,matchG,matchR,minP,maxP,robotN){
      
      const responseData = await createMatch(matchN,matchP,matchG,matchR,minP,maxP,robotN);

      console.log(responseData);
      let responseCode = responseData.code;
      
      if(responseCode===201){
        
        localStorage.setItem("MatchId", responseData.info.room_id);
        localStorage.setItem("MatchId:"+matchN,responseData.info.match_id);
        return responseCode

      }
      else{
        let detailMessage = responseData.info.detail[0].msg
        return detailMessage;
      }
}


export async function createMatch(game_name,game_password,game_games,game_rounds,game_min_players,game_max_players,robot_name){
    var noPassword = (game_password==='') ? true : false;

    const data = noPassword?  {name:game_name,
      games: game_games,
      rounds: game_rounds,
      num_players_min:game_min_players,
      num_players_max:game_max_players,
      owner_robot : robot_name
    }: 
    {name:game_name,
        games: game_games,
        rounds: game_rounds,
        num_players_min:game_min_players,
        num_players_max:game_max_players,
        owner_robot : robot_name,
        password: game_password
      }
      
    console.log('esto es data:', data);
    
    const config = {
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('UserT')}`
        },
        body: JSON.stringify(data)
    };


    try {
        const fetchResponse = await fetch(url,config);

        const data = await fetchResponse.json();

        const status = await fetchResponse.status;
        
        const infoFetch = {
          info: data,
          code: status
        }
        return infoFetch
    } catch(e) {
        return e;
    }
}




export const servicioPartida = {handleCreate,validationData}