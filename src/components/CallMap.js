/** @format */

import { useEffect, useState, useContext } from "react";
import { MapContainer, TileLayer, Popup } from "react-leaflet";
import { NightRegion } from "react-leaflet-night-region"; //installed with --legacy-peer-deps
import { UserContext } from "../contexts/UserContext.js";
import ExtraInfo from "./ExtraInfo.js";
import LeadLines from "./LeadLines.js";
import Anchor from "./Anchor.js";

import "./callMap.css";

function CallMap({ info, selectedInfo, click, home, drawLines }) {
  const [isOpen, setIsOpen] = useState(false);

  const { authUserHome } = useContext(UserContext);

  let mapCenter;

  useEffect(() => {
    click(info[0]);
    if (info.length === 0) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [info.length]);

  useEffect(() => {
    click(authUserHome);
  }, [authUserHome.call]);

  let popUp = <></>;

  if (info.length > 0) {
    mapCenter = info[0].anchor;
  } else {
    mapCenter = [0, 0];
  }

  //if (selectedInfo && info.length !== 0) {
  //const findCenter = info.find((a) => a.id === selectedInfo.id) || [];

  //mapCenter = findCenter.anchor;
  //}

  if (isOpen) {
    popUp = (
      <Popup
        position={
          Object.keys(selectedInfo).length !== 0 ? selectedInfo.anchor : [0, 0]
        }
        closeButton={false}
      >
        <ExtraInfo info={selectedInfo} />
      </Popup>
    );
  } else {
    popUp = <></>;
  }
  return (
    <MapContainer center={mapCenter} zoom={3} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <NightRegion fillColor="#00345c" color="#001a2e" stroke={false} />

      {Object.keys(authUserHome).length !== 0 ? (
        //selectedInfo === home ? (
        <Anchor info={authUserHome} selectedInfo={authUserHome} isHome={true} />
      ) : null}

      {info.map((mapCoord) => (
        <Anchor
          info={mapCoord}
          selectedInfo={selectedInfo}
          action={click}
          setIsOpen={setIsOpen}
          key={mapCoord.id}
        />
      ))}
      {drawLines ? <LeadLines info={info} /> : null}
      {popUp}
    </MapContainer>
  );
}

export default CallMap;
