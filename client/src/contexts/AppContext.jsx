import { createContext, useContext, useMemo, useState } from "react";
import { api } from "../../Service/Api";

export const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);

// eslint-disable-next-line react/prop-types
export const AppContextProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);

    const appApi = useMemo(() => api(), []);
    console.log(appApi);


    const AppContextValues = {
        appApi,
        userDetails,
        setUserDetails,
    };
    return (
        <AppContext.Provider value={AppContextValues}>
            {children}
        </AppContext.Provider>
    );
};
