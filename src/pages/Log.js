/** @format */

import { useState, useEffect, useContext } from "react";
import InfoBar from "../components/InfoBar.js";
import axios from "axios";
import { UserContext } from "../contexts/UserContext.js";
import SaveLog from "../components/SaveLog.js";
import { SERVER_DOMAIN } from "../constants.js";

const infoListStyle = {
  position: "relative",
  borderRadius: "0",
  boxShadow: "none",
  backgroundColor: "var(--infoBarColor)",
  width: "100%",
  minHeight: "80vh",
  overflowY: "auto",
  margin: "0 auto 1rem auto",
};

function Log({ optionalFields }) {
  const [record, setRecord] = useState({});
  const [infoList, setInfoList] = useState([]);

  const { isAuthenticated } = useContext(UserContext);

  //const isAuth = JSON.parse(
  //  localStorage.getItem("authUser") || `{"authUser" : -1 }`
  //).authUser;

  const getLog = async () => {
    try {
      const response = await axios.get(`${SERVER_DOMAIN}/logs`, {
        params: { id: isAuthenticated, decend: true },
      });

      if (response.data.length !== 0) {
        let data = response.data;

        for (let i = 0; i < data.length; i++) {
          data[i].anchor = [response.data[i].lat, response.data[i].lng];
          data[i].id = data.length - i;

          data[i].contactDate = data[i].contactDate.slice(0, 10);

          delete data[i].lat;
          delete data[i].lng;
          delete data[i].userId;
        }

        data.sort((a, b) => {
          return new Date(b.contactDate) - new Date(a.contactDate);
        });

        setInfoList(data);
      } else {
        console.log("No Log Found");
      }
    } catch (e) {
      alert(`Server did not respond. Please try again later. \n\n ${e}`);
    }
  };

  const editRecord = async () => {
    let newRecord = {
      lat: record.anchor[0],
      lng: record.anchor[1],
      userId: isAuthenticated,
      ...record,
    };
    delete newRecord.anchor;
    delete newRecord.id;

    try {
      await axios.post(`${SERVER_DOMAIN}/logs/editrecord`, newRecord);
    } catch (e) {
      alert(`Server did not respond. Please try again later. \n\n ${e}`);
    }
  };

  const deleteRecord = async () => {
    try {
      await axios.post(`${SERVER_DOMAIN}/logs/deleterecord`, {
        userId: isAuthenticated,
        recordId: record.recordId,
      });
    } catch (e) {
      alert(`Server did not respond. Please try again later. \n\n ${e}`);
    }
  };

  useEffect(() => {
    if (infoList.length === 0) {
      getLog();
    }

    if (Object.keys(record).length !== 0) {
      if (record.hasOwnProperty("delete") === true) {
        deleteRecord();
      }

      if (!record.hasOwnProperty("delete")) editRecord();
    }

    let info = [];

    for (let i = 0; i < infoList.length; i++) {
      if (infoList[i].recordId !== record.recordId) {
        info.push(infoList[i]);
      }
      if (
        infoList[i].recordId === record.recordId &&
        record.hasOwnProperty("delete") === false
      ) {
        info.push(record);
      }
    }

    setInfoList(info);
  }, [record]);

  return (
    <>
      <InfoBar
        style={infoListStyle}
        info={infoList}
        selectedInfo={record}
        click={setRecord}
        optionalFields={optionalFields}
        editField={true}
        hoverEffect={false}
      />
    </>
  );
}

export default Log;
