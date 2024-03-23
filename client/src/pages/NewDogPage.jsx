import "./NewDogPage.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DogFormSection from "../components/dog_components/DogFormSection";
import ProductCounter from "../components/product_components/ProductCounter";
import RadioContainer from "../components/RadioContainer/RadioContainer";
import MultiSelect from "../components/Multiselect/Multiselect";
import { breeds, hIssues, treatmentsList, foods } from "../assets/options";
import { useAppContext } from "../contexts/AppContext.jsx";
import { formatDate, getTodayDate } from "../helpers/functions.js";
import { useNavigate } from "react-router-dom";

const NewDogPage = () => {
    const [name, setName] = useState("");
    const [chipNumber, setChipNumber] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [gender, setGender] = useState(null);
    const [birthdate, setBirthdate] = useState("");
    const [breed, setBreed] = useState("");
    const [sterilized, setSterilized] = useState(null);
    const [healthIssues, setHealthIssues] = useState([]);
    const [otherHealthIssues, setOtherHealthIssues] = useState("");
    const [treatments, setTreatments] = useState([]);
    const [otherTreatments, setOtherTreatments] = useState("");
    const [weight, setWeight] = useState("");
    const [meals, setMeals] = useState(0);
    const [feedBasis, setFeedBasis] = useState([]);
    const [outings, setOutings] = useState(0);
    const [training, setTraining] = useState(null);
    const [trainingDogs, setTrainingDogs] = useState(null);
    const [error, setError] = useState("");
    const { appApi, userDetails } = useAppContext();
    const navigate = useNavigate();
    
    const handleCreateDog = async () => {
        if (
            chipNumber === "" ||
            name === "" ||
            gender === null ||
            birthdate === "" ||
            breed === "" ||
            breed === "Choisir" ||
            sterilized === null ||
            weight === ""
        ) {
            setError(
                'Veuilez renseigner toutes les informations portant la mention "*".',
            );
        } else {
            const newDog = {
                chipNumber,
                owner: userDetails._id,
                identification: {
                    name,
                    gender,
                    birthdate: formatDate(birthdate),
                    breed,
                },
                health: {
                    sterilized,
                    healthIssues,
                    otherHealthIssues,
                    treatments,
                    otherTreatments,
                    weight: [
                        {
                            weight: weight,
                            date: getTodayDate(),
                        },
                    ],
                },
                feed: {
                    meals,
                    feedBasis,
                },
                activity: {
                    outings,
                },
                education: {
                    training,
                    trainingDogs,
                },
            };

            await appApi
                .addDog(newDog)
                .then((response) => {
                    console.log(response);
                    navigate("/dashboard");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="NewDogPage">
            <Link to={"/dashboard"} className="back-link">
                <span className="material-symbols-outlined">arrow_back</span>
                Retour
            </Link>

            <DogFormSection title={""}>
                <span>
                    Veuillez renseigner toutes les informations portant la
                    mention "*".
                </span>
                <label htmlFor="dogName">Nom* :</label>
                <input
                    name="dogName"
                    value={name}
                    placeholder="Nom du chien"
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="dogPicture">Photo du chien (url) :</label>
                <input
                    name="dogPicture"
                    value={photoUrl}
                    placeholder="Url vers la photo du chien"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                />
            </DogFormSection>

            <DogFormSection title={"Identification"}>
                <RadioContainer
                    text={["Male", "Femelle"]}
                    value={gender}
                    changeValue={(value) => setGender(value)}
                />

                <label htmlFor="date">Date de naissance* :</label>
                <input
                    type="date"
                    name="birthDate"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                />

                <label htmlFor="breed">Race* :</label>
                <select
                    name="breed"
                    value={breed}
                    onChange={(e) => {
                        setBreed(e.target.value);
                    }}
                    placeholder="Sélectionner la race du chien"
                >
                    {breeds.map((breed) => (
                        <option key={breed} value={breed}>
                            {breed}
                        </option>
                    ))}
                    <option value="autre">Autre</option>
                </select>
                <label htmlFor="chip">N° puce* :</label>
                <input
                    type="text"
                    name="chip"
                    placeholder="N° d’identification"
                    onChange={(e) => setChipNumber(e.target.value)}
                />
            </DogFormSection>

            <DogFormSection title={"Santé"}>
                <label htmlFor="weight">Poids du chien en kg* (ex: 12.5)</label>
                <input
                    type="text"
                    name="weight"
                    placeholder="Poids"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
                <label htmlFor="ster">Stérilisation*</label>
                <RadioContainer
                    text={["Non-stérilisé", "Stérilisé"]}
                    value={sterilized}
                    changeValue={(value) => setSterilized(value)}
                />
                <label htmlFor="health">
                    Problème de santé principal de votre chien
                </label>

                <MultiSelect
                    options={hIssues}
                    selectedOptions={healthIssues}
                    updateSelectedOpts={(optionsSelected) => {
                        setHealthIssues(optionsSelected);
                    }}
                />

                <label htmlFor="health2">Autre(s) problème(s) de santé</label>
                <input
                    type="text"
                    name="otherHealthIssues"
                    placeholder="Autres(s) problème(s)"
                    value={otherHealthIssues}
                    onChange={(e) => setOtherHealthIssues(e.target.value)}
                />

                <label htmlFor="treatments">
                    Traitements principal pris par votre chien
                </label>
                <MultiSelect
                    options={treatmentsList}
                    selectedOptions={treatments}
                    updateSelectedOpts={(optionsSelected) => {
                        setTreatments(optionsSelected);
                    }}
                />

                <label htmlFor="treatment2">Autre(s) traitements(s) pris</label>
                <input
                    type="text"
                    name="otherTreatments"
                    placeholder="Autre(s) traitement(s)"
                    value={otherTreatments}
                    onChange={(e) => setOtherTreatments(e.target.value)}
                />
            </DogFormSection>

            <DogFormSection title={"Alimentation"}>
                <label>Nombre de repas (quotidien)</label>
                <ProductCounter
                    value={meals}
                    updateCounter={(count) => setMeals(count)}
                />

                <label htmlFor="feed">
                    Sur quoi est basée l’alimentation de votre chien ?{" "}
                </label>
                <MultiSelect
                    options={foods}
                    selectedOptions={feedBasis}
                    updateSelectedOpts={(optionsSelected) => {
                        setFeedBasis(optionsSelected);
                    }}
                />
            </DogFormSection>

            <DogFormSection title={"Activité"}>
                <label>Nombre de sorties (quotidienne)</label>
                <ProductCounter
                    value={outings}
                    updateCounter={(count) => setOutings(count)}
                />
            </DogFormSection>

            <DogFormSection title={"Education"}>
                <label>
                    Avez-vous déjà participé à un ou plusieurs cours de dressage
                    canin ?
                </label>
                <RadioContainer
                    text={["Oui", "Non"]}
                    value={training}
                    changeValue={(value) => setTraining(value)}
                />
                <label>
                    Si oui, avez vous participé à ce ou ces cours avec votre
                    chien ?
                </label>

                <RadioContainer
                    text={["Oui", "Non"]}
                    value={trainingDogs}
                    changeValue={(value) => setTrainingDogs(value)}
                />
            </DogFormSection>

            <span className="error">{error}</span>

            <button className="Button" onClick={handleCreateDog}>
                Ajouter le chien
            </button>
        </div>
    );
};

export default NewDogPage;
