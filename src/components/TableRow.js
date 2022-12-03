import "./tableRow.css";


function TableRow({info, click}){

      return(
        <>
            <tr className="activeRow" onClick={ () => {
              click(info);
              }
            } >
              <td className="infoCells">{info.id}</td>
              <td className="infoCells">{info.call}</td>
              <td className="infoCells">{info.freq}</td>
              <td className="infoCells">{info.mode}</td>
              <td className="infoCells">{info.sRep}</td>
              <td className="infoCells">{info.rRep}</td>
              <td className="infoCells">{info.contactDate}</td>
              <td className="infoCells">{info.contactTime}</td>
            </tr>
        </>
      );
    
  }

  export default TableRow;
