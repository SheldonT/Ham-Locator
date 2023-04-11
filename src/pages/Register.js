/** @format */

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  validateCall,
  validatePasswd,
  validateEmail,
} from "../ValidateFunctions.js";
import TextField from "../components/TextField.js";
import Button from "../components/Button.js";
import login from "./login.module.css";
import useCallData from "../hooks/useCallData.js";
import { SERVER_DOMAIN } from "../constants.js";

function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [grid, setGrid] = useState("");
  const [unit, setUnit] = useState("metric");

  const [passwd, setPasswd] = useState("");
  const [passwdCheck, setPasswdCheck] = useState("");

  const [validCall, setValidCall] = useState(true);
  const [warningCall, setWarningCall] = useState(false);

  const [validPasswd, setValidPasswd] = useState(true);
  const [warningPasswd, setWarningPasswd] = useState(false);

  const [validEmail, setValidEmail] = useState(true);
  const [warningEmail, setWarningEmail] = useState(false);

  const [passwdMatchWarning, setPasswdMatchWarning] = useState(false);

  //const [body, setBody] = useState("{}");

  const newUserInfo = useCallData(userName);

  //const postNewUser = useFetchPost("/users/adduser", body);

  const callFocus = useRef();
  const passwdFocus = useRef();
  const passCheckFocus = useRef();
  const emailFocus = useRef();

  const nav = useNavigate();

  const errorPopupStyle = {
    marginTop: 0,
  };

  const cancel = () => {
    setUserName("");
    setEmail("");
    setGrid("");
    setUnit("metric");
    setPasswd("");
    setPasswdCheck("");

    setWarningCall(false);
    setWarningPasswd(false);
    setWarningEmail(false);
    setPasswdMatchWarning(false);

    nav("/");
  };

  const submit = () => {
    passwdFocus.current.focus();
    passCheckFocus.current.focus();
    emailFocus.current.focus();
    callFocus.current.focus();

    if (!validCall) {
      setWarningCall(true);
    }

    if (!validPasswd) {
      setWarningPasswd(true);
    }
    if (!validEmail) {
      setWarningEmail(true);
    }

    if (passwd !== passwdCheck) {
      setPasswdMatchWarning(true);
    }

    if (validCall && validPasswd && validEmail && passwd === passwdCheck) {
      console.log(newUserInfo);
      axios
        .post(`${SERVER_DOMAIN}/users/adduser`, {
          call: userName,
          email: email,
          country: newUserInfo.country,
          lat: newUserInfo.anchor[0],
          lng: newUserInfo.anchor[1],
          gridloc: grid,
          privilege: "user",
          units: unit,
          itu: newUserInfo.itu,
          utc: newUserInfo.utc,
          password: passwd,
        })
        .then((response) => {
          if (response.status === 200) {
            nav("/");
          }
        })
        .catch((e) => console.log(e));

      //if (postNewUser.status === 200) {
      //nav("/Ham-Locator");
      //}

      setWarningCall(false);
      setWarningPasswd(false);
      setWarningEmail(false);
      setPasswdMatchWarning(false);
    }
  };

  return (
    <div className={login.loginBG}>
      <div className={login.main}>
        <h3>Registration</h3>
        <div className={login.formContent}>
          <div className={login.formColumn}>
            <TextField
              fieldContainerStyle={login.customFieldCont}
              validate={validateCall}
              value={userName}
              setValue={setUserName}
              placeHolder="Callsign"
              setValid={setValidCall}
              isValid={validCall}
              setWarning={setWarningCall}
              warning={warningCall}
              refrence={callFocus}
              errorPopupStyle={errorPopupStyle}
            />
            <TextField
              fieldContainerStyle={login.customFieldCont}
              validate={validatePasswd}
              value={passwd}
              setValue={setPasswd}
              placeHolder="Password"
              setValid={setValidPasswd}
              isValid={validPasswd}
              warning={warningPasswd}
              setWarning={setWarningPasswd}
              refrence={passwdFocus}
              password={true}
            />
            <TextField
              fieldContainerStyle={login.customFieldCont}
              value={passwdCheck}
              setValue={setPasswdCheck}
              placeHolder="Retype Password"
              isValid={passwd === passwdCheck ? true : false}
              warning={passwdMatchWarning}
              setWarning={setPasswdMatchWarning}
              errMsg="Passwords don't match"
              refrence={passCheckFocus}
              password={true}
            />
          </div>
          <div className={login.formColumn}>
            <TextField
              fieldContainerStyle={login.customFieldCont}
              value={grid}
              setValue={setGrid}
              placeHolder="Grid"
              isValid={true}
            />
            <TextField
              fieldContainerStyle={login.customFieldCont}
              validate={validateEmail}
              value={email}
              setValue={setEmail}
              placeHolder="Email"
              setValid={setValidEmail}
              isValid={validEmail}
              warning={warningEmail}
              setWarning={setWarningEmail}
              refrence={emailFocus}
            />

            <span className={login.radioButtonLabel}>Measurement System:</span>
            <div className={login.radioButtonGroup}>
              <div className={login.radioButton}>
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
              <div className={login.radioButton}>
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
        </div>
        <div className={login.submit}>
          <Button
            style={login.registerButtons}
            name="Create Account"
            clickEvent={submit}
          />
          <Button
            style={login.registerButtons}
            name="Cancel"
            clickEvent={cancel}
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
