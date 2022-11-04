import PreLine2 from './PreLine2';
function PreLine({line}){


  return(
    <li className="list-group-item">
      <div className="line com-line">
        <div className="line__content flex-column w-100">
          <h2>{line[0]}</h2>
          <ul className="list-group">
            {line[1]?.map(l => <PreLine2 key={l[0]} line={l} />)}
          </ul>
        </div>
      </div>
    </li>
  )
}

export default PreLine;