import { useContext } from "react";
import Region from "../../Contexts/Region";

const Line = ({line}) =>{

  const {setModalData, setDeleteData} = useContext(Region);

  return(
    <li className="list-group-item">
      <div className="line">
        <div className="line__content">
          <div className="line__content__info">
            <h2 className="m-3">{line.title}</h2>
            {
            line.image ? <div className="img-bin"><img src={line.image} alt={line.title}></img></div> : <span className="red-image">No image</span>
            }
          </div>
        </div>
        <div className="line__buttons">
            <button type="button" onClick={()=> setModalData(line)} className="btn btn-success">Edit</button>
            <button type="button" onClick={()=> setDeleteData(line)} className="btn btn-danger">Delete</button>
        </div>
      </div>
    </li>
  )
}

export default Line;