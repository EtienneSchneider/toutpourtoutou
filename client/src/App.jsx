import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/Dashboard";
import Product from "./pages/Product";

function App() {
  return (
    <Router>
      <Routes>
        <Route index exact element={<DashBoard />} />
        <Route path="/pages/Product" element={<Product />} /> 
        <Route path="*" element={<p>not found test</p>} />
      </Routes>
    </Router>
  );
}

export default App;
