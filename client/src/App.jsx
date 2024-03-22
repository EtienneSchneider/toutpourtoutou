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
    const { appApi, isAuthentificated, setIsAuthentificated } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            appApi
                .getAuthStatus()
                .then((response) => {})
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
        <AppContextProvider>
            <Router>
                <NavBar />
                <div className="main-container">
                    <Routes>
                        <Route
                            path="/dashboard"
                            exact
                            element={<DashBoardRoot />}
                        >
                            <Route
                                path="/dashboard/:dogId"
                                element={<DashBoard />}
                            />

                            


                        </Route>
                        <Route path="/products" exact element={<Products />} />
                        <Route path="/new-dog" exact element={<NewDogPage />} />
                        <Route path="/info" exact element={<SingleProductPage title={'title'} desc={'test desc'} price={5} img_url={'https://image.spreadshirtmedia.net/image-server/v1/products/T1459A839PA4459PT28D158439036W10000H9424/views/1,width=550,height=550,appearanceId=839,backgroundColor=F2F2F2/dz-algerie-autocollant.jpg'} />} />
                        <Route
                            path="/comptest"
                            exact
                            element={<ComponentTest />}
                        />
                        <Route path="/login" exact element={<LoginPage />} />
                        <Route path="*" element={<p>not found</p>} />
                    </Routes>
                </div>
            </Router>
        </AppContextProvider>
    );
}

export default App;
