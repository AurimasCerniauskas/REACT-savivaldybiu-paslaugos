import NavLog from "./navbar/NavLog";
import NavNotLog from "./navbar/NavNotLog";

function Nav({status}){
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
                  {
                    status ? <NavLog /> : <NavNotLog />
                  }
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