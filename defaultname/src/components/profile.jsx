import React, {useState, useEffect} from 'react';
import { servicioPerfil } from "../services/profileService"
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import utf8 from 'utf8'

import '../style/ProfileComponent.css';


export const Profile =() => {

    //Var to send new Profile Pic
    const [base64Content, setBase64Content] = useState("");
    const [ext, setExt] = useState("");
    
    //Var to show Profile Menu
    const [profilePic,setNewImage] = useState(require('../style/blank-profile.png'))
    const [username, setUsername] = useState('')
    const [robots, setRobotsList] = useState([])
    const [newPassword, setNewPassword] = useState("")
    
    //call fetch all initial data, it call only 1 time to show the profile.
    useEffect(()=>{
        const response = servicioPerfil.getUserInfo().then((data)=>{
            console.log(data)
            console.log('El nombre del usuario es: ',data.name);
            console.log('El avatar de usuario es:', data.avatar);
            console.log('La lista de robots es:', data.robots);
            setUsername(data.name);
            if(data.avatar !== null){
                var userAvatar = 'http://127.0.0.1:8000'+data.avatar
                setNewImage(userAvatar);
            }
            const robotsName = data.robots.map((robot) =>{
                if(robot.avatar===null){
                    robot.avatar = require('../style/blank-profile.png')
                }
                else{
                    robot.avatar = 'http://127.0.0.1:8000'+robot.avatar
                }
                return robot
            } );
            setRobotsList(robotsName);

            console.log('La lista despues del setRobots es:',robots);
        });
     },[])
    

    const customBase64Uploader = async (event) => {
        // convert file to base64 encoded
        const file = event.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = function () {
            var base64data = reader.result.split(',').pop();
            base64data = utf8.decode(base64data);
            setBase64Content(base64data);
            setExt((file.type).split('/').pop());
        };
    };


    const submitProfilePic = () => {

        console.log(ext, base64Content);
        
        var response = servicioPerfil.changeProfilePic(ext,base64Content).then((data)=>{
            if (data.status === 200){
                alert('Imagen cambiada con éxito');
                const reFetch = servicioPerfil.getUserInfo().then((dataPic)=>{
                    if(dataPic.avatar !== null){
                        console.log('ya cambiaste por: ',dataPic.avatar);
                        var url = 'http://127.0.0.1:8000'+dataPic.avatar
                        console.log('url es:', url);
                        setNewImage(url);
                    }
                });
            }else{
                alert('Oops algo salió mal, intenta nuevamente');
            }
        });
        
    }

    const handleInput = (event)=>{
        setNewPassword(event.target.value);
    }

    const submitNewPassword = async (npassword) => {
        console.log(npassword)
        var response = await servicioPerfil.changePassword(npassword);
        if (response === 200){
            alert('Contraseña cambiada con éxito.');
        } else {
            alert('Oops algo salió mal, intenta nuevamente');
        }
    }

    return(
        <div className="cointainer">

                <div className='banner'>
                    <img className='picture' src={profilePic} alt='profilePic'/>
                </div>

                    <p>Cambiar Imagen de Perfil</p>
                    <div className='profile-change'>
                            <FileUpload  auto={true} maxFileSize={5 * 1024 * 1024 /*5 mega*/}
                             accept="image/*" customUpload={true} uploadHandler={customBase64Uploader}
                             invalidFileSizeMessageSummary="Tu imagen es muy grande"
                             invalidFileSizeMessageDetail="El maximo tamaño permitido para una imagen son 5MB" />
                    </div>
                    <Button className='button-save' label='Guardar' onClick={()=>{submitProfilePic()}}/>

                <div className='data-Profile'>
                    
                    <p>Cambiar Contraseña</p>
                    <input type="password" placeholder='Nueva contraseña' name="password" onChange={handleInput}/>
                    <Button label="Cambiar" onClick={()=>{submitNewPassword(newPassword)}}/>
                </div>
                <div className='robot-List'>
                    <h2>Robots</h2>
                    <div className='robots'>
                        {
                          robots.map((robot) => (
                            <div className='robot-card' key={robot.name}>
                                <div className='robot-pic-container'>
                                    
                                    <img className='robot-pic' src={robot.avatar} alt='avatar-robot'/>
                                </div>
                                <div className='robot-name'>
                                    {robot.name}
                                </div>  
                                <div className='robot-stats'>
                                    <p>Partidas Ganadas: {robot.stats.matches_won}</p>
                                    <p>Partidas Jugadas: {robot.stats.matches_played}</p>
                                </div>
                            </div>
                          ))
                        }
                    </div>
                </div>

        </div>
    );
}