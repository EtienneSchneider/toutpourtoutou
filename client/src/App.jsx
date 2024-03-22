import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoardRoot from "./pages/DashboardRoot";
import DashBoard from "./pages/Dashboard/Dashboard";
import NewDogPage from "./pages/NewDogPage";
import Products from "./pages/Products";
import ComponentTest from "./pages/ComponentsTest";
import NavBar from "./components/NavBar";
import SingleProductPage from "./pages/SingleProductPage";
import LoginPage from "./pages/Authentification/LoginPage";
import { AppContextProvider } from "./contexts/AppContext.jsx";

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
