import "./Dashboard.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

const DashBoardRoot = () => {
    const [dogList, setDogList] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios({
            method: "post",
            maxBodyLength: Infinity,
            url: "http://127.0.0.1:3001/toutpourtoutou-api/userDogs",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                owner: "65f85f2a2774f9456d55f288",
            }),
        })
            .then((response) => {
                setDogList(response.data);
                navigate("/dashboard/" + response.data[0]._id);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return { dogList } ? <Outlet context={{ dogList: dogList }} /> : <></>;
};

export default DashBoardRoot;
