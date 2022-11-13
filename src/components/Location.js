import { useEffect, useState} from 'react';
import useFetch from "../useFetch.js";
import InfoBar from "./InfoBar.js";
import CallMap from "./CallMap.js";
import PopUp from "./PopUp.js";


function validateEntry(entry, currentList){

  let result = false;

  if (currentList.find((c) => entry.id === c.id) !== undefined) result = true;

  return result;
}


function Location(){
  
  //const [callSign, setCallSign] = useState({});
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
        const utcDate = currDate.getUTCFullYear() + "-" + currDate.getUTCMonth() + "-" + currDate.getUTCDate();

        const utcMins =  () => {
          if (currDate.getUTCMinutes() < 10 ){
            return "0" + currDate.getUTCMinutes();
          } else {
            return currDate.getUTCMinutes();
          }
        }

        const utcTime = currDate.getUTCHours() + ":" + utcMins();

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
  

  return(
    <>
      <div className="map" >
        <CallMap info={infoList} infoLastId={id} selectedInfo={extraInfo} click={setExtraInfo} />

        <div className="inputBar" onKeyPress={(e) => {
          if (e.key === "Enter"){

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
          }
        }}>
        
        
          <input className="callField" type="text" id="callSign" placeholder="Callsign" value={callSignValue} onChange={(e) => setCallSignValue(e.target.value)} name="callSign" />

          <input className="freqField" type="text" id="freq" name="freq" placeholder="Frequency" value={freqValue} onChange={(e) => {
            setFreqValue(e.target.value.replace(/[^\d.]/g, ""));
          }}/>

          <select className="modeInput" id="mode" name="mode">
            <option value="ssb">SSB</option>
            <option value="cw">CW</option>
            <option value="psk">PSK</option>
            <option value="rtty">RTTY</option>
            <option value="ft8">FT8</option>
          </select>

          <input className="sigRep" type="text" id="rsts" name="rsts" placeholder="RSTs" value={sentRep} onChange={(e)=> {
            setSentRep(e.target.value.replace(/[^\d]/g, ""));
          }}/>

          <input className="sigRep" type="text" id="rstr" name="rstr" placeholder="RSTr" value={recRep} onChange={(e)=> {
            setRecRep(e.target.value.replace(/[^\d]/g, ""));
          }}/>

          <button onClick={() => {

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

          }} > Submit </button>
        </div>

      </div>
      
      <InfoBar info={infoList} selectedInfo={extraInfo} click={setExtraInfo} />
      
      <PopUp reset={resetTable} count={infoList ? infoList.length : 0} />
    </>
  );
}

export default Location;