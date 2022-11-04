import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import {logout} from '../../Functions/auth';

function LogoutPage({setLogged}) {
  useEffect(()=>{
    localStorage.removeItem('isLogged');
    setLogged(null);
  }, [setLogged]);

  logout();

  return (
  <Navigate to="/login" replace />

)

}

export default LogoutPage;