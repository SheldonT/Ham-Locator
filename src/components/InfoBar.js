import TableRow from "./TableRow";
import "./infoBar.css";

function InfoBar({info, selectedInfo, click}){

  return(
    <>
    <div className="infoBar">
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

        </tr>
        </thead>
        <tbody>

        {info.map( (callData) => <TableRow info={callData} activeInfo={selectedInfo} click={click} key={callData.id}/>)}
      </tbody>
    </table>
  </div>
  </>
  );
}

export default InfoBar;