/** @format */

import { useState, useEffect } from "react";
import InfoBar from "../components/InfoBar.js";
import axios from "axios";
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

  const isAuth = JSON.parse(
    localStorage.getItem("authUser") || `{"authUser" : -1 }`
  ).authUser;

  const getLog = async () => {
    try {
      const response = await axios.get(`${SERVER_DOMAIN}/logs`, {
        params: { id: isAuth, decend: true },
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
        setInfoList(data);
      } else {
        console.log("No Log Found");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editRecord = async () => {
    let newRecord = {
      lat: record.anchor[0],
      lng: record.anchor[1],
      userId: isAuth,
      ...record,
    };
    delete newRecord.anchor;
    delete newRecord.id;

    try {
      await axios.post(`${SERVER_DOMAIN}/logs/editrecord`, newRecord);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (infoList.length === 0) {
      getLog();
    }
    if (Object.keys(record).length !== 0) {
      editRecord();
    }

    for (let i = 0; i < infoList.length; i++) {
      if (
        infoList[i].recordId === record.recordId &&
        Object.keys(record).length !== 0
      ) {
        console.log("Adding Record...");
        let info = infoList;
        info[i] = record;
        setInfoList(info);
      }
    }
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
