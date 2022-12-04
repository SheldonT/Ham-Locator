import { useState } from 'react';
import InfoBar from "../components/InfoBar.js";

const infoListStyle = {
    position: "relative",
    borderRadius: "0",
    boxShadow: "none",
    backgroundColor: "var(--infoBarColor)",
    width: "100%",
    minHeight: "80vh",
    overflowY: "auto",
    margin: "0 auto 1rem auto"
};

function Log({optionalFields}) {

    const infoList = JSON.parse(localStorage.getItem("list") || "[]" );

    const [record, setRecord] = useState({});

    console.log(record);

    return(
        <>
            <InfoBar style={infoListStyle} info={infoList} selectedInfo={record} click={setRecord} optionalFields={optionalFields} />
        </>
    );
}

export default Log;
