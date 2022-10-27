import React, { useState, useEffect } from 'react';

function TableRow({info, click}){
    // create rows in the callsign information table

      const [isActive, setIsActive] = useState(false);

      useEffect( () => {

        if (isActive) {
          click(info);
        } else {
          click();
        }

      }, [isActive] );
      //^^^^^^^^^^^^
      //make changes to extraInfo from index.js call the useEffect, rather than a useState here

      return(
        <>
            <tr className="activeRow" onClick={() => {!isActive ? setIsActive(true) : setIsActive(false) } } >
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