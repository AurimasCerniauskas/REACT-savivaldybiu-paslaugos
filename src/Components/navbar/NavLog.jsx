import {NavLink} from "react-router-dom"
const NavLog = () =>{
  return(
    <>
    <NavLink to="/" end className={({isActive}) => isActive ? 'nav-item nav-link active' : "nav-item nav-link"}>Home</NavLink>
    <NavLink to="/region" className={({isActive}) => isActive ? 'nav-item nav-link active' : "nav-item nav-link"}>Regions</NavLink>
    <NavLink to="/services" className={({isActive}) => isActive ? 'nav-item nav-link active' : "nav-item nav-link"}>Services</NavLink>
    <NavLink to="/comments" className={({isActive}) => isActive ? 'nav-item nav-link active' : "nav-item nav-link"}>Comments</NavLink>
    <NavLink to="/logout" className="nav-link">Logout</NavLink>
    </>
  )
}

export default NavLog