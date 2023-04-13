/** @format */
import { useState } from "react";
import TextField from "./TextField.js";
import { validateCall, validateFreq } from "../ValidateFunctions.js";
import Button from "./Button.js";
import tableRow from "./tableRow.module.css";
import inputBar from "./inputBar.module.css";

import saveIcon from "../assets/icons/save_black_24dp.svg";
import cancel from "../assets/icons/clear_black_24dp.svg";
import drop from "../assets/icons/delete_black_24dp.svg";

function restore(event, setValue, value) {
  if (event.key === "Escape") {
    setValue(value);
  }

  if (event.ctrlKey && event.key === "z") {
    setValue(value);
  }
}

function TableRow({ info, click, optionalFields, editField, hoverEffect }) {
  const [callSignValue, setCallSignValue] = useState(info.contactCall);
  const [freqValue, setFreqValue] = useState(info.freq);
  const [mode, setMode] = useState(info.mode);
  const [sentRep, setSentRep] = useState(info.sigRepSent);
  const [recRep, setRecRep] = useState(info.sigRepRecv);
  const [name, setName] = useState(info.name);
  const [grid, setGrid] = useState(info.grid);
  const [serialSent, setSerialSent] = useState(info.serialSent);
  const [serialRcv, setSerialRcv] = useState(info.serialRecv);
  const [contactDate, setContactDate] = useState(info.contactDate);
  const [contactTime, setContactTime] = useState(info.contactTime);
  const [comment, setComment] = useState(info.comment);

  const [edit, setEdit] = useState(false);

  const [validCall, setValidCall] = useState(true);
  const [validFreq, setValidFreq] = useState(true);

  const [warningCall, setWarningCall] = useState(false);
  const [warningFreq, setWarningFreq] = useState(false);

  const EditButton = () => {
    return (
      <div className={tableRow.buttonContainer}>
        <Button
          name={edit ? null : "Edit"}
          style={edit ? tableRow.submitButton : null}
          clickEvent={() => {
            if (editField && !edit) {
              setEdit(true);
            }
            if (editField && edit) {
              getContact();
            }
          }}
        >
          {edit ? <img src={saveIcon} /> : null}
        </Button>
        <Button
          show={edit ? true : false}
          style={edit ? tableRow.submitButton : null}
          clickEvent={() => {
            setEdit(false);

            setCallSignValue(info.contactCall);
            setFreqValue(info.freq);
            setMode(info.mode);
            setSentRep(info.sigRepSent);
            setRecRep(info.sigRepRecv);
            setName(info.name);
            setGrid(info.grid);
            setSerialSent(info.serialSent);
            setSerialRcv(info.serialRecv);
            setContactDate(info.contactDate);
            setContactTime(info.contactTime);
            setComment(info.comment);
          }}
        >
          <img src={cancel} />
        </Button>

        <Button
          show={edit ? true : false}
          style={edit ? tableRow.submitButton : null}
          clickEvent={() => deleteRecord()}
        >
          <img src={drop} />
        </Button>
      </div>
    );
  };
  const deleteRecord = () => {
    let rec = info;
    rec.delete = true;
    click(rec);
    setEdit(false);
  };

  const getContact = () => {
    if (!validCall) {
      setWarningCall(false);
    }

    if (!validFreq) {
      setWarningFreq(false);
    }

    if (validCall && validFreq) {
      setEdit(false);

      const ci = {
        ...info,
        contactCall: callSignValue.toUpperCase(),
        freq: freqValue,
        mode: mode,
        sigRepSent: sentRep,
        sigRepRecv: recRep,
        contactDate: contactDate,
        contactTime: contactTime,
        name: name,
        grid: grid,
        serialSent: serialSent,
        serialRecv: serialRcv,
        comment: comment,
      };
      click(ci);
    }
  };

  return (
    <>
      <tr
        className={
          hoverEffect === false ? tableRow.activeRowNoHover : tableRow.activeRow
        }
        onClick={() => {
          if (!editField) {
            click(info);
          }
        }}
      >
        <td
          className={tableRow.buttonCell}
          style={{ display: editField ? "flex" : "none" }}
        >
          {editField ? <EditButton /> : null}
        </td>
        <td className={tableRow.infoCells}>{info.id}</td>
        <td className={tableRow.infoCells}>
          {edit && editField ? (
            <TextField
              fieldStyle={inputBar.callField}
              validate={validateCall}
              value={callSignValue}
              setValue={setCallSignValue}
              keyDown={(e) => restore(e, setCallSignValue, info.contactCall)}
              placeHolder="Callsign"
              setValid={setValidCall}
              warning={warningCall}
              isValid={validCall}
            />
          ) : null}

          {!edit && editField ? callSignValue.toUpperCase() : null}

          {!edit && !editField ? info.contactCall.toUpperCase() : null}
        </td>

        <td className={tableRow.infoCells}>
          {edit && editField ? (
            <TextField
              fieldStyle={inputBar.freqField}
              validate={validateFreq}
              value={freqValue}
              setValue={setFreqValue}
              keyDown={(e) => restore(e, setFreqValue, info.freq)}
              placeHolder="Freq"
              exp={/[^\d.]/g}
              setValid={setValidFreq}
              warning={warningFreq}
              isValid={validFreq}
            />
          ) : null}

          {!edit && editField ? freqValue : null}

          {!edit && !editField ? info.freq : null}
        </td>
        <td className={tableRow.infoCells}>
          <div
            className={inputBar.fieldContainer}
            style={{ display: edit && editField ? "flex" : "none" }}
          >
            <select
              className={inputBar.modeInput}
              value={mode}
              onChange={(e) => {
                setMode(e.target.value);
              }}
            >
              <option value="SSB">SSB</option>
              <option value="CW">CW</option>
              <option value="AM">AM</option>
              <option value="FM">FM</option>
              <option value="PSK">PSK</option>
              <option value="RTTY">RTTY</option>
              <option value="FT8">FT8</option>
            </select>
          </div>

          {!edit && editField ? mode : null}

          {!edit && !editField ? info.mode : null}
        </td>
        <td className={tableRow.infoCells}>
          <div
            className={inputBar.fieldContainer}
            style={{ display: edit && editField ? "flex" : "none" }}
          >
            <TextField
              fieldStyle={inputBar.sigRep}
              value={sentRep}
              setValue={setSentRep}
              keyDown={(e) => restore(e, setSentRep, info.sigRepSent)}
              exp={/[^\d]/g}
              placeHolder="RSTs"
              isValid={true}
            />
          </div>

          {!edit && editField ? sentRep : null}

          {!edit && !editField ? info.sigRepSent : null}
        </td>
        <td className={tableRow.infoCells}>
          <div
            className={inputBar.fieldContainer}
            style={{ display: edit && editField ? "flex" : "none" }}
          >
            <TextField
              fieldStyle={inputBar.sigRep}
              value={recRep}
              setValue={setRecRep}
              keyDown={(e) => restore(e, setRecRep, info.sigRepRecv)}
              exp={/[^\d]/g}
              placeHolder="RSTr"
              isValid={true}
            />
          </div>

          {!edit && editField ? recRep : null}

          {!edit && !editField ? info.sigRepRecv : null}
        </td>
        <td className={tableRow.infoCells}>
          <div
            className={inputBar.fieldContainer}
            style={{ display: edit && editField ? "flex" : "none" }}
          >
            <input
              className={inputBar.dateField}
              type="date"
              value={contactDate}
              onChange={(e) => {
                setContactDate(e.target.value);
              }}
              onKeyDown={(e) => restore(e, setContactDate, info.contactDate)}
            />
          </div>

          {!edit && editField ? contactDate : null}

          {!edit && !editField ? info.contactDate : null}
        </td>
        <td className={tableRow.infoCells}>
          <div
            className={inputBar.fieldContainer}
            style={{ display: edit && editField ? "flex" : "none" }}
          >
            <input
              className={inputBar.dateField}
              type="time"
              value={contactTime}
              onChange={(e) => {
                setContactTime(e.target.value);
              }}
              onKeyDown={(e) => restore(e, setContactTime, info.contactTime)}
            />
          </div>

          {!edit && editField ? contactTime : null}

          {!edit && !editField ? info.contactTime : null}
        </td>
        <td
          style={{
            display: optionalFields && optionalFields.name ? "" : "none",
          }}
          className={tableRow.infoCells}
        >
          <div
            className={inputBar.fieldContainer}
            style={{ display: edit && editField ? "flex" : "none" }}
          >
            <TextField
              fieldStyle={inputBar.comment}
              value={name}
              setValue={setName}
              keyDown={(e) => restore(e, setName, info.name)}
              placeHolder="Name"
              isValid={true}
            />
          </div>

          {!edit && editField ? name : null}

          {!edit && !editField ? info.name : null}
        </td>
        <td
          style={{
            display: optionalFields && optionalFields.grid ? "" : "none",
          }}
          className={tableRow.infoCells}
        >
          <div
            className={inputBar.fieldContainer}
            style={{ display: edit && editField ? "flex" : "none" }}
          >
            <TextField
              fieldStyle={inputBar.freqField}
              value={grid}
              setValue={setGrid}
              keyDown={(e) => restore(e, setGrid, info.grid)}
              placeHolder="Grid"
              isValid={true}
            />
          </div>

          {!edit && editField ? grid : null}

          {!edit && !editField ? info.grid : null}
        </td>
        <td
          style={{
            display: optionalFields && optionalFields.serialSent ? "" : "none",
          }}
          className={tableRow.infoCells}
        >
          <div
            className={inputBar.fieldContainer}
            style={{ display: edit && editField ? "flex" : "none" }}
          >
            <TextField
              fieldStyle={inputBar.freqField}
              value={serialSent}
              setValue={setSerialSent}
              keyDown={(e) => restore(e, setSerialSent, info.serialSent)}
              placeHolder="STX"
              isValid={true}
              exp={/[^\d]/g}
            />
          </div>

          {!edit && editField ? serialSent : null}

          {!edit && !editField ? info.serialSent : null}
        </td>
        <td
          style={{
            display: optionalFields && optionalFields.serialRcv ? "" : "none",
          }}
          className={tableRow.infoCells}
        >
          <div
            className={inputBar.fieldContainer}
            style={{ display: edit && editField ? "flex" : "none" }}
          >
            <TextField
              fieldStyle={inputBar.freqField}
              value={serialRcv}
              setValue={setSerialRcv}
              keyDown={(e) => restore(e, setSerialRcv, info.serialRecv)}
              placeHolder="SRX"
              isValid={true}
              exp={/[^\d]/g}
            />
          </div>

          {!edit && editField ? serialRcv : null}

          {!edit && !editField ? info.serialRecv : null}
        </td>
        <td
          style={{
            display: optionalFields && optionalFields.comment ? "" : "none",
          }}
          className={tableRow.infoCells}
        >
          <div
            className={inputBar.fieldContainer}
            style={{ display: edit && editField ? "flex" : "none" }}
          >
            <TextField
              fieldStyle={inputBar.comment}
              value={comment}
              setValue={setComment}
              keyDown={(e) => restore(e, setComment, info.comment)}
              placeHolder="Comments"
              isValid={true}
            />
          </div>

          {!edit && editField ? comment : null}

          {!edit && !editField ? info.comment : null}
        </td>
      </tr>
    </>
  );
}

export default TableRow;
