import { createContext, useState } from "react";

export const ipLocationContext = createContext();

export const MyContextProvider = ({children}) => {
  const [locationCoordinates, setLocationCoordinates] = useState({x:'', y:''});

  return (
    <ipLocationContext.Provider value={{locationCoordinates, setLocationCoordinates}}>
      {children}
    </ipLocationContext.Provider>
  )

}