import "./Dashboard.scss";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { getAgeOfDog, stringToAge } from "../../helpers/functions";
import Button from "../../components/clickables/Button";
import LastOrderList from "../../components/dashboard_components/LastOrder";
import DogDropdown from "../../components/dashboard_components/DogDropdown";
import WeightChart from "../../components/WeightChart/WeightChart";
import ArticleCard from "../../components/ArticleCard/ArticleCard";

const DashBoard = () => {
    const { dogList, selectedDogId, order, products } = useOutletContext();
    const [selectedDogData, setSelectedDogData] = useState(null);
    console.log(selectedDogData);

    const [isLoaded, setLoaded] = useState(false);

    const articles = [
        {
            tag: "Chiots",
            content: "Chien mâle ou femelle : que choisir ?",
            link: "https://www.zooplus.fr/magazine/chien/adopter-un-chien/chien-male-femelle",
        },
        {
            tag: "Chiots",
            content: "30 noms de chien en O ?",
            link: "https://www.zooplus.fr/magazine/chien/adopter-un-chien/noms-de-chien-en-o-pour-lannee-2018",
        },
        {
            tag: "Nourriture",
            content: "Os à mâcher pour chien : quels est le danger ?",
            link: "https://www.zooplus.fr/magazine/chien/alimentation-du-chien/os-macher-chien-danger",
        },
    ];

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
                            {selectedDogData.health.healthIssues.length === 0
                                ? "Bonne santé"
                                : selectedDogData.health.healthIssues.join(
                                      ", ",
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
                <div className="chart">
                    <WeightChart data={selectedDogData} />
                </div>
                <div className="followup">
                    <h2>Suivi du chien</h2>
                    {selectedDogData &&
                    stringToAge(selectedDogData.identification.birthDate) >
                        12 ? (
                        <>
                            <div className="food">
                                {" "}
                                <span class="material-symbols-outlined">
                                    info
                                </span>
                                Votre chien à besoin d'envrion 30 grammes de
                                nourriture par kilogramme de poids corporel
                                divisé en 1 ou 2 repas par jours.
                            </div>
                            <div className="vaccine">
                                {" "}
                                <span class="material-symbols-outlined">
                                    warning
                                </span>
                                Aucun vaccin a prévoir.
                            </div>

                            {selectedDogData &&
                                selectedDogData.activity.outings < 3 && (
                                    <div className="outing">
                                        {" "}
                                        <span class="material-symbols-outlined">
                                            warning
                                        </span>
                                        Vous devriez sortir plus souvent votre
                                        chien, au minimum 3 fois par jours.
                                    </div>
                                )}
                        </>
                    ) : (
                        <>
                            <div className="food">
                                {" "}
                                <span class="material-symbols-outlined">
                                    info
                                </span>
                                Votre chien à besoin d'envrion 65 grammes de
                                nourriture par kilogramme de poids corporel
                                divisé en 3 ou 4 repas par jours.
                            </div>
                            <div className="vaccine">
                                {" "}
                                <span class="material-symbols-outlined">
                                    warning
                                </span>
                                Le prochain vaccin contre la maladie de Carré
                                devrait idéalement avoir lieu dans 3 semaines.
                            </div>

                            {selectedDogData &&
                                selectedDogData.activity.outings < 3 && (
                                    <div className="outing">
                                        {" "}
                                        <span class="material-symbols-outlined">
                                            warning
                                        </span>
                                        Vous devriez sortir plus souvent votre
                                        chien, au minimum 3 fois par jours.
                                    </div>
                                )}
                        </>
                    )}
                </div>
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
                <LastOrderList
                    products={products}
                    orderList={order}
                    withPrices={false}
                />
            </div>
            <div className="articles">
                <h2 className="subheadertext">
                    Articles susceptibles de vous intéresser
                </h2>
                <div className="articlesContent">
                    {articles.map((article) =>
                        (
                            <ArticleCard article={article} />
                        ),
                    )}
                </div>
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
