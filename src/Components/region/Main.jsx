import Create from "./Create";
import List from "./List";
import Region from "../../Contexts/Region";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Edit from "./Edit";
import {authConfig} from '../../Functions/auth';

function Main() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [region, setRegion] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [createData, setCreateData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3005/server/region", authConfig())
      .then(res => {
      setRegion(res.data)
      })
  }, [lastUpdate]);

  // console.log(region)
  useEffect(()=>{
    if(deleteData === null){
     return;
  }
    axios.delete("http://localhost:3005/server/region/"+deleteData.id, authConfig())
    .then(res =>
      setLastUpdate(Date.now())
      )
  }, [deleteData]);

  useEffect(()=>{
    if(createData === null){
      return;
    }
    axios.post("http://localhost:3005/server/region", createData, authConfig())
    .then(res =>{
      setLastUpdate(Date.now())
    });
  }, [createData]);

  useEffect(()=>{
    if(editData === null){
     return;
  }
    axios.put("http://localhost:3005/server/region/"+editData.id, editData, authConfig())
    .then(res =>
      setLastUpdate(Date.now())
      )
  }, [editData]);

  return (
    <Region.Provider value={{
      region,
      setCreateData,
      setLastUpdate,
      setDeleteData,
      modalData,
      setModalData,
      setEditData
    }}>
      <div className="container">
        <div className="row region">
          <div className="col-9 col-lg-4 offset-sm-1 offset-lg-0 region__create">
            <Create />
          </div>
          <div className="col-9 col-lg-7 offset-1 region__list">
            <List />
          </div>
        </div>
      </div>
      <Edit />
    </Region.Provider>
  );
};

export default Main;
