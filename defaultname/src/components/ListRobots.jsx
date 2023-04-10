import { Dropdown } from 'primereact/dropdown';
import { useEffect } from 'react';
import { useState } from 'react';
import { getRobots } from '../services/getRobots';

export const ListRobots = () => {
    const [robots, setRobots] = useState([]);
    const [selectedRobot, setSelectedRobot] = useState(null);

    useEffect( () => {
        getRobots().then((data)=>{ 
            console.log(data)
            const robotsName = data.map((robot) => robot.name);
            setRobots(robotsName);
        });
    }
    , []);

    const onSelect = (e) => {
        setSelectedRobot(e.value);
        localStorage.setItem('robot' , e.value);
    }
    return(
        <Dropdown value={selectedRobot} options={robots} onChange={(e) => onSelect(e)} placeholder="Select a Robot"/>
    )
}
