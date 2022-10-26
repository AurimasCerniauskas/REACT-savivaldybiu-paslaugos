import Line from './Line';
function PreLine2({line}){


  return(
    <li className="list-group-item mb-3">
      <div className="line">
        <div className="line__content flex-column w-100">
          <h5>{line[0]}</h5>
          <ul className="list-group">
            {line[1]?.map((l,i) => <Line key={i} line={l} />)}
          </ul>
        </div>
      </div>
    </li>
  )
}

export default PreLine2;