import {useState} from 'react';
import {saveAs} from "file-saver";
import {bandDef} from "../constants.js";
import "./popUp.css";
import "./saveLog.css";

function toADIF(d){
    let dataStr = "";

    for (let i = 0; i < d.length; i++){

        const band = bandDef.find((defs) => ((d[i].freq >= defs.low) && (d[i].freq <= defs.high)) ).band;
        const qsoDate = d[i].contactDate.replaceAll('-', '');
        const qsoTime = d[i].contactTime.replaceAll(':', '');

        dataStr += "<call:6>" + d[i].call + "<band:3>" + band + "<freq:7>" + d[i].freq + "<mode:6>" + d[i].mode +
            "<qso_date:8>" + qsoDate + "<time_on:4>" + qsoTime + "<rst_sent:3>" + d[i].sRep + "<rst_rvcd:3>" + d[i].rRep + "<eor>\r";
    }

    return dataStr;
}


function SaveLog({data}) {

    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [fileName, setFileName] = useState("");
    const blob = new Blob([toADIF(data)]);

    const PopUpMenu = () => {

        return(
        <div className="popUp">
            <span>Save File...</span>
            <div className="fileNameInput">
                <input autoFocus className="fileName" id="fileName" type="text" placeholder="File Name" value={fileName}

                onChange={(e) => {
                    setFileName(e.target.value)
                }}

                onKeyPress={(e) => {
                    if(e.key === "Enter"){
                        saveAs(blob, fileName + ".adif");
                        setIsPopUpOpen(false);
                    }
                
                }} /><span>.adif</span>

            </div>
            <div className="popUpButtons">
                <button className="options" onClick={ () => {
                    setFileName(document.getElementById("fileName").value);
                    saveAs(blob, fileName + ".adif");
                    setIsPopUpOpen(false);
                }}>Save</button>
                <button className="options" onClick={ () => setIsPopUpOpen(false) } >Cancel</button>
            </div>
        </div>);
    }

    
    return(
        <div className="clearTable">

            <button className="options" onClick={() => setIsPopUpOpen(!isPopUpOpen)} disabled={ data.length === 0 } >Save Log</button>
            {isPopUpOpen ? <PopUpMenu /> : null}
            
        </div>
    );
}

export default SaveLog;