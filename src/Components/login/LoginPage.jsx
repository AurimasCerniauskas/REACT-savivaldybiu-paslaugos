import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {login} from '../../Functions/auth';

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

export default LoginPage;