import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Home from "../../Contexts/Home";


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

  // console.log(new Date());

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
    // console.log(res.data);
    // console.log([...res.data].filter(a=> a.savname === 'Alytus'));
    let arr = [...reList(res.data, 'savname')];
    console.log(arr)
    arr.map(a => a[1] = reList(a[1], 'pasname'));
    setReadPost(arr)
  })
}, [lastUpdate])



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
    setPost({
      post: comment,
      pasl_id: parseInt(servisName),
      sav_id: parseInt(regionName),
      isShow: parseInt(show)
    })
    setComment('');
    setServisName('');
    setRegionName('');
  }

  useEffect(()=>{
      if(regionName2 === '0'){
        setReadPost(rp=> rp?.map(s=> ({...s, show: true})))
      }else{
        // console.log(regionName2)
        setReadPost(rp=> rp?.map(sav=> sav[0] === regionName2
        ? {...sav, show:true} : {...sav, show:false}))
      }
    },[regionName2, region])

    useEffect(()=>{
      if(servisName2 === '0'){
        setReadPost(rp=> rp?.map(s=> ({...s + s[1].map(sn => ({...sn, show: true}))})))
      }else{
        setReadPost(rp=> rp?.map(sav=> sav[1].map(sn => sn[0] === servis?.find(f=> f.id === parseInt(servisName2)).title
        ? {...sn, show:true} : {...sn, show:false})))
      }
    },[servisName2, servis])
    // console.log(readPost)
    // readPost?.map(a=> a[1].map(b=> console.log(b)))
    // console.log(readPost?.map(a=> a[1].map(b=> ({...b}))))
    
    // useEffect(()=>{
    //   if(servisName2 === '0'){
    //     setReadPost(rp=> rp?.map(s=> ({...s[1].map(sn => ({...sn, show: true}))})))
    //   }else{
    //     setReadPost(rp=> rp?.map(sav=> ({...sav[1].map(sn => sn[0] === servis?.find(f=> f.id === parseInt(servisName2)).title
    //     ? {...sn, show:true} : {...sn, show:false})})))
    //   }
    // },[servisName2, servis])
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
              <div className="col-4 offset-1 mb-3">
                <label className="form-label">Pasirinkti savivaldybę</label>
                <select value={regionName} className="form-control" onChange={e => setRegionName(e.target.value)}>
                <option value={0}></option>
                {
                  region?.map(r=> <option key={r.id} value={r.id}>{r.title}</option>)
                }
                </select>
                </div>
                <div className="col-4 offset-1 mb-3">
                <label className="form-label">Viešosios paslaugos</label>
                <select value={servisName} className="form-control" onChange={e=>setServisName(e.target.value)}>
                  <option value={0}></option>
                  {
                    servis?.map(s=> <option key={s.id} value={s.id}>{s.title}</option>)
                  }
                </select>
              </div>
              <div className="col-9 offset-1 mb-3">
                <label className="form-label">Komentaras</label>
                <textarea value={comment} className="form-control" onChange={e=>setComment(e.target.value)}></textarea>
              </div>
            </div>
            <button type="button" className="btn btn-primary col-2 mb-3 offset-4" onClick={addComment}>Siųsti</button>
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
                   {servis?.map((g) => (<option key={g.id} value={g.id}>{g.title}</option>))}
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
                                {a[1].map((b,i)=> <li className="list-group-item" key={i}>{b.post}</li>)}
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




// useEffect(()=>{
//   if(regionName === '0'){
//     setReadPost(rp=> rp?.map(s=> ({...s, show: true})))
//   }else{
//     setReadPost(rp=> rp?.map(sav=> sav[0] === region?.find(f=> f.id === parseInt(regionName)).title
//     ? {...sav, show: true} : {...sav, show: false}))
//   }
// },[regionName, region])


// readPost?.map(rp => rp.isShow ? <p key={rp.id}>{rp.post}</p> : <p key={rp.id}>Nėra administratoriaus patvirtintų komentarų</p>)
// readPost?.find(rp => rp.isShow) ? readPost.map(r => r.isShow ? <p key={r.id}>{r.post}</p> : null) : <p>Nėra administratoriaus patviritintų komentarų</p>

// ******išlistinimas
// readPost?.length ? readPost?.map(rp => rp[2].show === true ? <ul className="list-group" key={rp[0]}>
// <li className="list-group-item d-flex">
//   <div>
//   <h3>{rp[0]}</h3>
//   <img src={[...(rp[1].map(a=> a[1][0].image))][0]} alt={rp[0]} style={{width: '150px', height: '150px'}} />
//   </div>
//   <ul className="d-inline w-100">
//       {rp[1].map((a,i)=> <li className="list-group-item d-flex" key={i}>
//         <h5 style={{width: '150px'}}>{a[0]}</h5>
//         <ul className="list-group w-100">
//           {a[1].map((b,i)=> <li className="list-group-item" key={i}>{b.post}</li>)}
//         </ul>
//         </li>)}
//   </ul>
// </li>
// </ul>

// *****iš filtravimo

// *****useEffect dėl Relisto
//  useEffect(()=>{
//    axios.get("http://localhost:3005/server/accepted")
//   .then(res =>{
//     console.log(res.data)
//     let arr = [...reList(res.data, 'savname')];
//     // console.log(arr)
//     arr.map(a => a[1] = reList(a[1], 'pasname'));
//     setReadPost(arr.map(c => [c[0],c[1].map(b=> ({...b, show: true})), {show: true}]))
//     // setReadPost(arr.map(c => ({...c, show: true})));
//   })
// }, [lastUpdate])

    // setReadPost(arr.map(c => [c[0],c[1].map(b=> ({...b, show: true})), {show: true}]))
    // setReadPost(arr.map(c => ({...c, show: true})));