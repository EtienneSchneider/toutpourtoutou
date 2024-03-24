import {
    createContext,
    useContext,
    useMemo,
    useState,
    useCallback,
} from "react";
import { api } from "../Service/Api";

export const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);

// eslint-disable-next-line react/prop-types
export const AppContextProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [isAuthentificated, setIsAuthentificated] = useState(false);

    const appApi = useMemo(() => api(), []);

    const AppContextValues = {
        appApi,
        isAuthentificated,
        userDetails,
        setUserDetails,
        setIsAuthentificated,
    };
    return (
        <AppContext.Provider value={AppContextValues}>
            {children}
        </AppContext.Provider>
    );
};
