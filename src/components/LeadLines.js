/** @format */

import { useContext } from "react";
import { Polyline } from "react-leaflet";
import { UserContext } from "../contexts/UserContext.js";

function LeadLines({ info }) {
  const { authUserHome } = useContext(UserContext);

  return (
    <>
      {info.map((line) => (
        <Polyline
          pathOptions={{ color: "black", weight: 0.5 }}
          positions={[authUserHome.anchor, line.anchor]}
          key={line.id}
        />
      ))}
    </>
  );
}

export default LeadLines;
