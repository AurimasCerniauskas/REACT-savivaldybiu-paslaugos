import './App.scss';
import 'bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Components/home/Main';
import MainSav from './Components/region/Main';
import Nav from './Components/Nav';
import MainServ from './Components/services/Main';
import MainCom from './Components/comments/Main';
import { useState} from 'react';
import RequireAuth from './Components/login/RequireAuth';
import LoginPage from './Components/login/LoginPage';
import LogoutPage from './Components/login/LogoutPage';

function App() {
  const [logged, setLogged] = useState(localStorage.getItem('isLogged'));

  return (
    <BrowserRouter>
    <Nav status={logged=== null ? 0 : 1} />
      <Routes>
        <Route path='/'element={<Home />}></Route>
        <Route path="/login" element={<LoginPage setLogged={setLogged}/>} />
        <Route path="/logout" element={<LogoutPage setLogged={setLogged}/>} />
        <Route path='/region'element={<RequireAuth role='admin'><MainSav /></RequireAuth>}></Route>
        <Route path='/services'element={<RequireAuth role='admin'><MainServ /></RequireAuth>}></Route>
        <Route path='/comments'element={<RequireAuth role='admin'><MainCom /></RequireAuth>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
