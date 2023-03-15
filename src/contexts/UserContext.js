/** @format */

import { createContext, useState } from "react";
import axios from "axios";
import { SERVER_DOMAIN } from "../constants.js";

export const UserContext = createContext({});

function UserProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(-1);
  const [authUserHome, setAuthUserHome] = useState({});

  const authenticate = async (userName, passwd) => {
    if (userName !== "" && passwd !== "") {
      try {
        const response = await axios.get(`${SERVER_DOMAIN}/users`, {
          params: {
            username: userName,
            passwd: passwd,
          },
        });
        setIsAuthenticated(response.data.userId);
      } catch (e) {
        console.log(console.log("No user with username " + userName));
      }
    }
  };

  const setHomeDataFromDB = async () => {
    if (isAuthenticated !== -1) {
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
        console.log(e);
      }
    } else {
      console.log(
        "User with id " +
          isAuthenticated +
          " is not authenticated, or doesn't exist."
      );
    }
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
