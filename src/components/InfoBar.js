import TableRow from "./TableRow";
import "./infoBar.css";

function InfoBar({info, selectedInfo, click, style, optionalFields}){

  const OpFields = () => {
    if(optionalFields) {
      return(
        <>
          <th style={{display: optionalFields.name ? "" : "none"}} className="infoHead">Name</th>
          <th style={{display: optionalFields.grid ? "" : "none"}} className="infoHead">Grid</th>
          <th style={{display: optionalFields.serialSent ? "" : "none"}} className="infoHead">SRN</th>
          <th style={{display: optionalFields.serialRcv ? "" : "none"}} className="infoHead">STN</th>
          <th style={{display: optionalFields.comment ?  "" : "none"}} className="infoHead">Comments</th>
        </>
      );} else{
        return(<></>);
      }
  }

  return(
    <>
    <div style={style} className="infoBar">
      <table className="callList" id="callList">
        <thead>
        <tr>
          <th className="infoHead" >#</th>
          <th className="infoHead">Call Sign</th>
          <th className="infoHead">Freq.</th>
          <th className="infoHead">Mode</th>
          <th className="infoHead">RSTs</th>
          <th className="infoHead">RSTr</th>
          <th className="infoHead">Date</th>
          <th className="infoHead">Time</th>
          <OpFields d="" />
        </tr>
        </thead>
        <tbody>

        {info.map( (callData) => <TableRow info={callData} activeInfo={selectedInfo} click={click} optionalFields={optionalFields} key={callData.id}/>)}
      </tbody>
    </table>
  </div>
  </>
  );
}

export default InfoBar;