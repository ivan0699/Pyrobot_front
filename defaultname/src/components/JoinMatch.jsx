
import '../style/JoinMatch.css'
import React, {useEffect, useState} from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import {getRobots, joinPlayer} from '../services/JoinMatch.js'

export const JoinMatch = ({name, id, spawnLobby, hideDialog,showLobby}) => {
  const [selectedRobot, setSelectedRobot] = useState(null);
  const [robotsPlayer, setRobots] = useState(null);
  const [nameMatch, setNameMatch] = useState(name)
  const [password, setPassword] = useState('');
  // const [ID, setId] = useState(matchId);
  // console.log(ID)
  useEffect(() => {
    setData(); //get robot to dropdown
  }, []);
  const setData = async () => {
    const jsonData = await getRobots()
    console.log(jsonData);
    setRobots(jsonData);
  }
  const OnChangePassword = (event) => {
    console.log(password);
    setPassword({[event.target.name] : event.target.value})
  }

  const robots = robotsPlayer
  const onRobotChange = (e) => {
    console.log(selectedRobot)
    setSelectedRobot(e.value); //set state robot on change
  }
  const join = async () =>{
    var info = await joinPlayer(id,selectedRobot.name,password.password);
    console.log(info);
    if (info.code===200){

      localStorage.setItem("MatchId",info.response.room_id);
      localStorage.setItem("MatchId:"+nameMatch,info.response.match_id);
      hideDialog();
      spawnLobby(nameMatch,false);
      showLobby('LC');
     //createMatchWS(info.response.room_id);

      
    }

  }
  return (
        <div className='containerJM'>

              <h1>Joining to {nameMatch}</h1>
              <div className='robotList'>
                  <Dropdown id="list" value={selectedRobot} options={robots} onChange={onRobotChange} optionLabel="name" placeholder="Select your Robot" />
                  <input type="password" name='password' onChange={OnChangePassword} placeholder="Password" className='passwordInput'></input>
              </div>
              <div className='buttonCenter'>
                <Button className='joinButton' label='Join' onClick={()=>{join()}} ></Button>
              </div>

        </div>
  );
}
export default JoinMatch