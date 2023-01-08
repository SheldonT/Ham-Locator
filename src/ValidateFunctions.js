/** @format */
import { bandDef } from "./constants.js";

export function validateCall(v, setMsg) {
  let msg = "";
  let isValid = true;

  if (v.length === 0) {
    isValid = false;

    msg = "Enter an amateur callsign.";
  } else {
    isValid = true;
    msg = "";
  }
  setMsg(msg);
  return isValid;
}

export function validateFreq(v, setMsg) {
  let msg = "";
  let isValid = true;

  if (v.length === 0) {
    isValid = false;

    msg = "Enter a valid Amateur Frequency.";
  } else {
    for (let i = 0; i < bandDef.length; i++) {
      if (
        parseFloat(v) >= parseFloat(bandDef[i].low) &&
        parseFloat(v) <= parseFloat(bandDef[i].high)
      ) {
        isValid = true;
        msg = "";
        break;
      } else {
        isValid = false;

        msg = "This is not an Amateur Frequency.";
      }
    }
  }
  setMsg(msg);
  return isValid;
}

export function formatSRN(val) {
  let int = val;

  if (val.length != 0) {
    if (parseInt(val) <= 9 && parseInt(val) >= 1 && val.length <= 3) {
      int = `00${parseInt(val)}`;
    }
    if (parseInt(val) <= 99 && parseInt(val) > 9) {
      int = `0${parseInt(val)}`;
    }
    if (parseInt(val) > 99) {
      int = parseInt(val);
    }
  }

  return int.toString();
}
