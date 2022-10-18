import { useContext } from "react";
import { useState } from "react";
import Serv from "../../Contexts/Serv";

function Create(){
  const [title, setTitle] = useState('');
  const {setCreateData} = useContext(Serv);

  const add = () =>{
    setCreateData({
      title
    })
    setTitle('');
  }

  return(
    <div className="card m-4">
      <h5 className="card-header">Services name</h5>
      <div className="card-body">
        <div className="mb-5">
          <label className="form-label">Pavadinimas</label>
          <input className="form-control" type="text" value={title} onChange={e=> setTitle(e.target.value)} />
        </div>
        <div className="buttons-group">
          <button className="btn btn-outline-success" type="button" onClick={add}>Add</button>
        </div>
      </div>
    </div>
  )
}

export default Create;