/** @format */
import { useState, useContext } from "react";
import FocusTrap from "focus-trap-react";
import axios from "axios";
import TextField from "./TextField.js";
import Button from "./Button.js";
import useCallData from "../hooks/useCallData.js";
import { UserContext } from "../contexts/UserContext.js";
import home from "./home.module.css";
import { SERVER_DOMAIN } from "../constants.js";

function Home({ setVis }) {
  const [callsign, setCallsign] = useState("");
  const [email, setEmail] = useState("");
  const [gridloc, setGridloc] = useState("");

  const [unit, setUnit] = useState("metric");

  const { authUserHome, setHomeDataFromDB, isAuthenticated } =
    useContext(UserContext);

  const homeResp = useCallData(callsign);

  const submit = () => {
    if (Object.keys(homeResp).length !== 0) {
      let dbUpdate = {
        userId: isAuthenticated,
        call: callsign.toUpperCase(),
        country: homeResp.country,
        lat: parseFloat(homeResp.anchor[0]),
        lng: parseFloat(homeResp.anchor[1]),
        gridloc: gridloc,
        itu: parseInt(homeResp.itu),
        utc: parseFloat(homeResp.utc),
      };

      if (email.length !== 0) dbUpdate = { email: email, ...dbUpdate };
      if (unit.length !== 0) dbUpdate = { units: unit, ...dbUpdate };

      axios
        .post(`${SERVER_DOMAIN}/users/edituser`, dbUpdate)
        .then((response) => {
          if (response.status === 200) {
            setVis(false);
          }
        })
        .catch((e) => console.log(e));
    } else {
      setVis(false);
    }
  };

  return (
    <FocusTrap>
      <div className={home.homeBG}>
        <div className={home.homeDialog}>
          <div className={home.homeContent}>
            <span className={home.homeTitle}>
              Enter your home information...
            </span>
            <div className={`${home.inputCont} ${home.inputAdapt}`}>
              <div className={home.textField}>
                {/*<label className={home.callLabel}>Callsign: </label>*/}
                <TextField
                  fieldContainerStyle={home.formFields}
                  value={callsign}
                  setValue={setCallsign}
                  placeHolder={
                    authUserHome.call === "DEMO"
                      ? "Callsign can't be changed"
                      : "Callsign"
                  }
                  isValid={true}
                  disarm={authUserHome.call === "DEMO" ? true : false}
                  keyDown={(e) => {
                    if (e.key === "Enter") {
                      submit();
                    }
                  }}
                />
                <TextField
                  fieldContainerStyle={home.formFields}
                  value={email}
                  setValue={setEmail}
                  placeHolder={
                    authUserHome.call === "DEMO"
                      ? "E-Mail can't be changed"
                      : "E-Mail"
                  }
                  isValid={true}
                  disarm={authUserHome.call === "DEMO" ? true : false}
                  keyDown={(e) => {
                    if (e.key === "Enter") {
                      submit();
                    }
                  }}
                />
                <TextField
                  fieldContainerStyle={home.formFields}
                  value={gridloc}
                  setValue={setGridloc}
                  placeHolder="Grid Locator"
                  isValid={true}
                  keyDown={(e) => {
                    if (e.key === "Enter") {
                      submit();
                    }
                  }}
                />
              </div>
              {/*<span className={home.demo}>* Enter "DEMO" for testing</span>*/}
            </div>

            <div className={`${home.inputCont} ${home.radioAdapt}`}>
              <label>Units: </label>
              <div className={home.radioButtonGroup}>
                <div className={home.radioButton}>
                  <input
                    type="radio"
                    id="metric"
                    value="metric"
                    name="units"
                    defaultChecked
                    onChange={(e) => setUnit(e.target.value)}
                  />
                  <label htmlFor="metric">Metric</label>
                </div>
                <div className={home.radioButton}>
                  <input
                    type="radio"
                    id="imperial"
                    value="imperial"
                    name="units"
                    onChange={(e) => setUnit(e.target.value)}
                  />
                  <label htmlFor="metric">Imperial</label>
                </div>
              </div>
            </div>
            <div className={home.inputCont}>
              <Button name="Submit" clickEvent={submit} />
              <Button
                name="Cancel"
                clickEvent={() => {
                  setVis(false);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default Home;
