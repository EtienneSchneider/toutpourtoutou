import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import BaseButton from "../../components/BaseButton/BaseButton";
import BooleanButton from "../../components/BooleanButton/BooleanButton";
import { useAppContext } from "../../contexts/AppContext";
import { checkPasswordStrength } from "../../helpers/functions";

const LoginPage = () => {
    const [login, setLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [owner, setOwner] = useState(true);
    const [error, setError] = useState("");

    const { appApi, setUserDetails, setIsAuthentificated } = useAppContext();

    const navigate = useNavigate();

    const toggleLogin = () => {
        setLogin((prevLogin) => !prevLogin);
    };

    const handleLogin = async () => {
        if (email === "" || password === "") {
            setError("Veuilez renseigner toutes les informations.");
        } else {
            const user = {
                email,
                password,
            };
            await appApi
                .login(user)
                .then((response) => {
                    localStorage.setItem("accessToken", response.data.token);
                    setUserDetails(response.data.user);
                    setIsAuthentificated(true);

                    navigate("/dashboard");
                })
                .catch((error) => {
                    alert(error);
                });
        }
    };

    const handleRegister = async () => {
        if (
            email === "" ||
            password === "" ||
            confirmPassword === "" ||
            lastname === "" ||
            firstname === ""
        ) {
            setError("Veuilez renseigner toutes les informations.");
        } else if (password !== confirmPassword) {
            setError(
                "Le mot de passe et la confirmation de mot de passe doivent être identiques.",
            );
        } else if (!checkPasswordStrength(password)) {
            setError(
                "Le mot de passe est trop faible, il doit comporter au minimum : 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",
            );
        } else {
            const newUser = {
                firstname,
                lastname,
                owner,
                email,
                password,
            };
            await appApi
                .createAccount(newUser)
                .then(() => {
                    setLogin(true);
                    alert("Votre compte a bien été créé.");
                })
                .catch((error) => {
                    alert(error);
                });
        }
    };

    const handleSubmit = () => {
        if (login) {
            handleLogin();
        } else {
            handleRegister();
        }
    };

    const handleToggleOwner = () => {
        setOwner((prev) => !prev);
    };

    return (
        <div className="registration">
            <div className="container">
                {login ? (
                    <h3>
                        Ravi de vous revoir ! Connectez-vous pour suivre votre
                        progression.
                    </h3>
                ) : (
                    <h3>
                        Bienvenue, inscrivez-vous afin de profiter pleinement de
                        notre application
                    </h3>
                )}

                <div className="registration-form">
                    {login && (
                        <>
                            <input
                                type="text"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="E-mail"
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                placeholder="Mot de passe"
                            />
                        </>
                    )}
                    {!login && (
                        <>
                            <input
                                type="text"
                                value={firstname}
                                onChange={(event) =>
                                    setFirstname(event.target.value)
                                }
                                placeholder="Prénom"
                            />
                            <input
                                type="text"
                                value={lastname}
                                onChange={(event) =>
                                    setlastname(event.target.value)
                                }
                                placeholder="Nom"
                            />
                            <input
                                type="text"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="E-mail"
                            />
                            <div className="ownership">
                                <span>
                                    Êtes-vous propriétaire d'un chien ?{" "}
                                </span>
                                <BooleanButton
                                    toggleSelected={handleToggleOwner}
                                    selected={owner}
                                />
                            </div>

                            <input
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                placeholder="Mot de passe"
                            />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(event.target.value)
                                }
                                placeholder="Confirmation"
                            />
                        </>
                    )}

                    {login ? (
                        <span className="cta">
                            Vous n'avez pas encore de compte ?{" "}
                            <button onClick={toggleLogin}>
                                Inscrivez-vous
                            </button>
                        </span>
                    ) : (
                        <span className="cta">
                            Vous avez déjà un compte ?{" "}
                            <button onClick={toggleLogin}>
                                Connectez-vous
                            </button>
                        </span>
                    )}
                </div>

                <span className="error">{error}</span>

                <div className="bottomPart">
                    <BaseButton onClick={handleSubmit}>Valider</BaseButton>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
