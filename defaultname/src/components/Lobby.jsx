import '../style/Lobby.css'
import React, {useRef, useEffect, useState} from 'react';


import {startMatch, leaveMatch} from '../services/MatchStartLeave'


export const Lobby = ({info, pop}) => {
    
 
  
    const [nameMatch, setNameMatch] = useState(info.matchName)
    const [owner, setOwner] = useState(info.ownerBool);
    const [started, setStarted] = useState(false);
    const [disconnected, setDisconnected] = useState(false);
    const [resultMatch, setResultMatch] = useState([]);
    const [names, setNames] = useState(JSON.parse(localStorage.getItem("lobby:"+info.matchName)))
    const joinedBox = useRef(null);
 
    
    useEffect(() => {
        
        let id_room = localStorage.getItem('MatchId')
        const webSocket = new WebSocket(`ws://localhost:8000/ws/${id_room}`)
        webSocket.onmessage = function (event) {

            console.log(event.data);

            var content = JSON.parse(event.data)
            
 
            // debugger
            // if(content.match === nameMatch){
                if(content.hasOwnProperty('winner')){
                    let startedBoolNew = "true";
                    let finishedBool = "true"
                    localStorage.setItem("Sj"+nameMatch,startedBoolNew);
                    localStorage.setItem("Finished"+nameMatch,finishedBool); // so the use effect will know
                    localStorage.setItem("winner"+nameMatch,content.winner);
                    setStarted(true);
                    updateResults(content); 
    
                    webSocket.close();
                }
            // }

            if(content.hasOwnProperty('user')){
                let myUsername = localStorage.getItem("username");
                
                if (content.user === myUsername ){
                    console.log("me van a desconectar")
                    webSocket.close();
                }
                
            }
            // if(content.winner){ // check if the match is started with his name to check

            // }
            //console.log(typeof(content) + "--> "+ content);

            if(content.name === nameMatch){
    
                let cantPlayers = Object.keys(content.robots).length; // get cant players in match
                var players = new Array(4);
                var playersAvatar = new Array(4);
                var hasAvatar = false;
                for(let i = 0; i<cantPlayers ;i++){
                    //players.push(content.robots[i].owner_name) // get players
                    players[i]=content.robots[i].owner_name;
                    hasAvatar =  (content.robots[i].avatar !=null);
                    debugger;
                    playersAvatar[i]= hasAvatar?"http://localhost:8000"+content.robots[i].avatar:require('../style/blank-profile.png');
                    // console.log("poroto "+pla)
                    console.log("los players fueron: "+players[0]);
                } 
     
                let playerList = {
                    player1:{
                        name:players[0],
                        avatar:playersAvatar[0]
                    },
                    player2:{
                        name:players[1],
                        avatar:playersAvatar[1]
                    },
                    player3:{
                        name:players[2],
                        avatar:playersAvatar[2]
                    },
                    player4:{
                        name:players[3],
                        avatar:playersAvatar[3]
                    }
                }
                localStorage.setItem("lobby:"+nameMatch,JSON.stringify(playerList));
                setNames(playerList);
                console.log(names);
            }
        }

      }, []);

    const updateResults = (results)=>{
        //debugger;
       
        setStarted(true);
        if(results.winner===null){
            let winner = {
                robot:'DRAW',
                owner:''
            }
            setResultMatch([<Results winner={"DRAW"} pop={pop} idMatch={nameMatch}/>])
            console.log(resultMatch);
        }
        else{
            let winner = {
                robot:results.winner.name,
                owner:results.winner.owner
            }
            setResultMatch(<Results winner={winner}/>)
        }
        
    }
    const handleStart = () =>{

        setStarted(true);
        let startedBool = "true"
        localStorage.setItem("S"+nameMatch,startedBool);
        
        let idMatch = localStorage.getItem("MatchId:"+info.matchName)
        console.log(idMatch) // hacer post a create
        startMatch(idMatch)


    }

    const popCaller = ()=>{
        debugger;
        pop(nameMatch);
    }
    const handleLeave = () =>{
        //debugger;
        let idMatch = localStorage.getItem("MatchId:"+info.matchName)
        leaveMatch(idMatch);

        setDisconnected(true);
        
        
    }
  return (

            <div  className='lobbyBox'  style={{display: disconnected }}>
                <div className='titleMatch'>
                <h1>{nameMatch}</h1>
                </div>
                
                {!started?<div ref={joinedBox} className='joinedBox'>
                    
                <div className='containerPlayer'>
                    
                    <div className='playerBox'>
                    {/* <img className='crown' src={require("../style/owner.png")} /> */}
                    <div className='playerAvatar'>
                        <img src={names.player1.avatar} alt=""></img>
                    </div>
                    <div className='playerUsername'><h4>{names.player1.name}</h4></div>

                    </div>
                    <div className='playerBox'>
                        <div className='playerAvatar'>
                            <img src={names.player2.avatar} alt=""></img>
                        </div>
                        <div className='playerUsername'><h4>{names.player2.name}</h4></div>
                    </div>
                    <div className='playerBox'>
                        <div className='playerAvatar'>
                            <img src={names.player3.avatar} alt=""></img>
                        </div>
                        <div className='playerUsername'><h4>{names.player3.name}</h4></div>
                    </div>
                    <div className='playerBox'>
                        <div className='playerAvatar'>
                            <img src={names.player4.avatar} alt=""></img>
                        </div>
                        <div className='playerUsername'><h4>{names.player4.name}</h4></div>
                    </div>
                </div>
                    
                </div>:null}
                {!started ?<div className='buttonBox'>
                    {owner  ?<button className='initButton' onClick={()=>{handleStart()}}>Start</button> : null}
                    {!owner ?<button className='leaveButton' onClick={()=>{handleLeave()}}>Leave</button> : null}
                </div>:resultMatch}
                {disconnected?<Disconnected/>:null}

            </div>

  );
}



const Results = ({winner,pop,idMatch}) => {
    debugger;
    const [who, setWho] = useState(winner.robot)
    const popCaller = ()=>{
        pop(idMatch)
    }
    return (
        <div className='final-container'>
            <button className='closeButton' onClick={()=>{popCaller()}}>close</button>
            <div className='containerResult'>
                
                <h1>WINNER</h1>
                <div className='boxResult'>
                    <h1>{who}</h1>
                </div>
            </div>
        </div>
    );
}
  
const Disconnected = () => {

    return (
        <div className='disconnection'>
            <h1>Disconnected</h1>
        </div>
    );
}
  