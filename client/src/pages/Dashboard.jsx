import "./Dashboard.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/Button";
import ProductPreview from "../components/ProductPreview";
import DogDropdown from "../components/DogDropdown";

const DashBoard = () => {
    const [dogList, setDogList] = useState(null);
    const [selectedDogId, setSelectedDog] = useState(null);
    const [products, setProducts] = useState([1, 2, 3, 4, 5]);
    const [dogsCaracs, setDogCaracs] = useState([
        "2 mois",
        "Cane Corso",
        "Femelle",
        "Bonne santé",
    ]);
    const [isLoaded, setLoaded] = useState(false);

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
                setSelectedDog(response.data[0]._id);
                setLoaded(true);
            })
            .catch((error) => {
                console.log(error);
            });
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
                    {dogsCaracs.map((dog) => {
                        return <li>{dog}</li>;
                    })}
                </ul>
                <Button
                    text={"Profil complet"}
                    link={"/articles"}
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
