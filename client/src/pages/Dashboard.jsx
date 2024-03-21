import "./Dashboard.scss";
import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Button from "../components/clickables/Button";
import ProductPreview from "../components/dashboard_components/ProductPreview";
import DogDropdown from "../components/dashboard_components/DogDropdown";

const DashBoard = () => {
    const { dogList } = useOutletContext();
    const selectedDogId = useParams().dogId;
    const [products, setProducts] = useState([1, 2, 3, 4, 5]);
    const [dogsCaracs, setDogCaracs] = useState([
        "2 mois",
        "Cane Corso",
        "Femelle",
        "Bonne santé",
    ]);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        // console.log(dogList);
        if (dogList) {
            setLoaded(true);
        }
    }, []);

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
                <ul className="carac-list col-gray">
                    {dogsCaracs.map((carac) => {
                        return <li>{carac}</li>;
                    })}
                </ul>
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
