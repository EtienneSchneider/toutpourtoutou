import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoardRoot from "./pages/DashboardRoot";
import DashBoard from "./pages/Dashboard";
import NewDogPage from "./pages/NewDogPage";
import Products from "./pages/Products";
import ComponentTest from "./pages/ComponentsTest";
import NavBar from "./components/NavBar";
import SingleProductPage from "./pages/SingleProductPage";

function App() {
    return (
        <>
            <NavBar />
            <div className="main-container">
                <Routes>
                    <Route path="/dashboard" exact element={<DashBoardRoot />}>
                        <Route
                            path="/dashboard/:dogId"
                            element={<DashBoard />}
                        />
                    </Route>
                    <Route path="/products" exact element={<Products />} />
                    <Route path="/new-dog" exact element={<NewDogPage />} />
                    <Route path="/comptest" exact element={<ComponentTest />} />
                    <Route path="*" element={<p>not found</p>} />
                </Routes>
            </div>
        </>
    );
}

export default App;
