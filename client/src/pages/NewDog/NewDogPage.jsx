import "./NewDogPage.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import DogFormSection from "../components/dog_components/DogFormSection";
import ProductCounter from "../components/product_components/ProductCounter";
import Button from "../components/clickables/Button";
import axios from "axios";

const NewDogPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [formData, setFormData] = useState({
        dogName: "",
        // dogPicture="",
        birthDate: "",
        gender: "",
        breed: "",
        sterilized: "",
        healthIssues: "",
        otherHealthIssues: "",
        treatments: "",
        otherTreatments: "",
        meals: 0,
        feedBasis: "",
        otherFeedBasis: "",
        outings: 0,
        training: "",
        trainingDog: "",
    });

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
        "Autre"
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
        "Troubles du comportement"
    ];

    const treatments = [
        "Médicaments",
        "Chirurgie",
        "Physiothérapie",
        "Changement de régime alimentaire",
        "Suppléments alimentaires",
        "Thérapie comportementale",
        "Médecine alternative",
        "Surveillance régulière",
        "Gestion de la douleur",
        "Soins palliatifs"
    ];

    const foods = [
        "Croquettes",
        "Friandises",
        "Nourriture humide",
        "Os à mâcher",
        "Rations ménagères",
        "Reste alimentaires",
    ];


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // const handleAllergiesChange = (e) => {
    //     const { value } = e.target;
    //     setFormData((prevState) => ({
    //         ...prevState,
    //         allergies: [...prevState.allergies, value],
    //     }));
    // };

    const displayData = (data) => {
        console.log("données du formulaire : ", data); // Affiche une alerte "Bouton cliqué"
    };

    // const onSubmit = async (data) => {
    //     try {
    //         const response = await axios.post('/api/dogs', data);
    //         console.log("Données soumises :", data); // Affiche les données du formulaire
    //         console.log("Réponse du serveur :", response.data); // Affiche la réponse du serveur
    //     } catch (error) {
    //         console.error(error); // Gère les erreurs de requête
    //     }
    // };

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
                    value={formData.dogName}
                    onChange={handleChange}
                />

                <label htmlFor="dogPicture">Photo du chien (url) :</label>
                <input name="dogPicture" />
            </DogFormSection>

            {/* IDENTIFICATION */}
            <DogFormSection title={"Identification"}>
                <label htmlFor="gender">Sexe :</label>
                <div className="radio-container">
                    <label htmlFor="male" className="radio-lab">
                        <input
                            id="male"
                            type="radio"
                            // {...register("gender", { required: true })}
                            name="gender"
                            value="male"
                            // checked={formData.gender === "male"}
                            onChange={handleChange}
                        />
                        Male
                    </label>
                    <label htmlFor="femelle" className="radio-lab">
                        <input
                            id="femelle"
                            type="radio"
                            // {...register("gender", { required: true })}
                            name="gender"
                            value="female"
                            // checked={formData.gender === "female"}
                            onChange={handleChange}
                        />
                        Femelle
                    </label>
                </div>

                <label htmlFor="date">Date de naissance :</label>
                <input
                    type="date"
                    // {...register("birthDate", { required: true })}
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                />

                <label htmlFor="breed">Race :</label>
                <select
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    placeholder="Sélectionner la race du chien">
                    {breeds.map((breed) => (
                        <option key={breed} value={breed}>{breed}</option>
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
                <div className="radio-container">
                    <label htmlFor="nonster" className="radio-lab">
                        <input
                            id="nonster"
                            type="radio"
                            // {...register("sterilized", { required: true })}
                            name="sterilized"
                            value="nonSteri"
                            // checked={formData.gender === "male"}
                            onChange={handleChange}
                        />
                        Non-stérilisé
                    </label>
                    <label htmlFor="ster" className="radio-lab">
                        <input
                            id="ster"
                            type="radio"
                            // {...register("sterilized", { required: true })}
                            name="sterilized"
                            value="steri"
                            // checked={formData.gender === "female"}
                            onChange={handleChange}
                        />
                        Stérilisé
                    </label>
                </div>
                <label htmlFor="health">Problème de santé principal de votre chien</label>
                <select
                    name="healthIssues"
                    value={formData.healthIssues}
                    onChange={handleChange}
                    placeholder="Sélectionner le problème de santé">
                    {hIssues.map((issue) => (
                        <option key={issue} value={issue}>{issue}</option>
                    ))}
                    <option value="autre">Autre</option>
                </select>

                <label htmlFor="health2">Autre(s) problème(s) de santé</label>
                <input
                    type="text"
                    name="otherHealthIssues"
                    placeholder="Autres(s) problème(s)"
                    onChange={handleChange}
                />

                <label htmlFor="treatments">Traitements principal pris par votre chien</label>
                <select
                    name="treatments"
                    value={formData.treatments}
                    onChange={handleChange}
                    placeholder="Sélectionner le problème de santé">
                    {treatments.map((treatment) => (
                        <option key={treatment} value={treatment}>{treatment}</option>
                    ))}
                    <option value="autre">Autre</option>
                </select>

                <label htmlFor="treatment2">Autre(s) traitements(s) pris</label>
                <input
                    type="text"
                    name="otherTreatments"
                    placeholder="Autre(s) traitement(s)"
                    onChange={handleChange}
                />

            </DogFormSection>

            {/* ALIMENTATION */}
            <DogFormSection title={"Alimentation"}>
                <label>Nombre de repas (quotidien)</label>
                <ProductCounter />

                <label htmlFor="feed">Sur quoi est basée l’alimentation de votre chien ? </label>
                <select
                    name="feedBasis"
                    value={formData.feedBasis}
                    onChange={handleChange}
                    placeholder="Sélectionner le problème de santé">
                    {foods.map((food) => (
                        <option key={food} value={food}>{food}</option>
                    ))}
                    <option value="autre">Autre</option>
                </select>

                <label htmlFor="feed2">Autre(s) type(s) d'alimentation</label>
                <input
                    type="text"
                    name="otherFeedBasis"
                    placeholder="Autre(s) alimentation(s)"
                    onChange={handleChange}
                />
            </DogFormSection>

            {/* ACTIVITE */}
            <DogFormSection title={"Activité"}>
                <label>Nombre de sorties (quotidienne)</label>
                <ProductCounter />
            </DogFormSection>

            {/* EDUCATION */}
            <DogFormSection title={"Education"}>
                <label>
                    Avez-vous déjà participé à un ou plusieurs cours de dressage canin ?
                    <div className="radio-container">
                        <label htmlFor="educ" className="radio-lab">
                            <input
                                id="educ"
                                type="radio"
                                // {...register("training", { required: true })}
                                name="training"
                                value="yes"
                                // checked={formData.gender === "male"}
                                onChange={handleChange}
                            />
                            Oui
                        </label>
                        <label htmlFor="nonEduc" className="radio-lab">
                            <input
                                id="nonEduc"
                                type="radio"
                                // {...register("training", { required: true })}
                                name="training"
                                value="no"
                                // checked={formData.gender === "female"}
                                onChange={handleChange}
                            />
                            Non
                        </label>
                    </div>
                </label>
                <label>
                    Si oui, avez vous participé à ce ou ces cours avec {formData.name} ?                         
                    <div className="radio-container">
                        <label htmlFor="educDog" className="radio-lab">
                            <input
                                id="educDog"
                                type="radio"
                                // {...register("trainingDog", { required: true })}
                                name="trainingDog"
                                value="yes"
                                // checked={formData.gender === "male"}
                                onChange={handleChange}
                            />
                            Oui
                        </label>
                        <label htmlFor="NonEducDog" className="radio-lab">
                            <input
                                id="NonEducDog"
                                type="radio"
                                {...register("trainingDog", { required: true })}
                                name="trainingDog"
                                value="no"
                                // checked={formData.gender === "female"}
                                onChange={handleChange}
                            />
                            Non
                        </label>
                    </div>
                </label>


            </DogFormSection>

            <button
                className="Button"
                style={{ display: "inline-block" }}
                onClick={displayData(formData)}
            >
                Ajouter le chien
            </button>
        </div>
    );
};

export default NewDogPage;
