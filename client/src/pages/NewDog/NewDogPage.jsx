import "./NewDogPage.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import DogFormSection from "../../components/dog_components/DogFormSection";
import Button from "../../components/clickables/Button";
import axios from "axios";

const NewDogPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [formData, setFormData] = useState({
        name: "",
        birthDate: "",
        gender: "",
        sterilized: "false",
        allergies: [],
    });

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
                    {...register("name")}
                    name="dogName"
                    value={formData.name}
                    onChange={handleChange}
                />

                <label htmlFor="dogPicture">Photo du chien (url) :</label>
                <input name="dogPicture" />
            </DogFormSection>

            <DogFormSection title={"Identification"}>
                <div className="radio-container">
                    <label htmlFor="male" className="radio-lab">
                        <input
                            id="male"
                            type="radio"
                            {...register("gender", { required: true })}
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
                            {...register("gender", { required: true })}
                            name="gender"
                            value="femelle"
                            // checked={formData.gender === "female"}
                            onChange={handleChange}
                        />
                        Femelle
                    </label>
                </div>

                <label htmlFor="date">Date de naissance :</label>
                <input
                    type="date"
                    {...register("birthDate", { required: true })}
                    name="date"
                    value={formData.age}
                    onChange={handleChange}
                />

                <label htmlFor="breed">Race :</label>
                <select
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    placeholder="Sélectionner la race du chien"
                >
                    <option value="a">Berger Allemand</option>
                    <option value="b">Bichon</option>
                    <option value="c">Cane Corso</option>
                    <option value="d">Bouldogue Français</option>
                    <option value="e">Berger Australien</option>
                    <option value="f">Saint Bernard</option>
                    <option value="g">Malinois</option>
                </select>

                <label htmlFor="chip">N° puce :</label>
                <input
                    type="text"
                    name="chip"
                    placeholder="N° d’identification"
                />
            </DogFormSection>

            <DogFormSection title={"Santé"}>
                <div className="radio-container">
                    <label htmlFor="nonster" className="radio-lab">
                        <input
                            id="nonster"
                            type="radio"
                            {...register("sterilisation", { required: true })}
                            name="sterilisation"
                            value="nonster"
                            // checked={formData.gender === "male"}
                            onChange={handleChange}
                        />
                        Non-stérilisé
                    </label>
                    <label htmlFor="ster" className="radio-lab">
                        <input
                            id="ster"
                            type="radio"
                            {...register("sterilisation", { required: true })}
                            name="sterilisation"
                            value="ster"
                            // checked={formData.gender === "female"}
                            onChange={handleChange}
                        />
                        Stérilisé
                    </label>
                </div>
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
