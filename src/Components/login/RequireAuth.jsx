import {useState, useEffect} from 'react';
import axios from 'axios';
import {authConfig} from '../../Functions/auth';
import { Navigate } from 'react-router-dom';

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

export default RequireAuth;