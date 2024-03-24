import "./DashboardProfile.scss";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import DogFormSection from "../../components/dog_components/DogFormSection.jsx";
import ProductCounter from "../../components/product_components/ProductCounter.jsx";
import RadioContainer from "../../components/RadioContainer/RadioContainer.jsx";
import MultiSelect from "../../components/Multiselect/Multiselect.jsx";
import {
    breeds,
    hIssues,
    treatmentsList,
    foods,
} from "../../assets/options.js";
import { useAppContext } from "../../contexts/AppContext.jsx";
import { formatDate, getTodayDate } from "../../helpers/functions.js";

const DashboardProfile = () => {
    const [selectedDogData, setSelectedDogData] = useState(null);
    const selectedDogId = useParams().dogId;
    const navigate = useNavigate();
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

    const [isLoaded] = useState(false);

    useEffect(() => {
        if (selectedDogData !== null) {
            setBirthdate(selectedDogData.identification.birthDate);
            setName(selectedDogData.identification.name);
            setChipNumber(selectedDogData.chipNumber);
            setPhotoUrl(selectedDogData.identification.picture);
            setGender(selectedDogData.identification.gender);
            setBirthdate(selectedDogData.identification.birthDate);
            setBreed(selectedDogData.identification.breed);
            setSterilized(selectedDogData.health.sterilized);
            setHealthIssues(selectedDogData.health.healthIssues);
            setOtherHealthIssues(selectedDogData.health.otherHealthIssues);
            setTreatments(selectedDogData.health.treatments);
            setOtherTreatments(selectedDogData.health.otherTreatments);
            setMeals(selectedDogData.feed.meals);
            setFeedBasis(selectedDogData.feed.feedBasis);
            setOutings(selectedDogData.activity.outings);
            setTraining(selectedDogData.education.training);
            setTrainingDogs(selectedDogData.education.trainingDogs);

            const weight = selectedDogData.health.weight;
            setWeight(weight[weight.length - 1].weight);
        }
    }, [selectedDogData]);

    const handleUpdateDog = async () => {
        const currentWeight = selectedDogData.health.weight;

        if (currentWeight[currentWeight.length - 1].weight !== weight) {
            const newWeight = {
                weight: weight,
                date: getTodayDate(),
            };
            currentWeight.push(newWeight);
        }

        const updatedDog = {
            chipNumber,
            owner: userDetails._id,
            identification: {
                name,
                gender,
                birthDate: birthdate,
                breed,
                picture: photoUrl
            },
            health: {
                sterilized,
                healthIssues,
                otherHealthIssues,
                treatments,
                otherTreatments,
                weight: currentWeight,
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
            .updateDog(updatedDog)
            .then((response) => {
                navigate("/dashboard");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (localStorage.getItem("accessToken") && userDetails) {
            appApi
                .getUserDogs({
                    owner: userDetails._id,
                })
                .then((response) => {
                    const userDogs = response.data;
                    for (const dog of userDogs) {
                        if (dog._id === selectedDogId) {
                            setSelectedDogData(dog);
                            break;
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [userDetails]);

    return { isLoaded } ? (
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
                    disabled={true}
                    text={["Male", "Femelle"]}
                    value={gender}
                    changeValue={(value) => setGender(value)}
                />

                <label htmlFor="date">Date de naissance* :</label>
                <input
                    type="text"
                    readOnly
                    name="birthDate"
                    value={birthdate}
                />

                <label htmlFor="breed">Race* :</label>
                <input type="text" readOnly name="birthDate" value={breed} />
                <label htmlFor="chip">N° puce* :</label>
                <input
                    type="text"
                    name="chip"
                    value={chipNumber}
                    placeholder="N° d’identification"
                    readOnly
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

            <button className="Button" onClick={handleUpdateDog}>
                Enregistrer
            </button>
        </div>
    ) : (
        <></>
    );
};

export default DashboardProfile;
