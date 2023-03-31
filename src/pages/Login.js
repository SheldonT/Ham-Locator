/** @format */

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import TextField from "../components/TextField.js";
import Button from "../components/Button.js";
import login from "./login.module.css";
import { UserContext } from "../contexts/UserContext.js";

function Login() {
  const [userName, setUserName] = useState("");
  const [passwd, setPasswd] = useState("");

  const { authenticate, isAuthenticated } = useContext(UserContext);

  const submitLogin = () => {
    authenticate(userName, passwd);
  };

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
        {isAuthenticated === "-1" ? (
          <div className={login.errorMsg}>Invalid callsign or password.</div>
        ) : null}
        <div className={login.login}>
          <Button
            name="Login"
            clickEvent={() => {
              if (userName !== "" && passwd !== "") {
                submitLogin();
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
