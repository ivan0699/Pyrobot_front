import {servicioPartida} from '../services/createGame';
import React, { useState, useEffect } from 'react';

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import {getRobots} from '../services/JoinMatch.js'
import '../style/createGame.css'



export const CreateGame = ({spawnLobby,showLobby}) => {
    console.log('Hola estoy en CreateGame')

     
    const [selectedRobot, setSelectedRobot] = useState(null);
    const [robotsPlayer, setRobots] = useState(null);

    const [matchName, setMatchName] = useState('Partida')

    useEffect(() => {
        setData(); //get robot to dropdown
      }, []);

      const setData = async () => {
        const jsonData = await getRobots() //receive json robots
        console.log(jsonData);
        setRobots(jsonData);
      }

    
      const robots = robotsPlayer
      const onRobotChange = (e) => {

        setSelectedRobot(e.value); //set state robot on change
      }
    const handleMatchName = event => {
        setMatchName(event.target.value);
    }

    const [matchPassword, setMatchPassword] = useState("")

    const handleMatchPassword = event => {
        setMatchPassword(event.target.value);
    }

    const [matchGames, setMatchGames] = useState('0')   

    const handleMatchGames = event => {
        setMatchGames(event.target.value);
    }

    const [matchRounds, setMatchRounds] = useState('0')

    const handleMatchRounds = event => {
        setMatchRounds(event.target.value);
    }

    const [maxPlayers, setMaxPlayers] = useState('0')

    const handleMaxPlayers = event => {
        if(event.target.value <= 4 && event.target.value >= 2){
            setMaxPlayers(event.target.value);
        } 
    }

    const [minPlayers, setMinPlayers] = useState('0')

    const handleMinPlayers = event => {
        if(event.target.value <= 4 && event.target.value >= 2){
            setMinPlayers(event.target.value);
        }
    }

    const handleCreateMatch = async (matchN,matchP,matchG,matchR,minP,maxP,robotN) => {
        console.log('antes de la funcion es:',matchN,matchP,matchG,matchR,minP,maxP,robotN)
        if(servicioPartida.validationData(matchN,matchP,matchG,matchR,minP,maxP,robotN)){
           let status = await servicioPartida.handleCreate(matchN,matchP,matchG,matchR,minP,maxP,robotN.name);
            //debugger;
           if(status==201){ 
                console.log(status);
                setTimeout(()=>{
                    spawnLobby(matchN,true);
                    showLobby('LC');
                    },500)
           }
           else{
                alert(status);
           }
        }
    }

    return (

           

                <div className='SettingMatch'>
                    <input type='text' placeholder='Match Name' onChange={handleMatchName}></input>
                    <input type='text' placeholder='Password' onChange={handleMatchPassword}></input>

                    <h2>Games</h2>
                    <input className='slider' data-testid="games" type="range" min="0" max="200" step="1" data-label="Games: " onChange={handleMatchGames}/>
                    <div className='description'>{matchGames}</div>
                    <h2>Rounds</h2>
                    <input className='slider' data-testid="rounds" type="range" min="0" max="10000" step="1" data-label="Rounds: " onChange={handleMatchRounds}/>
                    <div className='description'>{matchRounds}</div>
                    <h2>Max Players</h2>
                    <input className='slider' data-testid="max" type="range" min="2" max="4" step="1" data-label="Max: " onChange={handleMaxPlayers}/>
                    <div className='description'>{maxPlayers}</div>
                    <h2>Min Players</h2>
                    <input className='slider' data-testid="min" type="range" min="2" max="4" step="1" data-label="Min: " onChange={handleMinPlayers}/>
                    <div className='description'>{minPlayers}</div>
                    
                    <div className='list-CM-container'>
                    <Dropdown className='list-CM' data-testid="droprobot" value={selectedRobot} options={robots} onChange={onRobotChange} optionLabel="name" placeholder="Select your Robot" />
                    </div>
                   {/* <Dropdown optionLabel="name" value={robotSelected} options={listRobots} onChange={(elem)=>{handleRobot(elem.value)}} /> */}
                   <Button className='submitButton' label='Create' onClick={()=>{handleCreateMatch(matchName,matchPassword,matchGames,matchRounds,minPlayers,maxPlayers,selectedRobot)}}></Button>
                </div>

 
       

    
                
  
    );

}
