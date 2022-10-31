import './App.scss';
import 'bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './Components/home/Main';
import MainSav from './Components/region/Main';
import Nav from './Components/Nav';
import MainServ from './Components/services/Main';
import MainCom from './Components/comments/Main';
import { login, logout, authConfig} from './Functions/auth';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [loged, setLoged] = useState(false);
  return (
    <BrowserRouter>
    <Nav status={loged} />
      <Routes>
        <Route path='/'element={<Home />}></Route>
        <Route path="/login" element={<LoginPage setLoged={setLoged} />} />
        <Route path="/logout" element={<LogoutPage setLoged={setLoged} />} />
        <Route path='/region'element={<RequireAuth role='admin'><MainSav /></RequireAuth>}></Route>
        <Route path='/services'element={<RequireAuth role='admin'><MainServ /></RequireAuth>}></Route>
        <Route path='/comments'element={<RequireAuth role='admin'><MainCom /></RequireAuth>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
function RequireAuth({ children, role }) {
  const [view, setView] = useState(<h2>Please wait...</h2>);
  useEffect(() => {
    axios.get('http://localhost:3005/login-check?role=' + role, authConfig())
      .then(res => {
        if ('ok' === res.data.msg) {
          setView(children);
        } else {
          setView(<Navigate to="/login" replace />);
        }
      })

  }, [children, role]);

  return view;
}

function LoginPage({setLoged}) {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const doLogin = () => {
    axios.post('http://localhost:3005/login', { user, pass })
      .then(res => {
        if ('ok' === res.data.msg) {
          login(res.data.key);
          navigate('/', { replace: true });
          setLoged(true);
        }
      })
  }
  return (


    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col col-md-12 col-lg-4'>
          <div className='card m-4'>
            <h5 className='card-header'>Login</h5>
            <div className='card-body'>
              <div className='mb-3'>
                <label className='form-label'>Name</label>
                <input type="text" className='form-control' value={user} onChange={e => setUser(e.target.value)}></input>
              </div>
              <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input type="password" className='form-control' value={pass} onChange={e => setPass(e.target.value)}></input>
              </div>
              <button type='button' className='btn btn-outline-success' onClick={doLogin}>Login</button>
            </div>
      </div>
      </div>
      </div>
    </div>
  );
}

function LogoutPage({setLoged}) {
    logout();
    setLoged(false);
    return (
    <Navigate to="/login" replace />
  )
}

export default App;
