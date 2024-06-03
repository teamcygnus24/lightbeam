import React from "react";

const useGlobalContext = React.createContext({
    projects: [],
    slideID: undefined,

    //Load Display
    loadDisplay: async (slideID) => {},
})

export default useGlobalContext;