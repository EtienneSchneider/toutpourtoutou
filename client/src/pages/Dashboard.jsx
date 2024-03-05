import "./Dashboard.scss";
import { useLayoutEffect } from "react";
import Button from "../components/Button";
import NavBar from "../components/NavBar";

const DashBoard = () => {
    useLayoutEffect(() => {}, []);

    return (
        <div className="DashBoard">
            <NavBar />
            Test de component
            <Button text={"Profil complet"} arrow={true} />
        </div>
    );
};

export default DashBoard;
