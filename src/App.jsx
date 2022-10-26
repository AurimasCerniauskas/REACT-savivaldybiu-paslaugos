import './App.scss';
import 'bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/home/Main';
import MainSav from './Components/region/Main';
import Nav from './Components/Nav';
import MainServ from './Components/services/Main';
import MainCom from './Components/comments/Main';

function App() {
  return (
    <BrowserRouter>
    <Nav />
      <Routes>
        <Route path='/'element={<Home />}></Route>
        <Route path='/region'element={<MainSav />}></Route>
        <Route path='/services'element={<MainServ />}></Route>
        <Route path='/comments'element={<MainCom />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
