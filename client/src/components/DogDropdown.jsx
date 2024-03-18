import "./DogDropdown.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

const DogDropdown = ({ dogMap, selectedDog }) => {
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
                {dogMap.get(selectedDog).name}
                <span className="material-symbols-outlined">
                    {open ? "arrow_drop_up" : "arrow_drop_down"}
                </span>
            </button>
            {open ? (
                <ul className="dog-dropdown-menu bg-white col-gray">
                    {Array.from(dogMap.keys()).map((key) =>
                        key !== selectedDog ? (
                            <li className="dog-dropdown-item" key={key}>
                                <Link>{dogMap.get(key).name}</Link>
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
