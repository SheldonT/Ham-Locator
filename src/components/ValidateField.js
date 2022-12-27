/** @format */
import { useState } from "react";
import { bandDef } from "../constants.js";
import attention from "../assets/attention.svg";
import "./popUp.css";
import "./inputBar.css";
import { UserProps } from "victory";

function ErrorMessage({ message }) {
  return (
    <div className="errorPopUp" style={{ display: "flex" }}>
      <img className="errorImg" src={attention} alt="Exclaimation Mark" />
      <p className="errorText">{message}</p>
    </div>
  );
}

function ValidateField({
  style,
  value,
  setValue,
  type,
  initValue,
  valid,
  setValid,
  restore,
  refrence,
  warning,
  setWarning,
  exp,
}) {
  const warningStyle = {
    borderColor: "red",
    borderWidth: "0.4rem",
    outlineWidth: "0.1rem",
  };
  const validStyle = {
    borderColor: "black",
  };
  const [border, setBorder] = useState(validStyle);
  const [errorMsg, setErrorMsg] = useState("");

  const validateInput = (v) => {
    setValue(v);

    let validBuffer = true;

    switch (type) {
      case "Callsign":
        if (v.length === 0) {
          //error condition: if no call is entered
          validBuffer = false;
          setBorder(warningStyle);
          setErrorMsg("Enter an amateur callsign.");
        } else {
          setBorder(validStyle);
          setErrorMsg("");
        }
        break;
      case "Freq":
        if (v.length === 0) {
          //error condition: if no frequency is entered
          validBuffer = false;
          setBorder(warningStyle);
          setErrorMsg("Enter a valid amateur frequency");
          break; //break from SWITCH
        }
        if (v.length >= 0) {
          for (let i = 0; i < bandDef.length; i++) {
            if (
              parseFloat(v) >= parseFloat(bandDef[i].low) && //error condition: if a VALID frequency is entered...
              parseFloat(v) <= parseFloat(bandDef[i].high)
            ) {
              setBorder(validStyle);
              setErrorMsg(""); //assign empty string and...
              break; // break from for loop
            } else {
              validBuffer = false;
              setBorder(warningStyle);
              setErrorMsg("This is not an Amateur Frequency."); //otherwise, an invalid frequency was entered.
            }
          }
        }
        break;

      default:
        //setValid(true);
        setBorder(validStyle);
        errorMsg = "";
    }

    if (valid) setValid(validBuffer);
  };

  return (
    <div className="fieldContainer">
      <input
        className={style}
        style={border}
        ref={refrence}
        type="text"
        placeholder={type}
        value={value}
        onChange={(e) => {
          validateInput(e.target.value.replace(exp, ""));
        }}
        onBlur={(e) => {
          validateInput(e.target.value.replace(exp, ""));
        }}
        onKeyDown={(e) => {
          if (restore) restore(e, setValue, initValue);
        }}
        onFocus={() => {
          if (!warning) setWarning(true);
        }}
      />
      {!warning && errorMsg !== "" ? <ErrorMessage message={errorMsg} /> : null}
    </div>
  );
}

export default ValidateField;
