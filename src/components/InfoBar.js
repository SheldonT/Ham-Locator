/** @format */

import TableRow from "./TableRow";
import infoBar from "./infoBar.module.css";

function InfoBar({
  info,
  click,
  style,
  optionalFields,
  editField,
  hoverEffect,
}) {
  const OpFields = () => {
    if (optionalFields) {
      return (
        <>
          <th
            style={{ display: optionalFields.name ? "" : "none" }}
            className={infoBar.infoHead}
          >
            Name
          </th>
          <th
            style={{ display: optionalFields.grid ? "" : "none" }}
            className={infoBar.infoHead}
          >
            Grid
          </th>
          <th
            style={{ display: optionalFields.serialSent ? "" : "none" }}
            className={infoBar.infoHead}
          >
            SRN
          </th>
          <th
            style={{ display: optionalFields.serialRecv ? "" : "none" }}
            className={infoBar.infoHead}
          >
            STN
          </th>
          <th
            style={{ display: optionalFields.serialComments ? "" : "none" }}
            className={infoBar.infoHead}
          >
            Comments
          </th>
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <div style={style} className={infoBar.infoBar}>
        <table className={infoBar.callList} id="callList">
          <thead>
            <tr>
              {editField ? <th className={infoBar.infoHead}></th> : null}
              <th className={infoBar.infoHead}>#</th>
              <th className={infoBar.infoHead}>Call Sign</th>
              <th className={infoBar.infoHead}>Freq.</th>
              <th className={infoBar.infoHead}>Mode</th>
              <th className={infoBar.infoHead}>RSTs</th>
              <th className={infoBar.infoHead}>RSTr</th>
              <th className={infoBar.infoHead}>Date</th>
              <th className={infoBar.infoHead}>Time</th>
              <OpFields />
            </tr>
          </thead>
          <tbody>
            {info.map((callData) => (
              <TableRow
                info={callData}
                click={click}
                optionalFields={optionalFields}
                key={callData.id}
                editField={editField}
                hoverEffect={hoverEffect}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default InfoBar;
