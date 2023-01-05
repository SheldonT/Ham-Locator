/** @format */
import { useState } from "react";
import { bandDef } from "../constants.js";
import PopUp from "./PopUp.js";
import attention from "../assets/attention.svg";
import inputBar from "./inputBar.module.css";

function ValidateField({
  style,
  value,
  setValue,
  type,
  initValue,
  setValid,
  restore,
  refrence,
  warning,
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

    switch (type) {
      case "Callsign":
        if (v.length === 0) {
          //error condition: if no call is entered
          setValid(false);
          setBorder(warningStyle);
          setErrorMsg("Enter an amateur callsign.");
        } else {
          setValid(true);
          setBorder(validStyle);
          setErrorMsg("");
        }

        break;
      case "Freq":
        if (v.length === 0) {
          //error condition: if no frequency is entered
          setValid(false);
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
              setValid(true);
              setBorder(validStyle);
              setErrorMsg(""); //assign empty string and...
              break; // break from for loop
            } else {
              setValid(false);
              setBorder(warningStyle);
              setErrorMsg("This is not an Amateur Frequency."); //otherwise, an invalid frequency was entered.
            }
          }
        }
        break;

      default:
        setBorder(validStyle);
        errorMsg = "";
    }
  };

  return (
    <div className={inputBar.fieldContainer}>
      <input
        className={inputBar[style]}
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
      />

      <PopUp
        styleCSS={inputBar.errorPopUp}
        icon={attention}
        iconSize={{ height: "3rem", width: "3rem" }}
        show={!warning && errorMsg !== ""}
      >
        <p className={inputBar.errorText}>{errorMsg}</p>
      </PopUp>
    </div>
  );
}

export default ValidateField;
