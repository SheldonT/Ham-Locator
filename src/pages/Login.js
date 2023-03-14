/** @format */

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "../components/TextField.js";
import Button from "../components/Button.js";
import login from "./login.module.css";
import { SERVER_DOMAIN } from "../constants.js";

function Login({ setAuthUser }) {
  const [userName, setUserName] = useState("");
  const [passwd, setPasswd] = useState("");

  const [serverResponse, setServerResponse] = useState(-1);

  useEffect(() => {
    if (serverResponse !== -1) {
      console.log("Authorized user with id " + serverResponse);

      localStorage.setItem(
        "authUser",
        JSON.stringify({ authUser: serverResponse })
      );
      setAuthUser(serverResponse);
    } else {
      console.log("No User Authenticated");
    }
  }, [serverResponse]);

  return (
    <div className={login.loginBG}>
      <div className={login.main}>
        <h3>Login</h3>
        <TextField
          fieldContainerStyle={login.customFieldCont}
          value={userName}
          setValue={setUserName}
          placeHolder="Callsign"
          isValid={true}
        />

        <TextField
          fieldContainerStyle={login.customFieldCont}
          value={passwd}
          setValue={setPasswd}
          placeHolder="Password"
          isValid={true}
          password={true}
        />

        <div className={login.login}>
          <Button
            name="Login"
            clickEvent={() => {
              if (userName !== "" && passwd !== "") {
                axios
                  .post(`${SERVER_DOMAIN}/users`, {
                    username: userName,
                    passwd: passwd,
                  })
                  .then((response) => {
                    if (
                      response.status === 200 &&
                      response.data.userId !== -1
                    ) {
                      setServerResponse(response.data.userId);
                    }
                  })
                  .catch(() => {
                    if (serverResponse === -1) {
                      console.log("No user with username " + userName);
                    }
                  });
              }
            }}
          />
        </div>
        <div className={login.newAccount}>
          <p>
            Not registered?{" "}
            <Link to="/Ham-Locator/register">Create an account.</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
