import { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
import Region from "../../Contexts/Region";
import getBase64 from "../../Functions/getBase64";

function Create() {

  const [title, setTitle] = useState('');
  const inputFile = useRef();
  const [image, setImage] = useState(null);
  const {setCreateData} = useContext(Region);

  const addImage = () =>{
    getBase64(inputFile.current.files[0])
    .then(img => setImage(img))
  }

  const add = ()=>{
    setCreateData({
      title,
      image: image
    });
    setTitle('');
    setImage(null);
    inputFile.current.value = null;
  }
  return(
        <div className="card m-4">
          <h5 className="card-header">Set New Region</h5>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input className="form-control" type="text" value={title} onChange={e=> setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Choose file</label>
              <input className="form-control" type="file" ref={inputFile} onChange={addImage}/>
            </div>
            {
              image ? <div className="img-bin"><img src={image} alt="upload-file"></img></div> : null
            }
            <button className="btn btn-outline-success" type="button" onClick={add}>Add</button>
          </div>
        </div>
  )
}

export default Create;