import { useContext } from "react";
import Serv from "../../Contexts/Serv";

function Line({line}){
  const {setModalData, setDeleteData} = useContext(Serv);
   return(
    <li className="list-group-item">
      <div className="line">
      <div className="line__content">
        <div className="line__content__info">
          <h2 className="m-3">{line.title}</h2>
        </div>
      </div>
      <div className="line__buttons">
        <button type="button" className="btn btn-success" onClick={()=>setModalData(line)}>Edit</button>
        <button type="button" className="btn btn-danger" onClick={()=>setDeleteData(line)}>Delete</button>
      </div>
      </div>
    </li>
  )
}

export default Line;