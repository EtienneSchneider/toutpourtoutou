import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/Dashboard";
import ComponentTest from "./pages/ComponentsTest";
import NavBar from "./components/NavBar";
import Product from "./pages/Product";

function App() {
    return (
        <>
            <NavBar />
            <div className="main-container">
                <Routes>
                    <Route index exact element={<DashBoard />} />
                    <Route path="/products" exact element={<Product />} />
                    <Route path="*" element={<p>not found test</p>} />
                </Routes>
            </div>
        </>
    );
}

export default App;
