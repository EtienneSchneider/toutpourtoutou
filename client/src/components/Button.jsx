import "./Button.scss";

const Button = ({ text, arrow }) => {
    return (
        <div className="Button bg-accent col-white">
            {text}
            {arrow ? (
                <span className="material-symbols-outlined">arrow_forward</span>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Button;
