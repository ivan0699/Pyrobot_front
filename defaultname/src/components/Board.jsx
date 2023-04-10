
import '../style/Board.css'
import React, {useEffect, useState, useRef} from 'react';
// import {setRobots} from '../services/SimulationService.js'
import { Button } from 'primereact/button';
import {getSimulation, InitSimulation, positionPair, roundDamage, pause, missilesPosition} from '../services/SimulationService'
export const Board = ({DataSimulation}) => {

  console.log(DataSimulation)
  const [robotElem, setRobot] = useState({
    robot1: null,
    robot2: null,
    robot3: null,
    robot4: null
  })
  console.log('En board el state es: ', DataSimulation);

  const simRobots = DataSimulation.robots; //extract from state option, robots array
  console.log('en Board simRobots es:', simRobots.length)
  
  const simRounds = DataSimulation.rounds; // extract from state option, rounds
  console.log('en Board simRounds es:', simRounds)

  // const setData = async () => {
  //   const jsonData = await getRobots()
  //   console.log(jsonData);
  //   setRobots(jsonData);
  // }
    const [elem, setElem] = useState(0);
    const [show, toggleShow] = useState(true);
    const [showCanvas, toggleShowCanvas] = useState(false);
    const [bars, setBars] = useState([])
    const [rounds, setRounds] = useState(simRounds)
    const [robots, setRo] = useState(simRobots)
    const [simulationInfo, setSimulationInfo] = useState()
    const [paused,setPaused] = useState(false);
    const [finished,setFinished] = useState(false);
    const canvas = useRef(null);






    useEffect(() => {
        //const game = document.getElementById("terrain");
        const game = canvas.current
        console.log(game);   
        const ctx = game.getContext("2d")
        const image = new Image()
        image.src = require("../services/battle.png")
        image.onload = () => {
          ctx.drawImage(image, 0, 0, 1000, 1000);
        }
        ctx.transform(1, 0, 0, -1, 0, 1000)

        setElem(ctx);
      }, []);


      const setData = async () =>{
        const terrainContext = elem

        var path 
        var damage
        var winner
        var missiles
        const robotsStatusRound = new Array();
        const missileStatusRound = new Array();
        const dataSim = await getSimulation(rounds, robots);
        // debugger;

        
        console.log("dea");
        if(dataSim[1].winner!=null){
            winner = dataSim[1].winner.name
        }
        else{
            winner = dataSim[1].winner
        }
           // si viene null no hay name

  
        const roundsGot = dataSim[0].length
        for(let i = 0; i < roundsGot ; i++){
          var round = dataSim[0][i].missiles
          missileStatusRound.push(round);//push round 0..n+1 info
        }
        console.log(dataSim);
        
        var cantRobots = robots.length;
        for(let i = 0; i < roundsGot ; i++){
            var round = dataSim[0][i].robots
            robotsStatusRound.push(round);//push round 0..n+1 info
        }

        path = positionPair(cantRobots, roundsGot, robotsStatusRound)
        damage = roundDamage(cantRobots, roundsGot, robotsStatusRound);
        missiles =  missilesPosition(cantRobots, roundsGot, missileStatusRound)
        

        var initPos = new Array();
        for(let i=0; i<cantRobots; i++){
          initPos.push(path[i][0])
        }
        setSimulationInfo([path,damage,winner,initPos,roundsGot,missiles]);
        console.log(damage);
        console.log(path);
        localStorage.setItem("simRound",1);
        localStorage.setItem("intervalRound",0);
        InitSimulation(path, initPos, damage, terrainContext, roundsGot, cantRobots, updateBar, winner,missiles);
      }
      // async function setData(){
      //   // debugger;
        
      //   setData(ctx,updateBar,rounds,robots);
      // }
      
    const updateBar = (damage,cantRobots,winner,totalRound) => {

      var health = new Array()
      let round = localStorage.getItem("simRound");
      round = parseInt(round);
      for (let i = 0 ; i<cantRobots; i++){
        health.push(damage[i][round])
      }
      let info ={
        damage : health,
        cantPlayers: cantRobots,
        robots: simRobots
      }
      setBars(<HealthBar info={info} />)
      console.log(round+"  "+totalRound);

      localStorage.setItem("simRound",round+1);
      setTimeout(() => {
        if(round === totalRound-1){
          setFinished(true);
          if(winner === null){
            alert("DRAW");
          }
          else{
            alert("THE WINNER IS: "+winner);
          }
          
        }
  
      }, 300);


    }
    const resumeCaller = () =>{
      let lastPos = JSON.parse(localStorage.getItem("lastPosition"));
      // debugger;
      InitSimulation(simulationInfo[0], lastPos, simulationInfo[1], elem, simulationInfo[4], robots.length, updateBar, simulationInfo[2],simulationInfo[5]);
    }
    const restart = () =>{
 
      setBars([])
      setFinished(false);
      localStorage.setItem("simRound",1);
      InitSimulation(simulationInfo[0], simulationInfo[3], simulationInfo[1], elem, simulationInfo[4], robots.length, updateBar, simulationInfo[2],simulationInfo[5]);

    }

  return (
    <div className='globalTable'>


         
          {bars}
          {finished ? <Button className='restart' onClick={()=>{restart()}}>Restart</Button>:null}
          {/* <i class="fa-solid fa-play"></i> */}
          {paused?<i id='resume' class="fa-solid fa-play" onClick={()=>{resumeCaller();setPaused(false)}}></i>:null}
          {!paused?<i id='pause' class="fa-solid fa-pause" onClick={()=>{pause();setPaused(true)}}></i>:null}
 
          {show?<Button className='start' onClick={() =>{ toggleShow(false); toggleShowCanvas(true); setData()}}>START</Button>:null}

        <div className='box-board'>

            <div id="board" >

                <canvas ref={canvas} height={1000} width={1000} id="terrain" data-testid="canvas"  style={{visibility: showCanvas ? 'visible' : 'hidden' }}></canvas>
   
            </div>
        </div>
        
    </div>
  )
}
const HealthBar = ({info}) => {

  const [robotElem, setRobot] = useState([])
  let cantRobots = info.damage.length

  for (let i=0 ; i<4;i++){
    if(i>cantRobots-1){
      robotElem.push('none');
    }
    else{
      robotElem.push('block');
    }
    
  }

  
      
  return (
    <div className='bars'>
    <div className='robot0-bar'>
      <span className='robot0-PH' style={{display: robotElem[0]}}>{info.robots[0]}</span> 
      <progress id="health" style={{display: robotElem[0]}} value={info.damage[0]} max="100"></progress>
    </div>

    <div className='robot1-bar'>
      <span className='robot1-PH' style={{display: robotElem[1]}}>{info.robots[1]}</span> 
      <progress id="health" style={{display: robotElem[1]}} value={info.damage[1]} max="100"></progress>
    </div>
    <div className='robot2-bar'>
      <span className='robot2-PH' style={{display: robotElem[2]}}>{info.robots[2]}</span> 
      <progress id="health" style={{display: robotElem[2]}} value={info.damage[2]} max="100"></progress>
    </div>
    <div className='robot3-bar'>
      <span className='robot3-PH' style={{display: robotElem[3]}}>{info.robots[3]}</span> 
      <progress id="health" style={{display: robotElem[3]}} value={info.damage[3]} max="100"></progress>
    </div>
    </div>
  )
}

export default Board