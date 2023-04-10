import '../style/App.css';
import {Route, Routes} from 'react-router-dom'

// PRIME REACT
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
//Redux

// PAGES: Registration, Login, CrateMatch, CreateRobot, ListMatchs, Board
import LoginForm from './LoginForm'
import Home from './Home'
import MainMenu from './mainMenu';
import Board from './Board'
import RegistrationForm from './RegistrationForm'
import Validation from './Validation';

function App() {

  return (

    <div className="App">
        <Routes>
            <Route path = '/' element = {<Home/>} />
            <Route path = '/login' element = {<LoginForm/>} />
            <Route path = '/menu' element = {<MainMenu/>} />
            <Route path = '/simulation' element = {<Board/>} />
            <Route path = '/registration' element = {<RegistrationForm/>} />
            <Route path = '/validation'>
                <Route path = ":name" element = {<Validation/>} />    
            </Route>
        </Routes>
    </div>

  );
}

export default App;