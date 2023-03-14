/** @format */
import Submit from "./Submit.module.css";

function Button({ style, name, clickEvent, disarmed, show }) {
  return (
    <button
      className={`${Submit.submitButton} ${style}`}
      style={{ display: show === undefined || show ? "flex" : "none" }}
      onClick={clickEvent}
      disabled={disarmed}
    >
      {name}
    </button>
  );
}

export default Button;
