import { useContext } from "react";
import Comments from "../../Contexts/Comments";

function Line({line}){
  const {setDeletePost, setComment} = useContext(Comments);
  const changeSt = () =>{
    setComment({
      id: line.cid,
      isShow: 1
    })
  }

  return(
    <li className="list-group-item mb-3">
      <div className="line">
        <div className="line__content">
          <p>{line.post}</p>
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