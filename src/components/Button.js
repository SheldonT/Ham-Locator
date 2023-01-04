/** @format */
import Submit from "./Submit.module.css";

function Button({ name, clickEvent, disarmed }) {
  return (
    <button
      className={Submit.submitButton}
      onClick={clickEvent}
      disabled={disarmed}
    >
      {name}
    </button>
  );
}

export default Button;
