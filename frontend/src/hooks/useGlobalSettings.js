import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalSettingsContext = createContext();

export const useGlobalSettings = () => useContext(GlobalSettingsContext);

export const GlobalSettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState(parseInt(localStorage.getItem("theme")) || 0);
  const [themeOverrided, setThemeOverrided] = useState(
    parseInt(localStorage.getItem("themeOverrided")) || 0
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => localStorage.setItem("theme", theme), [theme]);
  useEffect(() => localStorage.setItem("themeOverrided", themeOverrided), [themeOverrided]);

  return (
    <GlobalSettingsContext.Provider
      value={{
        theme,
        setTheme,
        themeOverrided,
        setThemeOverrided,
        loading,
        setLoading,
      }}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};
