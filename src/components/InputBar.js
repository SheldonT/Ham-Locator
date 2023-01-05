/** @format */

import { useState, useRef } from "react";
import ValidateField from "./ValidateField.js";
import ExtraInfo from "./ExtraInfo.js";
import Button from "./Button.js";
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
  const [serialSent, setSerialSent] = useState(1);
  const [serialRcv, setSerialRcv] = useState("");
  const [comment, setComment] = useState("");

  const [validCall, setValidCall] = useState(false);
  const [validFreq, setValidFreq] = useState(false);
  const [warningCall, setWarningCall] = useState(true);
  const [warningFreq, setWarningFreq] = useState(true);

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
    if (!validCall) {
      setWarningCall(false);
      return;
    }

    if (!validFreq) {
      setWarningFreq(false);
      return;
    }

    //if (validCall && validFreq) {
    const ci = {
      call: callSignValue.toUpperCase(),
      freq: freqValue,
      mode: document.getElementById("mode").value,
      sRep: sentRep,
      rRep: recRep,
      name: name,
      grid: grid,
      serialSent: serialSent,
      serialRcv: serialRcv,
      comment: comment,
    };

    setInfo(ci);
    setCallSignValue("");
    setSentRep("");
    setRecRep("");
    setName("");
    setGrid("");
    setSerialSent(serialSent + 1);
    setSerialRcv("");
    setComment("");
    resetExtra(); //can this be done in Location.js
    //}
    callField.current.focus();
  };

  const liveOut = (c) => {
    let cInfo = callsign.getAmateurRadioInfoByCallsign(c);

    if (cInfo) {
      cInfo = { ...cInfo, country: cInfo.area, call: cInfo.area };
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
        <ValidateField
          message="Enter an amateur callsign."
          style="callField"
          value={callSignValue}
          setValue={setCallSignValue}
          type="Callsign"
          refrence={callField}
          valid={validCall}
          setValid={setValidCall}
          warning={warningCall}
        />
        {callSignValue.length >= 2 ? (
          <ExtraInfo info={liveOut(callSignValue)} infoStyle={popupStyle} />
        ) : null}
      </div>

      <ValidateField
        message="This is not an amateur frequency."
        style="freqField"
        value={freqValue}
        setValue={setFreqValue}
        type="Freq"
        refrence={freqField}
        exp={/[^\d.]/g}
        valid={validFreq}
        setValid={setValidFreq}
        warning={warningFreq}
      />

      <div
        className={inputBar.fieldContainer}
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
        <input
          className={inputBar.sigRep}
          type="text"
          placeholder="RSTs"
          value={sentRep}
          onChange={(e) => {
            setSentRep(e.target.value.replace(/[^\d]/g, ""));
          }}
        />
      </div>

      <div className={inputBar.fieldContainer}>
        <input
          className={inputBar.sigRep}
          type="text"
          placeholder="RSTr"
          value={recRep}
          onChange={(e) => {
            setRecRep(e.target.value.replace(/[^\d]/g, ""));
          }}
        />
      </div>

      <div
        className={inputBar.fieldContainer}
        style={{
          display: optionalFields && optionalFields.name ? "flex" : "none",
        }}
      >
        <input
          className={inputBar.comment}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>

      <div
        className={inputBar.fieldContainer}
        style={{
          display: optionalFields && optionalFields.grid ? "flex" : "none",
        }}
      >
        <input
          className={inputBar.freqField}
          type="text"
          placeholder="Grid"
          value={grid}
          onChange={(e) => {
            setGrid(e.target.value);
          }}
        />
      </div>

      <div
        className={inputBar.fieldContainer}
        style={{
          display:
            optionalFields && optionalFields.serialSent ? "flex" : "none",
        }}
      >
        <input
          className={inputBar.freqField}
          type="text"
          placeholder="STX"
          value={
            parseInt(serialSent) < 10
              ? "00" + serialSent
              : parseInt(serialSent) < 100
              ? "0" + serialSent
              : serialSent
          }
          onChange={(e) => {
            setSerialSent(e.target.value.replace(/[^\d]/g, ""));
          }}
          onBlur={() => {
            setSerialSent(parseInt(serialSent) + 1);
          }}
        />
      </div>

      <div
        className={inputBar.fieldContainer}
        style={{
          display: optionalFields && optionalFields.serialRcv ? "flex" : "none",
        }}
      >
        <input
          className={inputBar.freqField}
          type="text"
          placeholder="SRX"
          value={
            parseInt(serialRcv) < 10
              ? "00" + serialRcv
              : parseInt(serialRcv) < 100
              ? "0" + serialRcv
              : serialRcv
          }
          onChange={(e) => {
            setSerialRcv(e.target.value.replace(/[^\d]/g, ""));
          }}
        />
      </div>

      <div
        className={inputBar.fieldContainer}
        style={{
          display: optionalFields && optionalFields.comment ? "flex" : "none",
        }}
      >
        <input
          className={inputBar.comment}
          type="text"
          placeholder="Comments"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
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
