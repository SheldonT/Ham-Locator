import {useState, useRef} from 'react';
import "./inputBar.css";
import "./popUp.css";

function InputBar ({setInfo, resetExtra, optionalFields}) {

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

    const callField = useRef();


    const getContact = () => {

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
            comment: comment
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

            callField.current.focus();
      };


    return(

        <div className="inputBar"
            onKeyDown={(e) => {
                if (e.key === "Enter"){
                getContact();
            }
        }}
        >
            <div className="fieldContainer" >
                <input className="callField" 
                    type="text"
                    placeholder="Callsign"
                    value={callSignValue}
                    ref={callField}
                    onChange={(e) => setCallSignValue(e.target.value)}
                />
            </div>
            <div className="fieldContainer">
                <input className="freqField" type="text" placeholder="Freq" value={freqValue} onChange={(e) => setFreqValue(e.target.value.replace(/[^\d.]/g, ""))} />
            </div>

            <div className="fieldContainer" value={mode} onChange={(e) => {setMode(e.target.value)}}>
                <select className="modeInput" id="mode">
                    <option value="SSB">SSB</option>
                    <option value="CW">CW</option>
                    <option value="AM">AM</option>
                    <option value="FM">FM</option>
                    <option value="PSK">PSK</option>
                    <option value="RTTY">RTTY</option>
                    <option value="FT8">FT8</option>
                </select>
            </div>

            <div className="fieldContainer">
                <input className="sigRep" type="text" placeholder="RSTs" value={sentRep} onChange={(e)=> {
                    setSentRep(e.target.value.replace(/[^\d]/g, ""));
                }}/>
            </div>
            
            <div className="fieldContainer">
                <input className="sigRep" type="text" placeholder="RSTr" value={recRep} onChange={(e)=> {
                    setRecRep(e.target.value.replace(/[^\d]/g, ""));
                }}/>
            </div>
            
            <div className="fieldContainer" style={{display: optionalFields.name ? "flex" : "none"}}>
                <input className="comment" type="text" placeholder="Name" value={name} onChange={(e)=> {
                    setName(e.target.value);
                }}/>
            </div>
            
            <div className="fieldContainer" style={{display: optionalFields.grid ? "flex" : "none"}}>
                <input className="freqField" type="text" placeholder="Grid" value={grid} onChange={(e)=> {
                    setGrid(e.target.value);
                }}/>
            </div>

            <div className="fieldContainer" style={{display: optionalFields.serialSent ? "flex" : "none"}}>
                <input className="freqField" type="text" placeholder="SRN" value={serialSent} onChange={(e)=> {
                    setSerialSent(e.target.value.replace(/[^\d]/g, ""));
                }}/>
            </div>

            <div className="fieldContainer" style={{display: optionalFields.serialRcv ? "flex" : "none"}}>
                <input className="freqField" type="text" placeholder="STN" value={serialRcv} onChange={(e)=> {
                    setSerialRcv(e.target.value.replace(/[^\d]/g, ""));
                }}/>
            </div>

            <div className="fieldContainer" style={{display: optionalFields.comment ? "flex" : "none"}}>
                <input className="comment" type="text" placeholder="Comments" value={comment} onChange={(e)=> {
                    setComment(e.target.value);
                }}/>
            </div>

        <button className="submitButton" onClick={() => {
            if (callSignValue !== "" ){ //ignores the mouse click if callsign value is an empty string
                getContact();           //prevents the events from trying to gather the data twice
            }
        }}> Submit </button>

    </div>
    );

}

export default InputBar;