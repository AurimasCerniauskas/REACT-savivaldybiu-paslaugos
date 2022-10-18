import { useContext } from "react";
import Region from "../../Contexts/Region";
import Line from "./Line";

const List = () =>{
  const {region} = useContext(Region);
  return(
    <ul>{
      region?.map(line => <Line key={line.id} line={line} />)
}</ul>
  )
}

export default List;