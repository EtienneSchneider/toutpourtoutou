import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoardRoot from "./pages/DashboardRoot";
import DashBoard from "./pages/Dashboard/Dashboard";
import NewDogPage from "./pages/Products.jsx";
import Products from "./pages/Products.jsx";
import ComponentTest from "./pages/ComponentsTest";
import NavBar from "./components/NavBar/NavBar.jsx";
import SingleProductPage from "./pages/SingleProductPage";
import LoginPage from "./pages/Authentification/LoginPage";
import { AppContextProvider, useAppContext } from "./contexts/AppContext.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Content() {
    const { appApi, isAuthentificated, setIsAuthentificated, setUserDetails } =
        useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            appApi
                .getAuthStatus()
                .then((response) => {
                    setUserDetails(response.data);
                })
                .catch((error) => {
                    setIsAuthentificated(false);
                    localStorage.removeItem("accessToken");
                    navigate("/login");
                });
        } else {
            navigate("/login");
        }
    }, [isAuthentificated]);

    return (
        <div className="main-container">
            <Routes>
                <Route path="/dashboard" exact element={<DashBoardRoot />}>
                    <Route path="/dashboard/:dogId" element={<DashBoard />} />
                </Route>
                <Route path="/products" exact element={<Products />} />
                <Route path="/new-dog" exact element={<NewDogPage />} />
                <Route path="/comptest" exact element={<ComponentTest />} />
                <Route path="/login" exact element={<LoginPage />} />
                <Route path="*" element={<p>not found</p>} />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContextProvider>
                <NavBar />
                <Content />
            </AppContextProvider>
        </Router>
    );
}

export default App;
