/** @format */

import popUp from "./popUp.module.css";

function Popup({
  children,
  styleCSS,
  inlineStyle,
  icon,
  iconSize,
  show,
  active,
}) {
  const extraStyle = {
    display: show ? "flex" : "none",
    ...inlineStyle,
  };
  return (
    <div className={`${popUp.popUp} ${styleCSS}`} style={extraStyle}>
      {icon ? <img className={popUp.icon} style={iconSize} src={icon} /> : null}
      {children}
    </div>
  );
}

export default Popup;
