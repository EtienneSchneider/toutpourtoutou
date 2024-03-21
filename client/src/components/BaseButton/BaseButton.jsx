
import "./BaseButton.scss";

// eslint-disable-next-line react/prop-types
const BaseButton = ({children, onClick}) => {
    return (
        <button className="baseButton" onClick={onClick}>
            {children}
        </button>
    );
};

export default BaseButton;
