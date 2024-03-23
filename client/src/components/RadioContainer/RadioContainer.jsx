import "./RadioContainer.scss";
import classNames from "classnames";

const RadioContainer = ({ text, changeValue, value }) => {
    return (
        <div className="radioContainer">
            <button
                className={classNames("radioButton", {
                    selected: value === true,
                })}
                onClick={() => changeValue(true)}
            >
                {text[0]}
            </button>
            <button
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
