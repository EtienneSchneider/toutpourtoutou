import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoardRoot from "./pages/DashboardRoot";
import DashBoard from "./pages/Dashboard/Dashboard";
import NewDogPage from "./pages/NewDog/NewDogPage.jsx";
import Products from "./pages/Products.jsx";
import ComponentTest from "./pages/ComponentsTest";
import NavBar from "./components/NavBar/NavBar.jsx";
import SingleProductPage from "./pages/SingleProductPage";
import LoginPage from "./pages/Authentification/LoginPage";
import { AppContextProvider, useAppContext } from "./contexts/AppContext.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardProfile from "./pages/DashboardProfile/DashboardProfile.jsx";

function Content() {
    const { appApi, isAuthentificated, setIsAuthentificated, setUserDetails } =
        useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (localStorage.getItem("accessToken")) {
                    const response = await appApi.getAuthStatus();
                    setIsAuthentificated(true);
                    setUserDetails(response.data);
                } else {
                    setIsAuthentificated(false);
                    navigate("/login");
                }
            } catch (error) {
                setIsAuthentificated(false);
                localStorage.removeItem("accessToken");
                navigate("/login");
            }
        };

        fetchData();
    }, [isAuthentificated]);

    return (
        <div className="main-container">
            <Routes>
                <Route path="/dashboard" exact element={<DashBoardRoot />}>
                    <Route
                        path="/dashboard/:dogId"
                        exact
                        element={<DashBoard />}
                    />
                </Route>
                <Route path="/products" exact element={<Products />} />
                <Route
                    path="/products/:productId"
                    exact
                    element={<SingleProductPage />}
                />
                <Route
                    path="/dog-profile/:dogId"
                    element={<DashboardProfile />}
                />
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
