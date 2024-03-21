import React, { useState } from "react";
import "./Registration.scss";
import "../App.scss";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
// import axios from 'axios';

const RegistrationForm = () => {

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
        <div className="Registration">
            <NavBar />
            {/* <p className="header">Inscription</p> */}
            <div className="basicInfos"> {/*photo + nom*/}
                <div className="picture"></div>
                <p>Nom: </p>
                <input
                    {...register("name")}
                    name="dogName"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>

            <div className="identification">
                {/* sexe, age, race, n°puce */}
                <p className="subHeader">Identification</p>
                <div className='radio'>
                    <p>Sexe: </p>
                    <label>
                        <input
                            type='radio'
                            {...register("gender", { required: true })}
                            name="gender"
                            value="femelle"
                            checked={formData.gender === "female"}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                        />
                        <span
                            className={formData.gender === "female" ? "selected" : ""}
                            onClick={() => setFormData(prevState => ({ ...prevState, gender: 'female' }))}
                        >
                            Femelle
                        </span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            {...register("gender", { required: true })}
                            name="gender"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                        />
                        <span
                            className={formData.gender === "male" ? "selected" : ""}>
                            Mâle
                        </span>

                    </label>
                </div>
                <div className="age">
                    <p>Age: </p>
                    <input
                        className="age"
                        type="date"
                        {...register("birthDate", { required: true })}
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </div>
                <p>Race: </p>
                <select
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                >
                    <option value="">Sélectionnez la race du chien</option>
                    <option value="male">Berger Allemand</option>
                    <option value="female">Bichon</option>
                    <option value="female">Cane Corso</option>
                    <option value="female">Bouldogue Français</option>
                    <option value="female">Berger Australien</option>
                    <option value="female">Saint Bernard</option>
                    <option value="female">Terre-neuve</option>
                </select>
                {/* <p>Chip number: </p> */}
            </div>

            <div className="sante">
                <p className="subHeader">Santé</p>
                <div className='radio'>
                    <p>Statut: </p>
                    <label>
                        <input
                            type='radio'
                            name="sterilized"
                            value="true"
                            checked={formData.gender === "true"}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                        />
                        <span className={formData.sterilized === 'true' ? 'selected' : ''} onClick={() => setFormData(prevState => ({ ...prevState, sterilized: 'true' }))}>Stérilisé</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="sterilized"
                            value="false"
                            checked={formData.sterilized === "false"}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                        />
                        <span className={formData.sterilized === 'false' ? 'selected' : ''} onClick={() => setFormData(prevState => ({ ...prevState, sterilized: 'false' }))}>Non stérilisé</span>
                    </label>
                </div>

            </div>
            <button className="submitButton" style={{ display: "inline-block" }} onClick={displayData(formData)}>Ok</button>

        </div >
    );
};

export default RegistrationForm;