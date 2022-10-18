import {NavLink} from "react-router-dom"

function Nav(){
  return(
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <span className="navbar-brand">Municipalities</span>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
             </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                <NavLink to="/" end className={({isActive}) => isActive ? 'nav-item nav-link active' : "nav-item nav-link"}>Home</NavLink>
                <NavLink to="/region" className={({isActive}) => isActive ? 'nav-item nav-link active' : "nav-item nav-link"}>Regions</NavLink>
                <NavLink to="/services" className={({isActive}) => isActive ? 'nav-item nav-link active' : "nav-item nav-link"}>Services</NavLink>
                {/* <NavLink to="/comments" className={({isActive}) => isActive ? 'nav-item nav-link active' : "nav-item nav-link"}>Comments</NavLink> */}
                {/* <NavLink to="/logout" className="nav-link">Logout</NavLink> */}
                {/* <NavLink to="/register" className="nav-link">Register</NavLink> */}
                {/* <NavLink to="/login" className="nav-link">Login</NavLink> */}
                </div>
              </div>
              </div>
          </nav>
        </div>
      </div>

    </div>
  );
}

export default Nav;