
function TableRow({info, activeInfo, click}){

    
    if ( (activeInfo) && (activeInfo.id === info.id) ) { 
      return(
        <>
            <tr className="activeRow" onClick={ () => {
              click();
              }
            } >

              <td className="infoCells">{info.id}</td>
              <td className="infoCells">{info.call}</td>
              <td className="infoCells">{info.country}</td>
              <td className="infoCells">{info.anchor?.[0]}</td>
              <td className="infoCells">{info.anchor?.[1]}</td>
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

              <td className="infoCells">{info.id}</td>
              <td className="infoCells">{info.call}</td>
              <td className="infoCells">{info.country}</td>
              <td className="infoCells">{info.anchor?.[0]}</td>
              <td className="infoCells">{info.anchor?.[1]}</td>
            </tr>
        </>
      );

    }
    
  }

  export default TableRow;
