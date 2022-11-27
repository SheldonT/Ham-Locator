import { useEffect, useState} from 'react';
import useFetch from "../useFetch.js";
import InfoBar from "./InfoBar.js";
import CallMap from "./CallMap.js";
import SaveLog from "./SaveLog.js";
import PopUp from "./PopUp.js";
import "./location.css";


function validateEntry(entry, currentList){

  let result = false;

  if (currentList.find((c) => entry.id === c.id) !== undefined) result = true;

  return result;
}

export const utcHrs = (date) => {
  if (date.getUTCHours() < 10){
    return "0" + date.getUTCHours();
  } else {
    return date.getUTCHours();
  }
}

export const utcMins =  (date) => {
  if (date.getUTCMinutes() < 10 ){
    return "0" + date.getUTCMinutes();
  } else {
    return date.getUTCMinutes();
  }
}


function Location(){
  
  const [contactInfo, setContactInfo] = useState({});
  const [infoList, setInfoList] = useState([]);
  const [callSignValue, setCallSignValue] = useState("");
  const [freqValue, setFreqValue] = useState("");
  const [sentRep, setSentRep] = useState("");
  const [recRep, setRecRep] = useState("");
  const [extraInfo, setExtraInfo] = useState();
  const [id, setId] = useState(1);

  const jsonResp = useFetch(contactInfo.call); //fetch station information from callsign

  const resetTable = () => {
    setId(1);
    setInfoList([]);
  }

  useEffect( () => {

    //make sure an entry with jsonResp.id doesn't already exist.
    if (validateEntry(jsonResp, infoList)) {
      alert("An error occured. Please try again.");
    } else {

        if((jsonResp.anchor) && (contactInfo)) {

        const currDate = new Date();
        const utcDate = currDate.getUTCFullYear() + "-" + parseInt(currDate.getUTCMonth() + 1) + "-" + currDate.getUTCDate();

        const utcTime = utcHrs(currDate) + ":" + utcMins(currDate);

        setId(id + 1);
        
        setInfoList( (previousInfo) => {

          let newData = [Object.assign({
            id: id,
            call: contactInfo.call,
            freq: contactInfo.frequency,
            mode: contactInfo.mode,
            sRep: contactInfo.rsts,
            rRep: contactInfo.rstr,
            contactDate: utcDate,
            contactTime: utcTime
          }, jsonResp), ...previousInfo];

          localStorage.setItem("list", JSON.stringify(newData));

          return newData;
        } );
      }
    }

  }, [jsonResp]);

  //Check if the "list" array is located in localStorage on first render.

  useEffect(() => {

    const storedData = JSON.parse(localStorage.getItem("list") || "[]" );


    if (storedData.length !== 0){

      setId(storedData.length + 1);
      setInfoList(storedData);

    } else {
   
      resetTable();
    }

  },[]);
  
  const getContact = () => {

    const ci = {
      call: callSignValue.toUpperCase(),
      frequency: freqValue,
      mode: document.getElementById("mode").value,
      rsts: sentRep,
      rstr: recRep
    };

      setContactInfo(ci);
      setCallSignValue("");
      setSentRep("");
      setRecRep("");
      setExtraInfo();
  };

  return(
    <>
      <div className="map" >
        <CallMap info={infoList} infoLastId={id} selectedInfo={extraInfo} click={setExtraInfo} />

        <div className="inputBar"
          onKeyPress={(e) => {
            if (e.key === "Enter"){
              getContact();
            }
          }}
        >

          <input className="callField" 
            type="text"
            placeholder="Callsign"
            value={callSignValue}
            onChange={(e) => setCallSignValue(e.target.value)}
             />

          <input className="freqField" type="text" placeholder="Freq" value={freqValue} onChange={(e) => setFreqValue(e.target.value.replace(/[^\d.]/g, ""))} />


          <select className="modeInput" id="mode">
            <option value="SSB">SSB</option>
            <option value="CW">CW</option>
            <option value="AM">AM</option>
            <option value="FM">FM</option>
            <option value="PSK">PSK</option>
            <option value="RTTY">RTTY</option>
            <option value="FT8">FT8</option>
          </select>

          <input className="sigRep" type="text" placeholder="RSTs" value={sentRep} onChange={(e)=> {
            setSentRep(e.target.value.replace(/[^\d]/g, ""));
          }}/>

          <input className="sigRep" type="text" placeholder="RSTr" value={recRep} onChange={(e)=> {
            setRecRep(e.target.value.replace(/[^\d]/g, ""));
          }}/>

        <button className="submitButton" onClick={() => {
            if (callSignValue !== "" ){ //ignores the mouse click if callsign value is an empty string
              getContact();             //prevents the events from trying to gather the data twice
            }
          }
        }> Submit </button>
      </div>

    </div>
      
      <InfoBar info={infoList} selectedInfo={extraInfo} click={setExtraInfo} />
      
      <div className="controlBar">
        <SaveLog data={infoList} />
        <PopUp reset={resetTable} count={infoList ? infoList.length : 0} />
      </div>
    </>
  );
}

export default Location;