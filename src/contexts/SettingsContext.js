/** @format */

import { createContext, useState, useEffect } from "react";

export const SettingsContext = createContext({});

function SettingsProvider({ children }) {
  const [optionalFields, setOptionalFields] = useState(
    JSON.parse(localStorage.getItem("fields") || "{}")
  );
  const [lines, setLines] = useState(false);

  useEffect(() => {
    localStorage.setItem("fields", JSON.stringify(optionalFields));
  }, [optionalFields]);

  return (
    <SettingsContext.Provider
      value={{
        optionalFields,
        setOptionalFields,
        lines,
        setLines,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;
