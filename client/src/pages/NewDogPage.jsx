import "./NewDogPage.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DogFormSection from "../components/dog_components/DogFormSection";
import ProductCounter from "../components/product_components/ProductCounter";
import RadioContainer from "../components/RadioContainer/RadioContainer";
import MultiSelect from "../components/Multiselect/Multiselect";

const NewDogPage = () => {
    // Listes data pour selectors
    const breeds = [
        "Berger Allemand",
        "Berger Australien",
        "Beagle",
        "Berger Blanc Suisse",
        "Berger Belge Malinois",
        "Bouledogue Anglais",
        "Bulldog Français",
        "Cane Corso",
        "Caniche",
        "Cavalier King Charles",
        "Chihuahua",
        "Dalmatien",
        "Épagneul Breton",
        "Fox Terrier",
        "Golden Retriever",
        "Jack Russell Terrier",
        "Labrador Retriever",
        "Pinscher Allemand",
        "Spitz Allemand",
        "Yorkshire Terrier",
        "Autre",
    ];

    const hIssues = [
        "Dysplasie de la hanche",
        "Maladies cardiaques",
        "Problèmes de peau",
        "Obésité",
        "Diabète",
        "Arthrose",
        "Problèmes oculaires",
        "Allergies",
        "Infections urinaires",
        "Troubles du comportement",
    ];

    const treatmentsList = [
        "Médicaments",
        "Chirurgie",
        "Physiothérapie",
        "Changement de régime alimentaire",
        "Suppléments alimentaires",
        "Thérapie comportementale",
        "Médecine alternative",
        "Surveillance régulière",
        "Gestion de la douleur",
        "Soins palliatifs",
    ];

    const foods = [
        "Croquettes",
        "Friandises",
        "Nourriture humide",
        "Os à mâcher",
        "Rations ménagères",
        "Reste alimentaires",
    ];
    const [name, setName] = useState("");
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


    return (
        <div className="NewDogPage">
            <Link to={"/dashboard"} className="back-link">
                <span className="material-symbols-outlined">arrow_back</span>
                Retour
            </Link>
            <DogFormSection title={""}>
                <label htmlFor="dogName">Nom :</label>
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
                    onChange={(e) => setPhotoUrl(e.target.setPhotoUrl)}
                />

            </DogFormSection>

            {/* IDENTIFICATION */}
            <DogFormSection title={"Identification"}>
                <RadioContainer
                    text={["Male", "Femelle"]}
                    value={gender}
                    changeValue={(value) => setGender(value)}
                />

                <label htmlFor="date">Date de naissance :</label>
                <input
                    type="date"
                    name="birthDate"
                    value={birthdate}
                    onChange={() => {}}
                />

                <label htmlFor="breed">Race :</label>
                <select
                    name="breed"
                    value={breed}
                    onChange={() => {}}
                    placeholder="Sélectionner la race du chien"
                >
                    {breeds.map((breed) => (
                        <option key={breed} value={breed}>
                            {breed}
                        </option>
                    ))}
                    <option value="autre">Autre</option>
                </select>

                <label htmlFor="chip">N° puce :</label>
                <input
                    type="text"
                    name="chip"
                    placeholder="N° d’identification"
                />
            </DogFormSection>

            {/* SANTE */}
            <DogFormSection title={"Santé"}>
                <label htmlFor="ster">Stérilisation</label>
                <RadioContainer
                    text={["Non-stérilisé", "Stérilisé"]}
                    value={sterilized}
                    changeValue={(value) => setSterilized(value)}
                />
                <label htmlFor="health">
                    Problème de santé principal de votre chien
                </label>
                {/* <select
                    name="healthIssues"
                    value={healthIssues}
                    onChange={() => {}}
                    placeholder="Sélectionner le problème de santé"
                >
                    {hIssues.map((issue) => (
                        <option key={issue} value={issue}>
                            {issue}
                        </option>
                    ))}
                    <option value="autre">Autre</option>
                </select> */}

                <MultiSelect options={hIssues}/>

                <label htmlFor="health2">Autre(s) problème(s) de santé</label>
                <input
                    type="text"
                    name="otherHealthIssues"
                    placeholder="Autres(s) problème(s)"
                    value={otherHealthIssues}
                    onChange={(e) => setOtherHealthIssues(e.target.setPhotoUrl)}
                />

                <label htmlFor="treatments">
                    Traitements principal pris par votre chien
                </label>
                {/* <select
                    name="treatments"
                    value={treatments}
                    onChange={() => {}}
                    placeholder="Sélectionner le problème de santé"
                >
                    {treatmentsList.map((treatment) => (
                        <option key={treatment} value={treatment}>
                            {treatment}
                        </option>
                    ))}
                    <option value="autre">Autre</option>
                </select> */}
                <MultiSelect options={treatmentsList}/>
                <label htmlFor="treatment2">Autre(s) traitements(s) pris</label>
                <input
                    type="text"
                    name="otherTreatments"
                    placeholder="Autre(s) traitement(s)"
                    value={otherTreatments}
                    onChange={(e) => setOtherTreatments(e.target.setPhotoUrl)}
                />
            </DogFormSection>

            {/* ALIMENTATION */}
            <DogFormSection title={"Alimentation"}>
                <label>Nombre de repas (quotidien)</label>
                <ProductCounter />

                <label htmlFor="feed">
                    Sur quoi est basée l’alimentation de votre chien ?{" "}
                </label>
                {/* <select
                    name="feedBasis"
                    value={feedBasis}
                    onChange={() => {}}
                    placeholder="Sélectionner le problème de santé"
                >
                    {foods.map((food) => (
                        <option key={food} value={food}>
                            {food}
                        </option>
                    ))}
                    <option value="autre">Autre</option>
                </select> */}
                <MultiSelect options={foods}/>
            </DogFormSection>

            {/* ACTIVITE */}
            <DogFormSection title={"Activité"}>
                <label>Nombre de sorties (quotidienne)</label>
                <ProductCounter />
            </DogFormSection>

            {/* EDUCATION */}
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

            <button className="Button" onClick={() => {}}>
                Ajouter le chien
            </button>
        </div>
    );
};

export default NewDogPage;
