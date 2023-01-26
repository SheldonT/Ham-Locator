/** @format */

import { useState, useEffect } from "react";
import InfoBar from "../components/InfoBar.js";

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

  const [infoList, setInfoList] = useState(
    JSON.parse(localStorage.getItem("list") || "[]")
  );

  useEffect(() => {
    const il = infoList;

    for (let i = 0; i < il.length; i++) {
      // try using infoList.map() instead
      if (il[i].id === record.id) {
        il[i] = { ...il[i], ...record };
      }
    }

    localStorage.setItem("list", JSON.stringify(il));

    setInfoList(JSON.parse(localStorage.getItem("list") || "[]"));
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
