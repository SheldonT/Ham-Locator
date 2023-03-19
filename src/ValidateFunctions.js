/** @format */
import { bandDef } from "./constants.js";

export function validateCall(v, setMsg) {
  let msg = "";
  let isValid = true;

  if (v.length < 3) {
    isValid = false;

    msg = "Enter a valid amateur callsign.";
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
  } else {
    val = 0;
  }

  return int.toString();
}

export function validatePasswd(v, setMsg) {
  let msg = "";
  let isValid = true;

  if (v.length < 8) {
    isValid = false;

    msg = "Password must be at least 8 characters long.";
  } else {
    isValid = true;
    msg = "";
  }
  setMsg(msg);
  return isValid;
}

export function validateEmail(v, setMsg) {
  let msg = "";
  let isValid = true;

  if (v.length === 0) {
    isValid = false;
    msg = "Invalid email address.";
  } else {
    isValid = true;
    msg = "";
  }
  setMsg(msg);
  return isValid;
}
