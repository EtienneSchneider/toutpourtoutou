import "./Dashboard.scss";
import { useState, useEffect, useContext } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Button from "../../components/clickables/Button";
import ProductPreview from "../../components/dashboard_components/ProductPreview";
import DogDropdown from "../../components/dashboard_components/DogDropdown";
import { AppContext } from "../../contexts/AppContext";

const DashBoard = () => {
    const context = useContext(AppContext);
    const { dogList } = useOutletContext();
    const selectedDogId = useParams().dogId;
    const [selectedDogData, setSelectedDogData] = useState(null);

    const [products, setProducts] = useState([1, 2, 3, 4, 5]);
    const [dogsCaracs, setDogCaracs] = useState([
        "2 mois",
        "Cane Corso",
        "Femelle",
        "Bonne santé",
    ]);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        if (dogList) {
            setSelectedDogData(
                dogList.find((dog) => dog._id === selectedDogId),
            );
            console.log(dogList.find((dog) => dog._id === selectedDogId));

            setLoaded(true);
        }
    }, [selectedDogId]);

    return { isLoaded } ? (
        <div className="DashBoard">
            <div className="dog-card">
                <div className="img-container">
                    <img
                        src="https://i.pinimg.com/originals/ba/fa/eb/bafaebfeeca3e63ac21e9efd3c9406eb.jpg"
                        alt=""
                    />
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
                        <li>{selectedDogData.identification.birthdate}</li>
                        <li>{selectedDogData.identification.breed}</li>
                        <li>
                            {selectedDogData.identification.gender
                                ? "Mâle"
                                : "Femelle"}
                        </li>
                        <li>
                            {selectedDogData.health.heathIssues.length == 0
                                ? "Bonne santé"
                                : selectedDogData.health.map(
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
                    <p className="col-gray">
                        Statut : envoyé <br /> Livraison prévue : 16 avril 2024
                    </p>
                </div>
                <div className="delivery-list">
                    {products.map(() => {
                        return (
                            <ProductPreview
                                title={"Friskies® Light"}
                                desc="Croquettes allégées au poulet pour chien en surpoids"
                                img_url={
                                    "https://www.purina.fr/sites/default/files/styles/product_380x380/public/2022-01/1.%20MHI%2007613033831287_H1N1_FR_44074316-RESIZED.png?itok=cM3h0tUG"
                                }
                            />
                        );
                    })}
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
