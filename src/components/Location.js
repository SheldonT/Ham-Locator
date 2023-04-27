/** @format */

import { useEffect, useState, useContext } from "react";
import useCallData from "../hooks/useCallData.js";
import axios from "axios";
import InfoBar from "./InfoBar.js";
import CallMap from "./CallMap.js";
import InputBar from "./InputBar.js";
import SaveLog from "./SaveLog.js";
import ClearTable from "./ClearTable.js";
import location from "./location.module.css";
import { UserContext } from "../contexts/UserContext.js";
import { SERVER_DOMAIN } from "../constants.js";

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

export const utcSeconds = (date) => {
  if (date.getUTCSeconds() < 10) {
    return "0" + date.getUTCSeconds();
  } else {
    return date.getUTCSeconds();
  }
};

export const formatDate = (date) => {
  let day = "";
  let month = "";

  if (parseInt(date.getUTCMonth() + 1) < 10) {
    month = `0${date.getUTCMonth() + 1}`;
  } else {
    month = date.getUTCMonth() + 1;
  }

  if (parseInt(date.getUTCDate()) < 10) {
    day = `0${date.getUTCDate()}`;
  } else {
    day = date.getUTCDate();
  }

  return date.getUTCFullYear() + "-" + month + "-" + day;
};

function Location({ optionalFields, lines }) {
  const [contactInfo, setContactInfo] = useState({});
  const [infoList, setInfoList] = useState([]);
  const [extraInfo, setExtraInfo] = useState({});
  const [id, setId] = useState(1);

  const jsonResp = useCallData(contactInfo.contactCall);

  const { isAuthenticated } = useContext(UserContext);

  const resetTable = () => {
    setId(1);
    setInfoList([]);
  };

  useEffect(() => {
    const insertToDB = async (newData) => {
      const newRecord = {
        userId: isAuthenticated,
        lat: newData.anchor[0],
        lng: newData.anchor[1],
        ...newData,
      };

      delete newRecord.anchor;

      try {
        await axios.post(`${SERVER_DOMAIN}logs/addrecord`, newRecord);
      } catch (error) {
        console.log(error);
      }
    };

    if (validateEntry(jsonResp, infoList)) {
      console.log("An error occured. Please try again.");
    } else {
      if (jsonResp.anchor && contactInfo) {
        const currDate = new Date();
        const utcDate = formatDate(currDate);

        const utcTime =
          utcHrs(currDate) +
          ":" +
          utcMins(currDate) +
          ":" +
          utcSeconds(currDate);

        setId(id + 1);

        setInfoList((previousInfo) => {
          const newData = {
            id: id,
            contactDate: utcDate,
            contactTime: utcTime,
            ...contactInfo,
            ...jsonResp,
          };

          insertToDB(newData);

          const dataCollection = [newData, ...previousInfo];

          //localStorage.setItem("list", JSON.stringify(dataCollection));

          return dataCollection;
        });
      }
    }
  }, [jsonResp]);

  useEffect(() => {
    //const storedData = JSON.parse(localStorage.getItem("list") || "[]");

    const getLog = async () => {
      try {
        const response = await axios.get(`${SERVER_DOMAIN}logs`, {
          params: { id: isAuthenticated, decend: true },
        });

        if (response.data.length !== 0) {
          setId(response.data.length + 1);
          let data = response.data;

          for (let i = 0; i < data.length; i++) {
            data[i].anchor = [response.data[i].lat, response.data[i].lng];
            data[i].id = data.length - i;

            data[i].contactDate = data[i].contactDate.slice(0, 10);

            delete data[i].lat;
            delete data[i].lng;
            delete data[i].userId;
          }
          setInfoList(data);
        } else {
          resetTable();
        }
      } catch (e) {
        alert(`Server did not respond. Please try again later. \n\n ${e}`);
      }
    };
    getLog();
  }, []);

  return (
    <>
      <div className={location.map}>
        <CallMap
          info={infoList}
          infoLastId={id}
          selectedInfo={extraInfo}
          click={setExtraInfo}
          drawLines={lines}
        />

        <InputBar
          setInfo={setContactInfo}
          resetExtra={setExtraInfo}
          optionalFields={optionalFields}
        />
      </div>

      <InfoBar info={infoList} click={setExtraInfo} editField={false} />

      <div className={location.controlBar}>
        <SaveLog data={infoList} />
        {/*<ClearTable reset={resetTable} count={infoList ? infoList.length : 0} />*/}
      </div>
    </>
  );
}

export default Location;
