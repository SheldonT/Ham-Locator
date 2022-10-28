
function TableRow({info, activeInfo, click}){
    // create rows in the callsign information table

    
    if ( (activeInfo) && (activeInfo.id === info.id) ) { 
      return(
        <>
            <tr className="activeRow" onClick={ () => {
              click();
              }
            } >
              {/*Cells containing...*/}
              <td className="infoCells">{info.id /* ID # for the table row*/}</td>
              <td className="infoCells">{info.call /* station callsign*/}</td>
              <td className="infoCells">{info.country /* station country */}</td>
              <td className="infoCells">{info.anchor?.[0] /* station latitude */ }</td>
              <td className="infoCells">{info.anchor?.[1] /* station longitude */}</td>
            </tr>
        </>
      );
    } else {

      return(
        <>
            <tr className="activeRow" onClick={ () => {
              click(info);
              }
            } >
              {/*Cells containing...*/}
              <td className="infoCells">{info.id /* ID # for the table row*/}</td>
              <td className="infoCells">{info.call /* station callsign*/}</td>
              <td className="infoCells">{info.country /* station country */}</td>
              <td className="infoCells">{info.anchor?.[0] /* station latitude */ }</td>
              <td className="infoCells">{info.anchor?.[1] /* station longitude */}</td>
            </tr>
        </>
      );

    }
    
  }

  export default TableRow;

 // onMouseEnter={() => action(info.id) } onMouseLeave={ () => action() }
 // onTouchStart={() => action(info.id)} onTouchEnd={ () => action() } id={info.id} 