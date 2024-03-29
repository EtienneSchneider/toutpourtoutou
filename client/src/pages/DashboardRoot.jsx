import { useState, useEffect, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const DashBoardRoot = () => {
    const { appApi, userDetails } = useContext(AppContext);

    const selectedDogId = useParams().dogId;
    const [dogList, setDogList] = useState(null);
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("accessToken") && userDetails) {
            appApi
                .getUserDogs({
                    owner: userDetails._id,
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

            if (!order) {
                appApi
                    .getUserOrders({
                        user: userDetails._id,
                    })
                    .then((response) => {
                        const allOrders = response.data;
                        if (allOrders.length > 0) {
                            const latestOrder = allOrders.sort(
                                (a, b) =>
                                    new Date(b.orderDate) -
                                    new Date(a.orderDate),
                            )[0];
                            setOrder(latestOrder);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }, [userDetails]);

    useEffect(() => {
        setProducts([]);
        if (order && order.orderedProducts.length > 0) {
            for (let prod of order.orderedProducts) {
                appApi
                    .getProduct({
                        serialNumber: prod.serialNumber,
                    })
                    .then((response) => {
                        const prodToAdd = response.data;
                        if (prodToAdd) {
                            setProducts((prevProducts) => [
                                ...prevProducts,
                                prodToAdd,
                            ]);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }, [order]);

    return dogList ? (
        <Outlet
            context={{
                dogList: dogList,
                selectedDogId: selectedDogId,
                order: order,
                products: products,
            }}
        />
    ) : (
        <></>
    );
};

export default DashBoardRoot;
