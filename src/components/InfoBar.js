import TableRow from "./TableRow";

function InfoBar({info, action}){
    //create the table for searched callsigns containing station location information.
  return(
    <>
    <div className="infoBar">
      <table id="callList">
        <thead>
        <tr>
          <th> # </th>
          <th> Call Sign </th>
          <th> Country </th>
          <th> Latitude </th>
          <th> Longitude </th>
        </tr>
        </thead>
        <tbody>
          {/* create a row for each callsign searched (<TableRow>) */}
        {info.map( (callData) => <TableRow info={callData} action={action} />)}
      </tbody>
    </table>
  </div>
  </>
  );
}

export default InfoBar;