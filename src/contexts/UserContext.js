/** @format */

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { SERVER_DOMAIN } from "../constants.js";

export const UserContext = createContext({});

function UserProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState("0");
  const [authUserHome, setAuthUserHome] = useState({});

  const serverInstance = axios.create({ withCredentials: true });

  const userSession = async () => {
    try {
      const response = await serverInstance.get(
        `${SERVER_DOMAIN}/users/session`
      );
      if (response.data !== -1) {
        console.log("Getting session id from cookie...");
        setIsAuthenticated(response.data.toString());
      } else if (localStorage.getItem("sessionId")) {
        console.log("Getting session id from local storage...");
        setIsAuthenticated(JSON.parse(localStorage.getItem("sessionId")).id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    userSession();
  }, []);

  const authenticate = async (userName, passwd) => {
    if (userName !== "" && passwd !== "") {
      try {
        const response = await serverInstance.post(`${SERVER_DOMAIN}/users`, {
          username: userName,
          passwd: passwd,
        });

        if (response.data) {
          setIsAuthenticated(response.data.toString());
          localStorage.setItem(
            "sessionId",
            JSON.stringify({ id: response.data })
          );
        }
      } catch (e) {
        alert(`Server did not respond. Please try again later. \n\n ${e}`);
      }
    }
  };

  const setHomeDataFromDB = async () => {
    try {
      const response = await axios.get(`${SERVER_DOMAIN}/users/getuser`, {
        params: { id: isAuthenticated },
      });
      const home = {
        call: response.data.callsign,
        country: response.data.country,
        gridloc: response.data.gridloc,
        itu: response.data.itu,
        anchor: [response.data.lat, response.data.lng],
        details: "",
        unit: response.data.units,
        utc: response.data.utc,
      };

      setAuthUserHome(home);
    } catch (e) {
      alert(`Server did not respond. Please try again later. \n\n ${e}`);
    }
  };

  const logoutUser = async () => {
    try {
      const response = await axios.get(`${SERVER_DOMAIN}/users/logout`, {
        params: {
          sessionId: isAuthenticated,
        },
      });

      if (response.data === true) {
        setIsAuthenticated("0");
        setAuthUserHome({});
        localStorage.removeItem("sessionId");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        authUserHome,
        setHomeDataFromDB,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
