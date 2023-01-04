/** @format */

import { useEffect, useState } from "react";
import useFetch from "../useFetch.js";
import InfoBar from "./InfoBar.js";
import CallMap from "./CallMap.js";
import InputBar from "./InputBar.js";
import SaveLog from "./SaveLog.js";
import ClearTable from "./ClearTable.js";

import location from "./location.module.css";

function validateEntry(entry, currentList) {
  let result = false;

  if (currentList.find((c) => entry.id === c.id) !== undefined) result = true;

  return result;
}

export const utcHrs = (date) => {
  if (date.getUTCHours() < 10) {
    return "0" + date.getUTCHours();
  } else {
    return date.getUTCHours();
  }
};

export const utcMins = (date) => {
  if (date.getUTCMinutes() < 10) {
    return "0" + date.getUTCMinutes();
  } else {
    return date.getUTCMinutes();
  }
};

function Location({ optionalFields, setHome, homeData, lines }) {
  const [contactInfo, setContactInfo] = useState({});
  const [infoList, setInfoList] = useState([]);
  const [extraInfo, setExtraInfo] = useState();
  const [id, setId] = useState(1);

  const jsonResp = useFetch(contactInfo.call); //fetch station information from callsign

  const resetTable = () => {
    setId(1);
    setInfoList([]);
  };

  useEffect(() => {
    //make sure an entry with jsonResp.id doesn't already exist.
    if (validateEntry(jsonResp, infoList)) {
      alert("An error occured. Please try again.");
    } else {
      if (jsonResp.anchor && contactInfo) {
        const currDate = new Date();
        const utcDate =
          currDate.getUTCFullYear() +
          "-" +
          parseInt(currDate.getUTCMonth() + 1) +
          "-" +
          currDate.getUTCDate();

        const utcTime = utcHrs(currDate) + ":" + utcMins(currDate);

        setId(id + 1);

        setInfoList((previousInfo) => {
          const newData = {
            id: id,
            contactDate: utcDate,
            contactTime: utcTime,
            ...contactInfo,
            ...jsonResp,
          };

          const dataCollection = [newData, ...previousInfo];

          localStorage.setItem("list", JSON.stringify(dataCollection));

          return dataCollection;
        });
      }
    }
  }, [jsonResp]);

  //Check if the "list" array is located in localStorage on first render.

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("list") || "[]");

    if (storedData.length !== 0) {
      setId(storedData.length + 1);
      setInfoList(storedData);
    } else {
      resetTable();
    }

    if (Object.keys(homeData).length === 0) {
      setHome(true);
    }
  }, []);

  return (
    <>
      <div className={location.map}>
        <CallMap
          info={infoList}
          infoLastId={id}
          selectedInfo={extraInfo}
          click={setExtraInfo}
          home={homeData}
          drawLines={lines}
        />

        <InputBar
          home={homeData}
          setInfo={setContactInfo}
          resetExtra={setExtraInfo}
          optionalFields={optionalFields}
        />
      </div>

      <InfoBar
        info={infoList}
        selectedInfo={extraInfo}
        click={setExtraInfo}
        editField={false}
      />

      <div className={location.controlBar}>
        <SaveLog data={infoList} />
        <ClearTable reset={resetTable} count={infoList ? infoList.length : 0} />
      </div>
    </>
  );
}

export default Location;
