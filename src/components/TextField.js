/** @format */
import { useState } from "react";
import PopUp from "./PopUp.js";
import attention from "../assets/attention.svg";
import inputField from "./inputField.module.css";

function TextField({
  fieldStyle,
  fieldContainerStyle,
  value,
  validate,
  setValue,
  placeHolder,
  keyDown,
  refrence,
  isValid,
  setValid,
  warning,
  setWarning,
  leaveFocus,
  exp,
  errMsg,
  errorPopupStyle,
  password,
}) {
  const [errorMsg, setErrorMsg] = useState(errMsg || "");
  const warningStyle = {
    borderColor: "red",
    borderWidth: "0.2rem",
    outlineWidth: "0.1rem",
  };
  const validStyle = {
    borderColor: "black",
  };

  return (
    <div className={`${inputField.fieldContainer} ${fieldContainerStyle}`}>
      <input
        className={`${inputField.field} ${fieldStyle}`}
        style={!isValid ? warningStyle : validStyle}
        ref={refrence}
        type={password ? "password" : "text"}
        placeholder={placeHolder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value.replace(exp, ""));

          if (validate) {
            setValid(validate(e.target.value.replace(exp, ""), setErrorMsg));
          }
        }}
        onFocus={() => {
          if (setWarning && warning) {
            setWarning(false);
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
        styleCSS={inputField.errorPopUp || errorPopupStyle}
        icon={attention}
        iconSize={{ height: "3rem", width: "3rem" }}
        show={warning}
      >
        <p className={inputField.errorText}>{errorMsg}</p>
      </PopUp>
    </div>
  );
}

export default TextField;
