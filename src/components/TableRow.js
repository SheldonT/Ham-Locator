
import { useState, useEffect } from 'react';
import ValidateField from "./ValidateField.js";
import "./tableRow.css";
import "./inputBar.css";


function TableRow({info, activeInfo, click, optionalFields, editField}){

  const [callSignValue, setCallSignValue] = useState(info.call); 
  const [freqValue, setFreqValue] = useState(info.freq);
  const [mode, setMode] = useState(info.mode);
  const [sentRep, setSentRep] = useState(info.sRep);
  const [recRep, setRecRep] = useState(info.rRep);
  const [name, setName] = useState(info.name);
  const [grid, setGrid] = useState(info.grid);
  const [serialSent, setSerialSent] = useState(info.serialSent);
  const [serialRcv, setSerialRcv] = useState(info.serialRcv);
  const [contactDate, setContactDate] = useState(info.contactDate);
  const [contactTime, setContactTime] = useState(info.contactTime);
  const [comment, setComment] = useState(info.comment);

  const [edit, setEdit] = useState(false);

  const[valid, setValid] = useState({Callsign: false, Freq: false});

  const EditButton = () => {
    return(
      <td>
        <button className="submitButton" onClick={ () => {

            if (editField && !edit) {
              click(info);
            }
            if (editField && edit) {
              getContact();
            }
          }
        } >
          {edit ? "Submit" : "Edit"}
        </button>
      </td>
    );
  }


  useEffect(() => {

    if (info && activeInfo && editField) {
      if(activeInfo.id === info.id) {
        setEdit(true);
      } else {
        setEdit(false);
      }

      if (info !== activeInfo) {
        setEdit(false);
      }
    }

  }, [activeInfo]);

  const getContact = () => {

    if (!valid.Callsign && !valid.Freq){
      setEdit(false);

      const ci = {
        id: info.id,
        call: callSignValue.toUpperCase(),
        freq: freqValue,
        mode: mode,
        sRep: sentRep,
        rRep: recRep,
        contactDate: contactDate,
        contactTime: contactTime,
        name: name,
        grid: grid,
        serialSent: serialSent,
        serialRcv: serialRcv,
        comment: comment
      };

      click(ci);
    }

  };

  const OpFields = () => {
    if(optionalFields) {
      return(
        <>
          <td style={{display: optionalFields.name ? "" : "none"}} className="infoCells">
            <div className="fieldContainer" style={{display: edit ? "flex" : "none"}}>
              <input className="comment" type="text"  value={name} onChange={(e) => {setName(e.target.value)}} />
            </div>
            {!edit ? info.name : null}
          </td>
          <td style={{display: optionalFields.grid ? "" : "none"}} className="infoCells">
            <div className="fieldContainer" style={{display: edit ? "flex" : "none"}}>
              <input className="freqField" type={edit ? "text" : "hidden"} value={grid} onChange={(e) => {setGrid(e.target.value)}} />
            </div>
            {!edit ? info.grid : null}
          </td>
          <td style={{display: optionalFields.serialSent ? "" : "none"}} className="infoCells">
            <div className="fieldContainer" style={{display: edit ? "flex" : "none"}}>
              <input className="freqField" type="text" value={serialSent} onChange={(e) => {setSerialSent(e.target.value.replace(/[^\d]/g, ""))}} />
            </div>
            {!edit ? info.serialSent : null}
          </td>
          <td style={{display: optionalFields.serialRcv ? "" : "none"}} className="infoCells">
            <div className="fieldContainer" style={{display: edit ? "flex" : "none"}}>
              <input className="freqField" type="text" value={serialRcv} onChange={(e) => {setSerialRcv(e.target.value.replace(/[^\d]/g, ""))}} />
            </div>
            {!edit ? info.serialRcv : null}
          </td>
          <td style={{display: optionalFields.comment ?  "" : "none"}} className="infoCells">
            <div className="fieldContainer" style={{display: edit ? "flex" : "none"}}>
              <input className="comment" type="text" value={comment} onChange={(e) => {setComment(e.target.value)}} />
            </div>
            {!edit ? info.comment : null}
          </td>
        </>
      );} else{
        return(<></>);
      }
  }

      return(
        <>
          <tr className="activeRow" onClick={ () => {
            if (!editField) click(info);

          }} >
              {editField ? <EditButton /> : null}
              <td className="infoCells">
                {info.id}
              </td>
              <td className="infoCells">
                
                {edit ? <ValidateField
                  message="Enter an amateur callsign."
                  style="callField"
                  error={valid}
                  setError={setValid}
                  value={callSignValue}
                  setValue={setCallSignValue}
                  type="Callsign" /> : null}
                
                {!edit ? info.call : null}
              </td>

              <td className="infoCells">
                {edit ? <ValidateField
                  message="This is not an amateur frequency."
                  style="freqField"
                  error={valid}
                  setError={setValid}
                  value={freqValue}
                  setValue={setFreqValue}
                  type="Freq"
                  exp={/[^\d.]/g} /> : null}
                
                {!edit ? info.freq : null}
              </td>
              <td className="infoCells" >
                <div className="fieldContainer" style={{display: edit ? "flex" : "none"}}>
                  <select className="modeInput" value={mode} onChange={(e) => {setMode(e.target.value)}}>
                    <option value="SSB">SSB</option>
                    <option value="CW">CW</option>
                    <option value="AM">AM</option>
                    <option value="FM">FM</option>
                    <option value="PSK">PSK</option>
                    <option value="RTTY">RTTY</option>
                    <option value="FT8">FT8</option>
                  </select>
                </div>
                {!edit ? info.mode : null}
              </td>
              <td className="infoCells">
                <div className="fieldContainer" style={{display: edit ? "flex" : "none"}}>
                  <input className="sigRep" type="text" value={sentRep} onChange={(e) => {setSentRep(e.target.value.replace(/[^\d]/g, ""))}} />
                </div>
                {!edit ? info.sRep : null}
              </td>
              <td className="infoCells">
                <div className="fieldContainer" style={{display: edit ? "flex" : "none"}}>
                  <input className="sigRep" type="text" value={recRep} onChange={(e) => {setRecRep(e.target.value.replace(/[^\d]/g, ""))}} />
                </div>
                {!edit ? info.rRep : null}
              </td>
              <td className="infoCells">
                <div className="fieldContainer" style={{display: edit ? "flex" : "none"}}>
                  <input className="dateField" type="date" value={contactDate} onChange={(e) => {setContactDate(e.target.value)}} />
                </div>
                {!edit ? info.contactDate : null}
              </td>
              <td className="infoCells">
                <div className="fieldContainer" style={{display: edit ? "flex" : "none"}}>
                  <input className="dateField" type="time" value={contactTime} onChange={(e) => {setContactTime(e.target.value)}} />
                </div>
                {!edit ? info.contactTime : null}
              </td>
              <OpFields />
            </tr>
        </>
      );
    
  }

  export default TableRow;
