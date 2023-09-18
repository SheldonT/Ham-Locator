/** @format */

import { createContext, useState } from "react";

export const LogContext = createContext({});

function LogProvider({ children }) {
  const [log, setLog] = useState([]);

  return (
    <LogContext.Provider value={{ log, setLog }}>
      {children}
    </LogContext.Provider>
  );
}

export default LogProvider;
