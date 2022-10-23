


function TableRow({info, click}){
    // create rows in the callsign information table

    let isActive = false;

    const makeActive = () => {

      if (!isActive) {

        click(info);
        isActive = true;

      } else {

        click();
        isActive = false;

      } 
    }

    return(
      <>
          <tr className="activeRow" onClick={ () => makeActive() } >
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

  export default TableRow;

 // onMouseEnter={() => action(info.id) } onMouseLeave={ () => action() }
 // onTouchStart={() => action(info.id)} onTouchEnd={ () => action() } id={info.id} 