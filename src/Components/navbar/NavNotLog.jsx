import {NavLink} from "react-router-dom"
const NavNotLog = () =>{
  return(
    <>
    <NavLink to="/" end className={({isActive}) => isActive ? 'nav-item nav-link active' : "nav-item nav-link"}>Home</NavLink>
    <NavLink to="/login" className="nav-link">Login</NavLink>
    </>
  )
}

export default NavNotLog