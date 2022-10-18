import { useState } from 'react';
import Serv from '../../Contexts/Serv';
import Create from './Create';
import List from './List';
import Edit from './Edit';

function Main() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [createData, setCreateData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);

  return(
    <Serv.Provider value={{
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