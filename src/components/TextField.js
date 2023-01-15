/** @format */
import { useState } from "react";
import PopUp from "./PopUp.js";
import attention from "../assets/attention.svg";
import inputField from "./inputField.module.css";

function TextField({
  style,
  value,
  validate,
  setValue,
  placeHolder,
  keyDown,
  refrence,
  isValid,
  setValid,
  warning,
  leaveFocus,
  exp,
}) {
  const [errorMsg, setErrorMsg] = useState("");
  const warningStyle = {
    borderColor: "red",
    borderWidth: "0.4rem",
    outlineWidth: "0.1rem",
  };
  const validStyle = {
    borderColor: "black",
  };

  return (
    <div className={inputField.fieldContainer}>
      <input
        className={`${inputField.field} ${style}`}
        style={!isValid ? warningStyle : validStyle}
        ref={refrence}
        type="text"
        placeholder={placeHolder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value.replace(exp, ""));

          if (validate) {
            setValid(validate(e.target.value.replace(exp, ""), setErrorMsg));
          }
        }}
        onBlur={(e) => {
          if (validate) {
            setValid(validate(e.target.value.replace(exp, ""), setErrorMsg));
          }
          if (leaveFocus) {
            leaveFocus(e.target.value.replace(exp, ""));
          }
        }}
        onKeyDown={(e) => {
          if (keyDown) keyDown(e);
        }}
      />

      <PopUp
        styleCSS={inputField.errorPopUp}
        icon={attention}
        iconSize={{ height: "3rem", width: "3rem" }}
        show={warning && errorMsg !== ""}
      >
        <p className={inputField.errorText}>{errorMsg}</p>
      </PopUp>
    </div>
  );
}

export default TextField;
