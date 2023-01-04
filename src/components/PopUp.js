/** @format */

import popUp from "./popUp.module.css";

function Popup({ children, styleSheet, icon, iconSize, active }) {
  return (
    <div
      className={`${popUp.popUp} ${styleSheet}`}
      style={{ display: active ? "flex" : "none" }}
    >
      {icon ? <img className={popUp.icon} style={iconSize} src={icon} /> : null}
      {children}
    </div>
  );
}

export default Popup;
