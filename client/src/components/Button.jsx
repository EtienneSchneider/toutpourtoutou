import { Link } from "react-router-dom";
import "./Button.scss";

const Button = ({ text, link, arrow }) => {
    return (
        <Link to={link} className="Button">
            {text}
            {arrow ? (
                <span className="material-symbols-outlined">arrow_forward</span>
            ) : (
                <></>
            )}
        </Link>
    );
};

export default Button;
