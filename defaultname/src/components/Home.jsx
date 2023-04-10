
import '../style/home.css'
import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const handleOnClickLog = useCallback(() => navigate('/login', {replace: true}), [navigate]);
    const handleOnClickReg = useCallback(() => navigate('/registration', {replace: true}), [navigate]);
  return (
        <div className="global">
            <div className="box">
            <h1 id="mainTitle">PY-ROBOT</h1>
            </div>
            <div className='box1'>
                <div className='box2'>
                    <button id="top" type="button" className='homeButton' onClick={handleOnClickLog}>Log in</button>
                    <button type="button" className='homeButton' onClick={handleOnClickReg}>Register</button>
                </div>
            </div>
        </div>
  );
}
export default Home
