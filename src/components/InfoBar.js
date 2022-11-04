import TableRow from "./TableRow";

function InfoBar({info, selectedInfo, click}){

  return(
    <>
    <div className="infoBar">
      <table className="callList" id="callList">
        <thead>
        <tr>
          <th className="infoHead" >#</th>
          <th className="infoHead">Call Sign</th>
          <th className="infoHead">Country</th>
          <th className="infoHead">Latitude</th>
          <th className="infoHead">Longitude</th>
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