import { useContext } from "react";
import Comments from "../../Contexts/Comments";
import formatDate from "../../Functions/formatDate";

function Line({line}){
  const {setDeletePost, setComment} = useContext(Comments);
  const changeSt = () =>{
    setComment({
      id: line.cid,
      isShow: 1
    })
  }

  return(
    <li className="list-group-item border-0">
      <div className="card m-2">
        <div  className="card-header d-md-flex justify-content-between">
          <p className="m-0"><b>{line.name}</b></p>
          <span>{formatDate(line.cdate)}</span>
        </div>

        <div className="card-body">
          <p className="m-0">{line.post}</p>
        </div>
        <div className="line__buttons">
          <button type="button" className="btn btn-outline-primary" onClick={changeSt} style={{display: line.isShow ? "none" : "inline-block"}}>Patvirtinti</button>
          <button type="button" className="btn btn-outline-danger" onClick={()=> setDeletePost(line.cid)}>Ištrinti</button>
        </div>
      </div>
    </li>
  )
}

export default Line;