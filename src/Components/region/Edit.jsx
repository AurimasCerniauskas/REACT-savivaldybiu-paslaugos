import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import Region from "../../Contexts/Region";
import getBase64 from "../../Functions/getBase64";

function Edit(){
  const {modalData, setModalData, setEditData} = useContext(Region);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [delImg, setDelImg] = useState(false);
  const fileInput = useRef();

  const addImage = () =>{
    getBase64(fileInput.current.files[0])
    .then(image => setImage(image))
  }

  useEffect(()=>{
    if(modalData === null){
      return;
    }
    setTitle(modalData.title);
    setImage(modalData.image);
    setDelImg(false);
  
  }, [modalData]);

  const save = () =>{
    setEditData({
      title,
      id: modalData.id,
      delImg: delImg ? 1 : 0,
      image: image
    });
    setModalData(null);
    setDelImg(false);
  }
  if(modalData === null){
    return null;
  }

  return(
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Region</h5>
            <button type="button" onClick={()=>setModalData(null)} className="btn-close"></button>
          </div>
          <div className="modal-body">
            <div className="card m-4">
              <div className="card-body">
                <div className="mb-3>">
                  <label className="form-label">Region name</label>
                  <input className="form-control" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="mb-3>">
                  <label className="form-label">Image</label>
                  <input className="form-control" type="file" ref={fileInput} onChange={addImage} />
                </div>
                {
                  image ? <div className="img-bin">
                    <label htmlFor="image-delete">X</label>
                    <input id="image-delete" type="checkbox" checked={delImg} onChange={()=> setDelImg(d => !d)} />
                    <img src={image} alt="upload imag"></img></div> : null
                }
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={()=> setModalData(null)}>Close</button>
            <button type="button" className="btn btn-primary" onClick={save}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit;