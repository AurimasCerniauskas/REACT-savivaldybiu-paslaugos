import { useContext } from "react";
import Comments from '../../Contexts/Comments';
import PreLine from "./PreLine";

function List(){
  const {readPost} = useContext(Comments);
  return(
    <div className="card-block">
    <div className="card m-4 col-10 offset-md-1">
      <div className="card-body">
        <ul className="list-group">
      {
        readPost?.map(rp => <PreLine line={rp} key={rp[0]}/>)
      }
      </ul>
      </div>
    </div>
  </div>
  )
}

export default List;

