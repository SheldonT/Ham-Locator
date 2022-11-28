import {useState} from 'react';
import {saveAs} from "file-saver";
import {bandDef} from "../constants.js";
import {utcHrs, utcMins} from "./Location.js";
import "./popUp.css";
import "./saveLog.css";

function toADIF(d){

    const currDate = new Date();

    const timeStamp = currDate.getUTCFullYear() + parseInt(currDate.getUTCMonth() + 1) + currDate.getUTCDate() + " " +
    utcHrs(currDate) + utcMins(currDate);

    let dataStr = 
`Exported by Ham-Locator
https://sheldont.github.io/Ham-Locator
<ADIF_VER:5>3.1.0
<CREATED_TIMESTAMP:${timeStamp.length}> ${timeStamp}
<PROGRAMID:11>Ham-Locator
<PROGRAMVERSION:3>1.1
<eoh>`;

    for (let i = 0; i <d.length; i++){

        const band = bandDef.find((defs) => ((d[i].freq >= defs.low) && (d[i].freq <= defs.high)) ).band;
        const qsoDate = d[i].contactDate.replaceAll('-', '');
        const qsoTime = d[i].contactTime.replaceAll(':', '');

       
        dataStr =
`${dataStr}
<qso_date:${qsoDate.length}>${qsoDate}\
<time_on:${qsoTime.length}>${qsoTime}\
<call:${d[i].call.length}>${d[i].call}\
<band:${band.length}>${band}\
<freq:${d[i].freq.length}>${d[i].freq}\
<mode:${d[i].mode.length}>${d[i].mode}\
<rst_sent:${d[i].sRep.length}>${d[i].sRep}\
<rst_rcvd:${d[i].rRep.length}>${d[i].rRep}<eor>
`;
    }  
    

    return dataStr.toUpperCase();
}

function toCSV(d){
    let dataStr = 
`call,band,freq,mode,qso_date,time_on,rst_sent,rst_rcvd
`;

    for (let i = 0; i < d.length; i++){

        const band = bandDef.find((defs) => ((d[i].freq >= defs.low) && (d[i].freq <= defs.high)) ).band;
        const qsoDate = d[i].contactDate.replaceAll('-', '');
        const qsoTime = d[i].contactTime.replaceAll(':', '');

        dataStr = 
`${dataStr}${d[i].call},${band},${d[i].freq},${d[i].mode},${qsoDate},${qsoTime},${d[i].sRep},${d[i].rRep}
`;
    }

    return dataStr.toUpperCase();
}


function SaveLog({data}) {

    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [fileType, setFileType] = useState("adi");
    const [fileName, setFileName] = useState("");

    let blob;

    const PopUpMenu = () => {

        return(
        <div className="popUp">
            <span>Save File...</span>

            <div className="fileNameInput">
                <input type="radio" name="fileType" id="adif" value="adi" checked={fileType === "adi"} onChange={(e) => setFileType(e.target.value)} /><label htmlFor="adif">ADIF</label>
                <input style={{marginLeft: "1rem"}} type="radio" name="fileType" id="csv" value="csv" checked={fileType === "csv"} onChange={(e) => setFileType(e.target.value)}/><label htmlFor="csv">CSV</label>
            </div>

            <div className="fileNameInput">
                <input autoFocus className="fileName" id="fileName" type="text" placeholder="File Name" value={fileName}

                onChange={(e) => {
                    setFileName(e.target.value)
                }}

                onKeyPress={(e) => {
                    if(e.key === "Enter"){
                        blob = new Blob([ (fileType === "adi") ? toADIF(data || []) : toCSV(data || [])], {type: "text/plain"});
                        saveAs(blob, fileName + "." + fileType);
                        setIsPopUpOpen(false);
                    }
                
                }} /><span>.{fileType}</span>

            </div>
            <div className="popUpButtons">
                <button className="options" onClick={ () => {
                    blob = new Blob([ (fileType === "adi") ? toADIF(data || []) : toCSV(data || [])], {type: "text/plain"});
                    saveAs(blob, fileName + "." + fileType);
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