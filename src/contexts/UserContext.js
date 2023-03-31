/** @format */

import { createContext, useState } from "react";
import axios from "axios";
import { SERVER_DOMAIN } from "../constants.js";

export const UserContext = createContext({});

function UserProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState("0");
  const [authUserHome, setAuthUserHome] = useState({});

  const serverInstance = axios.create({ withCredentials: true });

  const authenticate = async (userName, passwd) => {
    if (userName !== "" && passwd !== "") {
      try {
        const response = await serverInstance.post(`${SERVER_DOMAIN}/users`, {
          username: userName,
          passwd: passwd,
        });

        if (response.data.userId) setIsAuthenticated(response.data.userId);
      } catch (e) {
        alert(`Server did not respond. Please try again later. \n\n ${e}`);
      }
    }
  };

  const setHomeDataFromDB = async () => {
    //if (isAuthenticated !== "-1") {
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
    /* } else {
      console.log(
        "User with id " +
          isAuthenticated +
          " is not authenticated, or doesn't exist."
      );
    }*/
  };

  return (
    <UserContext.Provider
      value={{ isAuthenticated, authenticate, authUserHome, setHomeDataFromDB }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
