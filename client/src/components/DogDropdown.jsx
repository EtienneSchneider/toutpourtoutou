import "./DogDropdown.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
                                <Link to={"/" + dog._id}>
                                    {dog.identification.name}
                                </Link>
                            </li>
                        ) : (
                            <></>
                        ),
                    )}
                    <li className="dog-dropdown-add subheadertext bg-accent col-white">
                        <Link>+</Link>
                    </li>
                </ul>
            ) : (
                <></>
            )}
        </div>
    );
};

export default DogDropdown;
