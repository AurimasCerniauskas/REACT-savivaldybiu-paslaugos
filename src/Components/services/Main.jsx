import { useState } from 'react';
import Serv from '../../Contexts/Serv';
import Create from './Create';
import List from './List';
import Edit from './Edit';
import { useEffect } from 'react';
import axios from 'axios';


function Main() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [servis, setServis] = useState(null);
  const [createData, setCreateData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(()=>{
    axios.get("http://localhost:3005/server/services")
    .then(res =>
      setServis(res.data)
      )
  }, [lastUpdate])

  useEffect(()=>{
    if(createData === null){
      return;
    }
    axios.post("http://localhost:3005/server/services", createData)
    .then(res =>
      setLastUpdate(Date.now())
      )
  }, [createData])

  useEffect(()=>{
    if(deleteData===null){
      return;
    }
    axios.delete("http://localhost:3005/server/services/"+deleteData.id)
    .then(res =>
      setLastUpdate(Date.now())
      )
  },[deleteData])

  useEffect(()=>{
    if(editData===null){
      return;
    }
    axios.put("http://localhost:3005/server/services/"+editData.id, editData)
    .then(res =>
      setLastUpdate(Date.now())
      )
  },[editData])

  return(
    <Serv.Provider value={{
      servis,
      modalData,
      setModalData,
      setCreateData,
      setDeleteData,
      setEditData
    }}>
      <div className='container'>
        <div className='row'>
          <div className='col-4'>
            <Create />
          </div>
          <div className='col-8'>
            <List />
          </div>
        </div>
      </div>
      <Edit />
    </Serv.Provider>
  )
}

export default Main;