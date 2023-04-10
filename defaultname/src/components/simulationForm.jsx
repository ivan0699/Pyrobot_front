import React, { useState, useEffect} from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import {useNavigate} from 'react-router-dom'
import {getRobots} from '../services/JoinMatch.js'
import '../style/simulationForm.css'
export const Simulation = ({showService,handleBoardData}) =>{

    useEffect(() => {
        setData(); //get robot to dropdown
        console.log("PASE POR USEEFFECT HELPP")
      }, []);
 


    const [selectedRobot, setSelectedRobot] = useState({
        robot0:'',
        robot1:'',
        robot2:'',
        robot3:''

    });
    const [robotsPlayer, setRobots] = useState(null);



    const [simRounds, setSimRounds] = useState(0)
    const handleRounds = event =>{
        setSimRounds(event.target.value) // the usestate rerender so it changes 
    };

    const [nameRobots, setNameRobots] = useState('')
    
    const handleNameRobots = event => {

    }

    const handleCreateSim = (simRounds, nameRobots) => {
        var arrayRobot = new Array()
        arrayRobot = [nameRobots.robot0.name,nameRobots.robot1.name,nameRobots.robot2.name,nameRobots.robot3.name]
        arrayRobot =  arrayRobot.filter(elm => elm)
        console.log(arrayRobot);
        const data = {rounds: simRounds,
                      robots: arrayRobot
                     };

        localStorage.setItem("simulationData",JSON.stringify(data));
        handleBoardData(data);
        setTimeout(()=>{
            showService('S');
            },1000)
        
        //navigate("/simulation", {state: data})

    }


      const setData = async () => {
        const jsonData = await getRobots() //receive json robots
        console.log(jsonData);
        setRobots(jsonData);
      }

    
      const robots = robotsPlayer
      const onRobotChange0 = (e) => {
        setSelectedRobot({
            ...selectedRobot,
            [e.target.name] : e.target.value //set data targeting name=""
        }) //set state robot on change
        console.log(selectedRobot)
      }
      const onRobotChange1 = (e) => {

        setSelectedRobot({
            ...selectedRobot,
            [e.target.name] : e.target.value //set data targeting name=""
        }) //set state robot on change
      }
      const onRobotChange2 = (e) => {

        setSelectedRobot({
            ...selectedRobot,
            [e.target.name] : e.target.value //set data targeting name=""
        }) //set state robot on change
      }
      const onRobotChange3 = (e) => {

        setSelectedRobot({
            ...selectedRobot,
            [e.target.name] : e.target.value //set data targeting name=""
        }) //set state robot on change
      }
    return(
        <div className='SettingSimulation'>


            <div className='progress'>
                <h4>Rounds Number</h4>
                <h4> {simRounds}</h4>
                <input className='slider' data-testid="roundsSlider" type="range" min="0" max="10000" step="1" data-label="Amount: " onChange={handleRounds}/>
            </div>
            <div class="custom-select" >
                <Dropdown className='list' data-testid="dropdown0" name="robot0" value={selectedRobot.robot0} options={robots}  optionLabel="name" onChange={onRobotChange0} placeholder="Select your Robot" />
                <Dropdown className='list' data-testid="dropdown1" name="robot1" value={selectedRobot.robot1} options={robots} onChange={onRobotChange1} optionLabel="name" placeholder="Select your Robot" />
                <Dropdown className='list' data-testid="dropdown2"  name="robot2" value={selectedRobot.robot2} options={robots} onChange={onRobotChange2} optionLabel="name" placeholder="Select your Robot" />
                <Dropdown className='list' data-testid="dropdown3"  name="robot3" value={selectedRobot.robot3} options={robots} onChange={onRobotChange3} optionLabel="name" placeholder="Select your Robot" />
            </div>

            <div className='buttonCont'>
                <Button className='simulateButton'  data-testid="button" label='Simulate' onClick={()=>{handleCreateSim(simRounds, selectedRobot);}}></Button>
            </div>



                
        </div>
        
    );

}