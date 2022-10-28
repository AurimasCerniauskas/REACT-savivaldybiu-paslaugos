import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Comments from '../../Contexts/Comments';
import List from "./List";
import {authConfig} from '../../Functions/auth';


function Main() {

  const [readPost, setReadPost] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [comment, setComment] = useState(null);
  const [deletePost, setDeletePost] = useState(null);
  const [showCom, setShowCom] = useState('0');

  const reList = (data, name) => {
    const d = new Map();
    data.forEach(line => {
        if (d.has(line[name])) {
            d.set(line[name], [...d.get(line[name]), line]);
        } else {
            d.set(line[name],[line]);
        }
    });
    return [...d];
}



  useEffect(()=>{
    axios.get("http://localhost:3005/server/all", authConfig())
    .then(res=>{
      let arr = [];
      if (showCom === '0'){
      arr = [...reList(res.data, 'savname')];
    }else{
      arr = [...reList(res.data.filter(c => !c.isShow), 'savname')];
    }
    arr.map(a => a[1] = reList(a[1], 'pasname'))
    setReadPost(arr);
    })
  }, [showCom, lastUpdate])

  useEffect(()=>{
    if(deletePost === null){
      return;
    }
    axios.delete("http://localhost:3005/server/comments/"+deletePost, authConfig())
    .then(res =>{
      setLastUpdate(Date.now())
    })
  }, [deletePost])

    useEffect(()=>{
      if(comment === null){
        return;
      }
      axios.put("http://localhost:3005/server/comments/"+comment.id, comment, authConfig())
      .then(res=>
        setLastUpdate(Date.now())
        )
    }, [comment])

  return(
    <Comments.Provider value={{
      readPost,
      setDeletePost,
      setComment,
      lastUpdate
      }}>
    <div className="container">
      <div className="row">
        <div className="col-12">
            <h2 style={{textAlign: 'center'}}>Vartotojų komentarai, pasiūlymai</h2>
            <div className="filter__block d-flex mt-5">
              <div className="col-3 mt-3 offset-4">
                <label className="form-label"><h4>Komentarų filtras</h4></label>
              </div>
              <div className="col-3 mt-3">
                <select className="form-select" value={showCom} onChange={e => setShowCom(e.target.value)}>
                  <option value={0}>Visi</option>
                  <option value={1}>Nepatvirtinti</option>
                </select>
              </div>
            </div>
            <List />
        </div>
      </div>
    </div>
    </Comments.Provider>
  )
}

export default Main;