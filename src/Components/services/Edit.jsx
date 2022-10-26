import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Serv from "../../Contexts/Serv";

function Edit(){
  const {modalData, setModalData, setEditData} = useContext(Serv);
  const [title, setTitle] = useState('');

  useEffect(()=>{
    if(modalData=== null){
      return;
    }
    setTitle(modalData.title);
  },[modalData])

  const save = ()=>{
    setEditData({
      title,
      id: modalData.id
    })
    setModalData(null);
  }

  if(modalData === null){
    return null;
  }
  return(
    <div className="modal">
      <div className="modal-dialog modal-dialog-centerd">
        <div className="modal-content">
          <div className="modal-header">
          <h5 className="modal-title">Edit Services</h5>
          <button type="button" className="btn btn-close" onClick={()=> setModalData(null)}></button>
          </div>
          <div className="modal-body">
          <div className="card m-4">
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Services</label>
                <input className="form-content" type="text" value={title} onChange={e=> setTitle(e.target.value)} />
              </div>
            </div>
          </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-primary" onClick={save}>Save</button>
            <button type="button" className="btn btn-outline-secondary" onClick={()=> setModalData(null)}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit;