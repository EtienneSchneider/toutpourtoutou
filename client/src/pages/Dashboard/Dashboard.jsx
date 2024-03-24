import "./Dashboard.scss";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { getAgeOfDog } from "../../helpers/functions";
import Button from "../../components/clickables/Button";
import ProductPreview from "../../components/dashboard_components/ProductPreview";
import DogDropdown from "../../components/dashboard_components/DogDropdown";

const DashBoard = () => {
    const { dogList, selectedDogId, order, products } = useOutletContext();
    const [selectedDogData, setSelectedDogData] = useState(null);

    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        if (dogList) {
            setSelectedDogData(
                dogList.find((dog) => dog._id === selectedDogId),
            );
            setLoaded(true);
        }
    }, [selectedDogId, dogList]);

    return { isLoaded } ? (
        <div className="DashBoard">
            <div className="dog-card">
                <div className="img-container">
                    {selectedDogData &&
                    selectedDogData.identification.picture ? (
                        <img
                            src={selectedDogData.identification.picture}
                            alt=""
                        />
                    ) : (
                        <img
                            src="https://cdn-icons-png.freepik.com/512/4823/4823463.png"
                            alt=""
                        />
                    )}
                </div>
                {dogList ? (
                    <DogDropdown
                        dogList={dogList}
                        selectedDog={selectedDogId}
                    ></DogDropdown>
                ) : (
                    <></>
                )}
                {selectedDogData ? (
                    <ul className="carac-list col-gray">
                        <li>
                            {getAgeOfDog(
                                selectedDogData.identification.birthDate,
                            )}
                        </li>
                        <li>{selectedDogData.identification.breed}</li>
                        <li>
                            {selectedDogData.identification.gender
                                ? "Mâle"
                                : "Femelle"}
                        </li>
                        <li>
                            {selectedDogData.health.healthIssues.length == 0
                                ? "Bonne santé"
                                : selectedDogData.health.healthIssues.map(
                                      (healthProb) => healthProb,
                                  )}
                        </li>
                    </ul>
                ) : (
                    <></>
                )}
                <Button
                    text={"Profil complet"}
                    link={"/dog-profile/" + selectedDogId}
                    arrow={true}
                />
            </div>
            <div className="recap">
                <h2 className="subheadertext">Récapitulatif</h2>
            </div>
            <div className="delivery">
                <div className="delivery-desc">
                    <h2 className="subheadertext">Votre prochaine commande</h2>
                    {order ? (
                        <p className="col-gray">
                            Statut : {order.status} <br /> Livraison prévue le{" "}
                            {order.orderDate}
                        </p>
                    ) : (
                        <p className="col-gray">Aucune commande prévue</p>
                    )}
                </div>
                <div className="delivery-list">
                    {products ? (
                        products.map((prod) => {
                            return (
                                <ProductPreview
                                    key={prod.serialNumber}
                                    title={prod.brand}
                                    desc={prod.description}
                                    img_url={
                                        prod.image
                                            ? prod.image
                                            : "https://cashmailsystemaveceva.websites.co.in/dummytemplate/img/product-placeholder.png"
                                    }
                                />
                            );
                        })
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <div className="articles">
                <h2 className="subheadertext">
                    Articles susceptibles de vous intéresser
                </h2>
            </div>
            <div className="inter">
                <h2 className="subheadertext">Fil d'actualité</h2>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default DashBoard;
