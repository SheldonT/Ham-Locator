/** @format */
import Submit from "./Submit.module.css";

function Button({ style, name, clickEvent, disarmed, show, children }) {
  return (
    <button
      className={`${Submit.submitButton} ${style}`}
      style={{ display: show === undefined || show ? "flex" : "none" }}
      onClick={clickEvent}
      disabled={disarmed}
    >
      {name}
      {children}
    </button>
  );
}

export default Button;
