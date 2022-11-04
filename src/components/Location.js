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
  
  const [callSign, setCallSign] = useState("");
  const [infoList, setInfoList] = useState([]);
  const [callSignValue, setCallSignValue] = useState("");
  const [extraInfo, setExtraInfo] = useState();
  const [id, setId] = useState(1);

  const jsonResp = useFetch(callSign); //fetch station information from callsign

  const resetTable = () => {
    setId(1);
    setInfoList([]);
  }

  useEffect( () => {

    //make sure an entry with jsonResp.id doesn't already exist.
    if (validateEntry(jsonResp, infoList)) {
      alert("An error occured. Please try again.");
    } else {
    
        if((jsonResp.anchor) && (callSign !== "")) {

        setId(id + 1);
        
        setInfoList( (previousInfo) => {

          let newData = [Object.assign({call: callSign, id: id},  jsonResp), ...previousInfo];

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

        <div className="bottomBar">
        
        
          <input className="callField" type="text" id="callSign" placeholder="Enter a Callsign" value={callSignValue} onChange={(e) => setCallSignValue(e.target.value)} onKeyPress={(e) => {
            if (e.key === "Enter"){
              setCallSign(e.target.value.toUpperCase());
              setCallSignValue("");
              setExtraInfo();
            }
          }} name="callSign" />

          <button onClick={() => {
            setCallSign(callSignValue.toUpperCase());
            setCallSignValue("");
            setExtraInfo();
          }} > Submit </button>
        </div>

      </div>
      
      <InfoBar info={infoList} selectedInfo={extraInfo} click={setExtraInfo} />
      
      <PopUp reset={resetTable} count={infoList.length} />
    </>
  );
}

export default Location;