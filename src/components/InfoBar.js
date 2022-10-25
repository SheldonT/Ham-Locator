import TableRow from "./TableRow";

function InfoBar({info, click}){
    //create the table for searched callsigns containing station location information.

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
          {/* create a row for each callsign searched (<TableRow>) */}
        {info.map( (callData) => <TableRow info={callData} click={click} key={callData.id}/>)}
      </tbody>
    </table>
  </div>
  </>
  );
}

export default InfoBar;