import { useContext } from "react";
import Serv from "../../Contexts/Serv";
import Line from "./Line";

function List(){
  const {servis} = useContext(Serv);
  return(
    <ul>
      {
        servis?.map(s => <Line key={s.id} line={s} />)
      }
    </ul>
  )
}

export default List;