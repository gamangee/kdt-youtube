import { createContext, useContext } from "react";
// import Youtube from "../service/mockYoutube";
import Youtube from "../service/Youtube";


export const ApiContext = createContext();

const youtube = new Youtube();

export function ApiProvider({ children }) {
  return (
    <ApiContext.Provider value={{ youtube }}>{children}</ApiContext.Provider>
  );
}

export function useYoutubeApi() {
  return useContext(ApiContext);
}