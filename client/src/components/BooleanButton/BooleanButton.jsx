import "./BooleanButton.scss";
import classNames from "classnames";

// eslint-disable-next-line react/prop-types
const BooleanButton = ({ toggleSelected, selected }) => {
    return (
        <div className="buttonContainer">
            <button
                className={classNames("booleanButton", {
                    selected: selected === true,
                })}
                onClick={toggleSelected}
            >
                Oui
            </button>
            <button
                className={classNames("booleanButton", {
                    selected: selected === false,
                })}
                onClick={toggleSelected}
            >
                Non
            </button>
        </div>
    );
};

export default BooleanButton;
