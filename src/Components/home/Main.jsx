import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Home from "../../Contexts/Home";
import formatDate from "../../Functions/formatDate";


function Main() {

  const [region, setRegion] = useState(null);
  const [servis, setServis] = useState(null);
  const [regionName, setRegionName] = useState('0');
  const [regionName2, setRegionName2] = useState('0');
  const [servisName, setServisName] = useState('0');
  const [servisName2, setServisName2] = useState('0');
  const [comment, setComment] = useState('');
  const [commentQty, setCommentQty] = useState(null);
  const [post, setPost] = useState(null);
  const [readPost, setReadPost] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [show, setShow] = useState('0');
  const [name, setName] = useState('');

  const reList = (data, name) => {
    const d = new Map();
    data.forEach(line => {
        if (d.has(line[name])) {
            d.set(line[name], [...d.get(line[name]), line]);
        } else {
            d.set(line[name],[line]);
        }
    });
    return [...d].map(a=> ({...a, show: true}));
}
  useEffect(()=>{
    axios.get("http://localhost:3005/server/comments")
    .then(res=>{
      setCommentQty(res.data);
    })
  }, [lastUpdate]);
  
  useEffect(()=>{
    axios.get("http://localhost:3005/server/region")
    .then(res => setRegion(res.data))
  }, []);

  useEffect(()=>{
    axios.get("http://localhost:3005/server/services")
    .then(res=> 
      setServis(res.data))
  },[])

 useEffect(()=>{
   axios.get("http://localhost:3005/server/accepted")
  .then(res =>{
    if (regionName2 === '0' && servisName2 === '0'){
    let arr = [...reList(res.data, 'savname')];
    arr.map(a => a[1] = reList(a[1], 'pasname'));
    setReadPost(arr)
    } else if (regionName2 && servisName2 === '0'){
      let arr1 = [...res.data].filter(a=> a.savname === regionName2);
      let arr = [...reList(arr1, 'savname')];
      arr.map(a => a[1] = reList(a[1], 'pasname'));
      setReadPost(arr)
    }else if (servisName2 && regionName2 === '0'){
      let arr1 = [...res.data].filter(a=> a.pasname === servisName2);
      let arr = [...reList(arr1, 'savname')];
      arr.map(a => a[1] = reList(a[1], 'pasname'));
      setReadPost(arr)
    } else{
      let arr1 = [...res.data].filter(a=> a.savname === regionName2 && a.pasname === servisName2);
      let arr = [...reList(arr1, 'savname')];
      arr.map(a => a[1] = reList(a[1], 'pasname'));
      setReadPost(arr)
    }
  })
}, [lastUpdate, regionName2, servisName2])

  useEffect(()=>{
    if(post === null){
      return;
    }
    axios.post("http://localhost:3005/server/comments", post)
    .then(res => {
      setLastUpdate(Date.now());
    })
  }, [post])


  const addComment = () =>{
    if (comment === '' || servisName=== 0 || regionName === 0 || name===''){
      return;
    }
    setPost({
      post: comment,
      pasl_id: parseInt(servisName),
      sav_id: parseInt(regionName),
      isShow: parseInt(show),
      com_author: name
    })
    setComment('');
    setServisName('');
    setRegionName('');
    setName('');
  }

    return(
      <Home.Provider value={{
      regionName,
      setShow
    }}>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card m-4">
            <h3 className="card-header">Rašyti komentarą</h3>
            <div className="card-body  card-body__main">
              <div className="col-2 offset-1 mb-3">
                <label className="form-label">Pasirinkti savivaldybę</label>
                <select value={regionName} className="form-control" onChange={e => setRegionName(e.target.value)}>
                <option value={0}></option>
                {
                  region?.map(r=> <option key={r.id} value={r.id}>{r.title}</option>)
                }
                </select>
                </div>
                <div className="col-2 offset-1 mb-3">
                <label className="form-label">Viešosios paslaugos</label>
                <select value={servisName} className="form-control" onChange={e=>setServisName(e.target.value)}>
                  <option value={0}></option>
                  {
                    servis?.map(s=> <option key={s.id} value={s.id}>{s.title}</option>)
                  }
                </select>
              </div>
              <div className="col-2 offset-1 mb-3">
                <label className="form-label">Vardas</label>
                <input className="form-control" type="text" value={name} onChange={e=>setName(e.target.value)}/>
              </div>
              <div className="col-8 offset-1 mb-3">
                <label className="form-label">Komentaras</label>
                <textarea value={comment} className="form-control" onChange={e=>setComment(e.target.value)}></textarea>
              </div>
            </div>
            <button type="button" className="btn btn-primary col-2 mb-3 offset-7" onClick={addComment}>Siųsti</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card m-4">
            <div className="card-header d-flex justify-content-between">
              <h3>Vartotojų komentarai, pasiūlymai</h3>
              <h5 className="p-2">Viso komentarų {commentQty?.length}</h5>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-2 mt-3">
                  <label className="form-label">Savivaldybės</label>
                </div>
                <div className="col-3 mt-3">
                  <select className="form-select" value={regionName2} onChange={(e) => setRegionName2(e.target.value)}>
                    <option value={0}>Visi</option>
                   {region?.map((g) => (<option key={g.id} value={g.title}>{g.title}</option>))}
                  </select>
                 </div>
                 <div className="col-2 mt-3 offset-1">
                  <label className="form-label">Paslaugos</label>
                </div>
                <div className="col-3 mt-3">
                  <select className="form-select" value={servisName2} onChange={(e) => setServisName2(e.target.value)}>
                    <option value={0}>Visi</option>
                   {servis?.map((g) => (<option key={g.id} value={g.title}>{g.title}</option>))}
                  </select>
                 </div>
              </div>
            </div>
            <div className="card-body">
                  {
                    readPost?.length ? readPost?.map(rp => rp.show === true ? <ul className="list-group" key={rp[0]}>
                      <li className="list-group-item d-flex">
                        <div>
                        <h3>{rp[0]}</h3>
                        <img src={[...(rp[1].map(a=> a[1][0].image))][0]} alt={rp[0]} style={{width: '150px', height: '150px'}} />
                        </div>
                        <ul className="d-inline w-100">
                            {rp[1].map((a,i)=> a.show=== true ? <li className="list-group-item d-flex" key={i}>
                              <h5 style={{width: '150px'}}>{a[0]}</h5>
                              <ul className="list-group w-100">
                                {a[1].map((b,i)=> <li className="list-group-item" key={i}>
                                  <div className="card m-4">
                                    <div className="card-header d-flex justify-content-between">
                                      <h5>{b.name}</h5>
                                      <span>{formatDate(b.cdate)}</span>
                                    </div>
                                    <div className="card-body">
                                    {b.post}
                                    </div>
                                  </div>
                                  </li>)}
                              </ul>
                              </li> : null)}
                        </ul>
                      </li>
                      </ul>
                      : null
                      ) : <p>Nėra administratoriaus patvirtintų komentarų</p>
                  }
            </div>
          </div>
        </div>
      </div>
    </div>
    </Home.Provider>
  )
}

export default Main;
