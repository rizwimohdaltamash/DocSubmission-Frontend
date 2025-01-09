import { createContext, useState } from "react";
export const StoreContext = createContext(null);
import axios from "axios";

const StoreContextProvider = (props) => {

  const url = "https://docsubmission.onrender.com";
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const contextValue = {
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider;
