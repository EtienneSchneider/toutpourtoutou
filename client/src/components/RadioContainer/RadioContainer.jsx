import "./RadioContainer.scss";
import classNames from "classnames";

const RadioContainer = ({ text, changeValue, value, disabled }) => {
    return (
        <div className="radioContainer">
            <button
                disabled={disabled}
                className={classNames("radioButton", {
                    selected: value === true,
                })}
                onClick={() => changeValue(true)}
            >
                {text[0]}
            </button>
            <button
                disabled={disabled}
                className={classNames("radioButton", {
                    selected: value === false,
                })}
                onClick={() => changeValue(false)}
            >
                {text[1]}
            </button>
        </div>
    );
};

export default RadioContainer;
