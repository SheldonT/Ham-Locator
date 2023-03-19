/** @format */

import { useState } from "react";
import { saveAs } from "file-saver";
import { bandDef } from "../constants.js";
import { utcHrs, utcMins, formatDate } from "./Location.js";
import PopUp from "./PopUp.js";
import Button from "./Button.js";
import saveLog from "./saveLog.module.css";

function toADIF(d) {
  const currDate = new Date();

  const timeStamp =
    formatDate(currDate) + " " + utcHrs(currDate) + utcMins(currDate);

  let dataStr = `Exported by Ham-Locator
https://sheldont.github.io/Ham-Locator
<ADIF_VER:5>3.1.0
<CREATED_TIMESTAMP:${timeStamp.length}> ${timeStamp}
<PROGRAMID:11>Ham-Locator
<PROGRAMVERSION:3>1.1
<eoh>`;

  for (let i = 0; i < d.length; i++) {
    const band = bandDef.find(
      (defs) => d[i].freq >= defs.low && d[i].freq <= defs.high
    ).band;
    const qsoDate = d[i].contactDate.replaceAll("-", "");
    const qsoTime = d[i].contactTime.replaceAll(":", "");

    dataStr = `${dataStr}
<qso_date:${qsoDate.length}>${qsoDate}\
<time_on:${qsoTime.length}>${qsoTime}\
<call:${d[i].contactCall.length}>${d[i].contactCall}\
<band:${band.length}>${band}\
<freq:${d[i].freq.toString().length}>${d[i].freq}\
<mode:${d[i].mode.length}>${d[i].mode}\
<rst_sent:${d[i].sigRepSent.toString().length}>${d[i].sigRepSent}\
<rst_rcvd:${d[i].sigRepRecv.toString().length}>${d[i].sigRepRecv}\
<name:${d[i].name.length}>${d[i].name}\
<stx:${d[i].serialSent.toString().length}>${d[i].serialSent}\
<srx:${d[i].serialRecv.toString().length}>${d[i].serialRecv}\
<gridsquare:${d[i].grid.length}>${d[i].grid}\
<comment:${d[i].comment.length}>${d[i].comment} <eor>
`;
  }

  return dataStr.toUpperCase();
}

function toCSV(d) {
  let dataStr = `call,band,freq,mode,qso_date,time_on,rst_sent,rst_rcvd,name,stx,srx,grid,comment
`;

  for (let i = 0; i < d.length; i++) {
    const band = bandDef.find(
      (defs) => d[i].freq >= defs.low && d[i].freq <= defs.high
    ).band;
    const qsoDate = d[i].contactDate.replaceAll("-", "");
    const qsoTime = d[i].contactTime.replaceAll(":", "");

    dataStr = `${dataStr}${d[i].call},${band},${d[i].freq},\
${d[i].mode},${qsoDate},${qsoTime},${d[i].sigRepSent},\
${d[i].sigRepRecv},${d[i].name},${d[i].serialSent},${d[i].serialRecv},\
${d[i].grid},${d[i].comment}
`;
  }

  return dataStr.toUpperCase();
}

function SaveLog({ data }) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [fileType, setFileType] = useState("adi");
  const [fileName, setFileName] = useState("");

  let blob;

  return (
    <div className={saveLog.saveFile}>
      <Button
        name="Save Log"
        clickEvent={() => {
          setIsPopUpOpen(!isPopUpOpen);
          console.log(data);
        }}
        disarmed={data.length === 0}
      />
      <PopUp styleCSS={saveLog.popUp} show={isPopUpOpen}>
        <span>Save File...</span>

        <div className={saveLog.fileNameInput}>
          <input
            type="radio"
            name="fileType"
            id="adif"
            value="adi"
            checked={fileType === "adi"}
            onChange={(e) => setFileType(e.target.value)}
          />
          <label htmlFor="adif">ADIF</label>
          <input
            style={{ marginLeft: "1rem" }}
            type="radio"
            name="fileType"
            id="csv"
            value="csv"
            checked={fileType === "csv"}
            onChange={(e) => setFileType(e.target.value)}
          />
          <label htmlFor="csv">CSV</label>
        </div>

        <div className={saveLog.fileNameInput}>
          <input
            autoFocus
            className={saveLog.fileName}
            id="fileName"
            type="text"
            placeholder="File Name"
            value={fileName}
            onChange={(e) => {
              setFileName(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                blob = new Blob(
                  [fileType === "adi" ? toADIF(data || []) : toCSV(data || [])],
                  { type: "text/plain" }
                );
                saveAs(blob, fileName + "." + fileType);
                setIsPopUpOpen(false);
              }
            }}
          />
          <span>.{fileType}</span>
        </div>
        <div className={saveLog.popUpButtons}>
          <Button
            name="Save"
            clickEvent={() => {
              blob = new Blob(
                [fileType === "adi" ? toADIF(data || []) : toCSV(data || [])],
                { type: "text/plain" }
              );
              saveAs(blob, fileName + "." + fileType);
              setIsPopUpOpen(false);
            }}
          />
          <Button name="Cancel" clickEvent={() => setIsPopUpOpen(false)} />
        </div>
      </PopUp>
    </div>
  );
}

export default SaveLog;
