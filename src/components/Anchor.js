/** @format */

import { Marker, useMap } from "react-leaflet";
import redMarker from "../assets/leafletImages/markerRed2.png";
import { Icon } from "leaflet";

function Anchor({ info, selectedInfo, action, setIsOpen, isHome }) {
  const map = useMap();

  const homeIcon = Icon.extend({
    options: {},
  });

  const redIcon = new homeIcon({
    iconUrl: redMarker,
    iconSize: [30, 54],
    iconAnchor: [15, 54],
  });

  if (Object.keys(selectedInfo).length !== 0) {
    if (selectedInfo.anchor) {
      map.flyTo([selectedInfo.anchor[0] - 5, selectedInfo.anchor[1]], 3);
    }
  }

  return !isHome ? (
    <Marker
      position={info.anchor}
      eventHandlers={{
        click: () => {
          map.flyTo([info.anchor[0] - 5, info.anchor[1]]);
          action(info);
          setIsOpen(true);
        },
      }}
    ></Marker>
  ) : (
    <Marker position={info.anchor} icon={redIcon}></Marker>
  );
}

export default Anchor;
