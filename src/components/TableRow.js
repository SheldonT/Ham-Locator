function TableRow({info, action}){
    // create rows in the callsign information table
    return(
      <>
          <tr onMouseEnter={() => action(info.id) } onMouseLeave={ () => action() }
            onTouchStart={() => action(info.id)} onTouchEnd={ () => action() } id={info.id} >
            {/*Cells containing...*/}
            <td>{info.id /* ID # for the table row*/}</td>
            <td>{info.call /* station callsign*/}</td>
            <td>{info.country /* station country */}</td>
            <td>{info.anchor?.[0] /* station latitude */ }</td>
            <td>{info.anchor?.[1] /* station longitude */}</td>
          </tr>
      </>
    );
  }

  export default TableRow;