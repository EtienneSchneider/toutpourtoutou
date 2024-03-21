import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/Dashboard";
import RegistrationForm from "./pages/RegistrationForm";


function App() {
    return (
        <Router>
            <Routes>
                <Route index exact element={<DashBoard />} />
                <Route path="/registration" element={<RegistrationForm />} />
                <Route path="*" element={<p>not found test</p>} />
            </Routes>
        </Router>
    );
}

export default App;
