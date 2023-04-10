import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
//import components 
import {CreateGame} from './createGame.jsx';
// import {Profile} from './profile.jsx';
import {RobotForm} from './CreateRobot.jsx';
import {Lobby} from './Lobby.jsx';
import {DataTableMatchs} from './DatatableMatchs.jsx'
import {JoinMatch} from './JoinMatch.jsx';
import {Board} from './Board.jsx'
import { Simulation } from './simulationForm.jsx';
import {Profile} from './profile.jsx'
// temporal components
// import {CrearRobot} from './crearBot.jsx';
// import {Board} from './Board.jsx';


//stylesheet
import '../style/mainMenu.css'
import '../style/fontawesome-free-6.1.1-web/css/all.css'



export const MainMenu = () => {

    
    console.log('Hola estoy en mainMenu correctamente')
    const [lobbyCount, setLobbyCount] = useState(0);
    const [lastLobby, setLastLobby] = useState('');
    const [lobbyArray, setLob] = useState([]);
    const [dialog, setDialog] = useState([]);
    const [matchs, setMatchs] = useState([])
    const [listComponent,setListComponent] = useState([])
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [servicesToggleShow, setServicesToggleShow] = useState([
        {id:'CR',bool:false},
        {id:'CS',bool:false},
        {id:'CM',bool:false},
        {id:'FM',bool:false},
        {id:'LC',displaya:'none'},
        {id:'JM',bool:false},
        {id:'S',bool:false},
        {id:'P',bool:false}
    ])
    const [boardData,setBoardData] = useState()
    console.log(lobbyArray);
    useEffect(() => {
      }, []);


    const handleNameLobby = (event) =>{
        setLastLobby({[event.target.name] : event.target.value})//set data targeting name="")
        console.log(lastLobby);
    }
    const handleBoardData = (data)=>{
        setBoardData(data)
    }
    const showService = (serviceKey)=>{

        const triggeredItems = servicesToggleShow.map((item) => {

          if (item.id !== serviceKey) {// if lobby selected is not equal then hide
            item.bool = false;
            item.displaya='none'
          }
          else{
            item.bool = true;
            item.displaya='block'
          }
    
          return item;
        });
    
        setServicesToggleShow(triggeredItems); 
    }
    const popLobby = (Id) =>{
        debugger;
        console.log(Id);
        console.log(lobbyArray);
        setLob(lobbyArray.filter(x=>{
            return x.id != Id
        }))
        console.log(lobbyArray);
    }
    const spawnLobby = (name,isOwner) => {
        setMatchs([...matchs,{match:name}]);
        let info ={
            matchName: name,
            ownerBool: isOwner
           }
       //id={localStorage.getItem('MatchId')}
        let lobby = {
            id: name,
            component: <Lobby info={info} pop={popLobby} />, 
            isVisible: true
        }
        let playerList = {
            player1:{
                avatar:require('../style/nullPic.png')
            },
            player2:{
                avatar:require('../style/nullPic.png')
            },
            player3:{
                avatar:require('../style/nullPic.png')
            },
            player4:{
                avatar:require('../style/nullPic.png')
            }
        }
        let startedBool = "false"
        localStorage.setItem("S"+name,startedBool); //Started for owner
        localStorage.setItem("Sj"+name,startedBool); // started for joiner
        localStorage.setItem("socketC"+name,startedBool); // started socket
        localStorage.setItem("Finished"+name,startedBool); // not finished
        localStorage.setItem("winner"+name,startedBool);
        localStorage.setItem("lobby:"+name,JSON.stringify(playerList)); //initial lobby state
        setLob([...lobbyArray, lobby])
        

        setLobbyCount(setLobbyCount+1);
        
        
    }

    const spawnJoin = (name, idMatch) =>{
        showService('JM')
        let dialog ={
            id: name,
            component: <JoinMatch name={name} id={idMatch} spawnLobby = {spawnLobby} hideDialog={hideDialog} showLobby={showService} />,
            isVisible: true
        }
        setDialog([dialog])
    }
    const handleClick = (name) => {
        console.log(lobbyArray);
        const triggeredItems = lobbyArray.map((item) => {

          if (item.id !== name) {// if lobby selected is not equal then hide
            item.isVisible = false;
          }
          else{
            item.isVisible = true;
          }
    
          return item;
        });
    
        setLob(triggeredItems);
      };



    const navigate = useNavigate();

    const hideDialog = () => {
        const updateDialog = dialog.map((item) => {
            item.isVisible = false;
            return item;
          });
          setDialog(updateDialog);

    }

    // const seta = (valor) =>{

    //     setSelectedMatch(valor.match);

    // }

    return(
        <div className='global'>
                
                <nav>
                    <h1 onClick={()=>{hideDialog()}}>PY-ROBOTS</h1>
                    <div className='userPortrait'>
                        <img src={require('../style/blank-profile.png')} alt=""></img>
                    </div>


                  
                    
                </nav>
                <div className='sidebar'>
                    <div className='toggle-btn'></div>
                    <ul>
                        <li onClick={()=>{showService('P')}}><a href="#"><i class="fa-solid fa-rectangle-list"></i><h4>Profile</h4></a></li>
                        <li onClick={()=>{showService('CR')}}><a href="#"><i class="fa-solid fa-robot"></i><h4>Create Robot</h4></a></li>
                        <li onClick={()=>{showService('CS')}}><a href="#"><i class="fa-solid fa-puzzle-piece"></i><h4>Create Simulation</h4></a></li>
                        <li onClick={()=>{showService('CM')}}><a href="#"><i class="fa-solid fa-gamepad"></i><h4>Create Match</h4></a></li>
                        <li onClick={()=>{showService('FM')}}><a href="#"><i class="fa-solid fa-rectangle-list"></i><h4>Find Match</h4></a></li>
                        <li onClick={()=>{showService('LC')}}><a href="#"><i class="fa-solid fa-rectangle-list"></i><h4>Lobbies</h4></a></li>
                    </ul>
                    <div className='separator'></div>
                    
                </div>
                <div className='container'> 

                    {servicesToggleShow[0].bool?<div className='CR-container'>
                        <h1 className='title'>Create Robot</h1>
                        <div className='innerflow'>
                        <RobotForm/>
                        </div>
                    </div>: null}
                    {servicesToggleShow[1].bool?<div className='CS-container'>
                    <h1 className='title'>Create Simulation</h1>
                        <div className='innerflow'>
                        <Simulation showService={showService} handleBoardData={handleBoardData}/>
                        </div>
                    </div>: null}
                    {servicesToggleShow[2].bool?<div className='CM-container'>
                        <h1 className='title'>Create Match</h1>
                        <div className='innerflow'>
                        <CreateGame spawnLobby={spawnLobby} showLobby={showService}/>
                        </div>
                    </div>: null}
                    {servicesToggleShow[3].bool?<div className='FM-container'>
                        <DataTableMatchs spawnJoin={spawnJoin}/>
                    </div>: null}
                    <div className='L-container' style={{display: servicesToggleShow[4].displaya }}>
                        <h1 className='title' onClick={()=>{console.log(lobbyArray)}}>Lobby</h1>
                        <div className='lobby-flow'>
                            {lobbyArray.map(({id, component, isVisible}) => (
                                isVisible ? (
                                <div className='outterlobby'
                                    key={id}
                                    // onClick={()=>{setLastHide}}
                                    hidden={!isVisible}>

                                {component} 
                                
                                </div>
                                ): null
                            ))}
                        </div>
                    </div>
                    {servicesToggleShow[5].bool?<div className='JM-container'>
                    <h1 className='title' onClick={()=>{console.log(lobbyArray)}}>Join Match</h1>
                    <div className='innerflow'>
                    
                        {dialog.map(({id, component, isVisible}) => (
                        isVisible ? (
                        <div
                            key={id}
                            // }
                            hidden={!isVisible}>
                        
                        {component} 
                        </div>
                        ): null
                        ))}
                        </div>
                        
                    </div>: null}
                    {servicesToggleShow[6].bool?<div className='S-container'>
                        <h1 className='title' onClick={()=>{console.log(lobbyArray)}}>Simulation</h1>
                        <div className='innerflowS'>
                        {<Board DataSimulation={boardData}/>}
                        </div>
                    </div>: null}    
                    {servicesToggleShow[7].bool?<div className='P-container'>
                        <h1 className='title'>Profile</h1>
                        <div className='innerflow'>
                        {<Profile/>}
                        </div>
                    </div>: null}   
                </div>
     
  
              
               
        </div>
    );
}


export default MainMenu