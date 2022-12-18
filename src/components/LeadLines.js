/** @format */

import { Polyline } from "react-leaflet";

function LeadLines({ home, info }) {
  return (
    <>
      {info.map((line) => (
        <Polyline
          pathOptions={{ color: "black" }}
          positions={[home.anchor, line.anchor]}
          key={line.id}
        />
      ))}
    </>
  );
}

export default LeadLines;
