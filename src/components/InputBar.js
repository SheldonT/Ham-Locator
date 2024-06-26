/** @format */

import { useState, useRef } from "react";
import TextField from "./TextField.js";
import ExtraInfo from "./ExtraInfo.js";
import Button from "./Button.js";
import { validateCall, validateFreq, formatSRN } from "../ValidateFunctions.js";
import callsign from "callsign";
import inputBar from "./inputBar.module.css";

function InputBar({ setInfo, resetExtra, optionalFields }) {
  const [callSignValue, setCallSignValue] = useState("");
  const [freqValue, setFreqValue] = useState("");
  const [mode, setMode] = useState("SSB");
  const [sentRep, setSentRep] = useState("");
  const [recRep, setRecRep] = useState("");
  const [name, setName] = useState("");
  const [grid, setGrid] = useState("");
  const [serialSent, setSerialSent] = useState("000");
  const [serialRcv, setSerialRcv] = useState("000");
  const [comment, setComment] = useState("");

  const [validCall, setValidCall] = useState(true);
  const [validFreq, setValidFreq] = useState(true);
  const [warningCall, setWarningCall] = useState(false);
  const [warningFreq, setWarningFreq] = useState(false);

  const callField = useRef();
  const freqField = useRef();

  const popupStyle = {
    borderRadius: "1.5rem 1.5rem 1.5rem 0",
    width: "auto",
    top: "auto",
    left: "10%",
    bottom: "100%",
    right: "auto",
  };

  const getContact = () => {
    callField.current.focus();
    freqField.current.focus();

    if (!validCall) {
      setWarningCall(true);
    }

    if (!validFreq) {
      setWarningFreq(true);
    }

    if (
      validCall &&
      validFreq &&
      freqValue.length !== 0 &&
      callSignValue.length !== 0
    ) {
      if (!serialRcv || serialRcv.length === 0);

      const ci = {
        contact_call: callSignValue.toUpperCase(),
        freq: freqValue,
        mode: document.getElementById("mode").value,
        sig_rep_sent: sentRep,
        sig_rep_recv: recRep,
        name: name,
        grid: grid,
        serial_sent: !serialSent || serialSent.length === 0 ? 0 : serialSent,
        serial_recv: !serialRcv || serialRcv.length === 0 ? 0 : serialRcv,
        comment: comment,
      };

      setInfo(ci);
      setCallSignValue("");
      setSentRep("");
      setRecRep("");
      setName("");
      setGrid("");
      setSerialSent(serialSent);
      setSerialRcv("");
      setComment("");
      resetExtra({}); //can this be done in Location.js

      setWarningCall(false);
      setWarningFreq(false);

      //localStorage.setItem("lastEntry", JSON.stringify(ci.contactCall));
    }
    callField.current.focus();
  };

  const liveOut = (c) => {
    let cInfo = callsign.getAmateurRadioInfoByCallsign(c);

    if (cInfo) {
      cInfo = { ...cInfo, country: cInfo.area, contact_call: cInfo.area };
      delete cInfo.area;
    }

    return cInfo;
  };

  return (
    <div
      className={inputBar.inputBar}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          getContact();
        }
      }}
    >
      <div style={{ position: "relative" }}>
        <TextField
          fieldStyle={inputBar.callField}
          validate={validateCall}
          value={callSignValue}
          setValue={setCallSignValue}
          placeHolder="Callsign"
          refrence={callField}
          setValid={setValidCall}
          warning={warningCall}
          isValid={validCall}
        />
        {callSignValue.length >= 2 ? (
          <ExtraInfo info={liveOut(callSignValue)} infoStyle={popupStyle} />
        ) : null}
      </div>

      <TextField
        fieldStyle={inputBar.freqField}
        validate={validateFreq}
        value={freqValue}
        setValue={setFreqValue}
        placeHolder="Freq"
        refrence={freqField}
        exp={/[^\d.]/g}
        setValid={setValidFreq}
        warning={warningFreq}
        isValid={validFreq}
      />

      <div
        className={inputBar.modeCont}
        value={mode}
        onChange={(e) => {
          setMode(e.target.value);
        }}
      >
        <select className={inputBar.modeInput} id="mode">
          <option value="SSB">SSB</option>
          <option value="CW">CW</option>
          <option value="AM">AM</option>
          <option value="FM">FM</option>
          <option value="PSK">PSK</option>
          <option value="RTTY">RTTY</option>
          <option value="FT8">FT8</option>
        </select>
      </div>

      <div className={inputBar.fieldContainer}>
        <TextField
          fieldStyle={inputBar.sigRep}
          value={sentRep}
          setValue={setSentRep}
          exp={/[^\d]/g}
          placeHolder="RSTs"
          isValid={true}
        />
      </div>

      <div className={inputBar.fieldContainer}>
        <TextField
          fieldStyle={inputBar.sigRep}
          value={recRep}
          setValue={setRecRep}
          exp={/[^\d]/g}
          placeHolder="RSTr"
          isValid={true}
        />
      </div>

      <div
        className={inputBar.fieldContainer}
        style={{
          display: optionalFields && optionalFields.name ? "flex" : "none",
        }}
      >
        <TextField
          fieldStyle={inputBar.comment}
          value={name}
          setValue={setName}
          placeHolder="Name"
          isValid={true}
        />
      </div>

      <div
        className={inputBar.fieldContainer}
        style={{
          display: optionalFields && optionalFields.grid ? "flex" : "none",
        }}
      >
        <TextField
          fieldStyle={inputBar.freqField}
          value={grid}
          setValue={setGrid}
          placeHolder="Grid"
          isValid={true}
        />
      </div>

      <div
        className={inputBar.fieldContainer}
        style={{
          display:
            optionalFields && optionalFields.serialSent ? "flex" : "none",
        }}
      >
        <TextField
          fieldStyle={inputBar.freqField}
          value={formatSRN(serialSent)}
          setValue={setSerialSent}
          keyDown={(e) => {
            if (e.key === "Tab")
              setSerialSent(formatSRN(parseInt(serialSent) + 1));
          }}
          placeHolder="STX"
          isValid={true}
          exp={/[^\d]/g}
        />
      </div>

      <div
        className={inputBar.fieldContainer}
        style={{
          display: optionalFields && optionalFields.serialRcv ? "flex" : "none",
        }}
      >
        <TextField
          fieldStyle={inputBar.freqField}
          value={formatSRN(serialRcv)}
          setValue={setSerialRcv}
          placeHolder="SRX"
          isValid={true}
          exp={/[^\d]/g}
        />
      </div>

      <div
        className={inputBar.fieldContainer}
        style={{
          display: optionalFields && optionalFields.comment ? "flex" : "none",
        }}
      >
        <TextField
          fieldStyle={inputBar.comment}
          value={comment}
          setValue={setComment}
          placeHolder="Comments"
          isValid={true}
        />
      </div>
      <Button
        name="Submit"
        clickEvent={() => {
          if (callSignValue !== "") {
            //ignores the mouse click if callsign value is an empty string
            getContact(); //prevents the events from trying to gather the data twice
          }
        }}
      />
    </div>
  );
}

export default InputBar;
