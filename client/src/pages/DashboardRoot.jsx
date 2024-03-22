import { useState, useEffect, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const DashBoardRoot = () => {
    const { appApi } = useContext(AppContext);

    const selectedDogId = useParams().dogId;

    const [dogList, setDogList] = useState(null);
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            appApi
                .getUserDogs({
                    owner: "65f85f2a2774f9456d55f288",
                })
                .then((response) => {
                    setDogList(response.data);
                    if (response.data.length > 0) {
                        if (selectedDogId) response.data[0].selectedDogId;
                        else {
                            navigate("/dashboard/" + response.data[0]._id);
                        }
                    } else {
                        navigate("/new-dog/");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

            appApi
                .getUserOrders({
                    user: "65f85f2a2774f9456d55f288",
                })
                .then((response) => {
                    const allOrders = response.data;
                    const latestOrder = allOrders.sort(
                        (a, b) => new Date(b.orderDate) - new Date(a.orderDate),
                    );
                    console.log(allOrders);
                    setOrder(latestOrder);
                })
                .then((response) => {
                    setDogList(response.data);
                    navigate("/dashboard/" + response.data[0]._id);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    return { dogList } ? (
        <Outlet
            context={{
                dogList: dogList,
                selectedDogId: selectedDogId,
                order: order,
            }}
        />
    ) : (
        <></>
    );
};

export default DashBoardRoot;
