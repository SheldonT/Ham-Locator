import "./tableRow.css";


function TableRow({info, click, optionalFields}){

  const OpFields = () => {
    if(optionalFields) {
      return(
        <>
          <td style={{display: optionalFields.name ? "" : "none"}} className="infoCells">{info.name}</td>
          <td style={{display: optionalFields.grid ? "" : "none"}} className="infoCells">{info.grid}</td>
          <td style={{display: optionalFields.serialSent ? "" : "none"}} className="infoCells">{info.serialSent}</td>
          <td style={{display: optionalFields.serialRcv ? "" : "none"}} className="infoCells">{info.serialRcv}</td>
          <td style={{display: optionalFields.comment ?  "" : "none"}} className="infoCells">{info.comment}</td>
        </>
      );} else{
        return(<></>);
      }
  }

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
              <OpFields />
            </tr>
        </>
      );
    
  }

  export default TableRow;
