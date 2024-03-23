import "./DogDropdown.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";

const DogDropdown = ({ dogList, selectedDog }) => {
    const [open, setOpen] = useState(false);

    const handleDropdownClick = () => {
        setOpen((prev) => !prev);
    };

    return (
        <div className="DogDropdown">
            <button
                onClick={handleDropdownClick}
                className="dog-dropdown-toggle subheadertext"
            >
                {
                    dogList.find((dog) => dog._id === selectedDog)
                        .identification.name
                }
                <span className="material-symbols-outlined">
                    {open ? "arrow_drop_up" : "arrow_drop_down"}
                </span>
            </button>
            {open ? (
                <ul className="dog-dropdown-menu bg-white col-gray">
                    {dogList.map((dog) =>
                        dog._id !== selectedDog ? (
                            <li className="dog-dropdown-item" key={dog._id}>
                                <Link
                                    to={"/dashboard/" + dog._id}
                                    onClick={() => setOpen(false)}
                                    key={dog._id} // Ajout de la clé unique
                                >
                                    {dog.identification.name}
                                </Link>
                            </li>
                        ) : (
                            <React.Fragment key={dog._id}></React.Fragment> // Ajout de la clé unique pour l'élément vide
                        ),
                    )}
                    <li className="dog-dropdown-add subheadertext bg-accent col-white" key="add-dog">
                        <Link to="/new-dog">+</Link>
                    </li>
                </ul>
            ) : (
                <></>
            )}
        </div>
    );
};

export default DogDropdown;
