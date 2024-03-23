import "./ProductCounter.scss";

const ProductCounter = ({value, updateCounter}) => {

    function increase() {
        updateCounter(value + 1)
    }

    function decrease() {
        if (value > 0) {
            updateCounter(value - 1)
        }
    }

    return (
        <div className="count-wrapper">
            <button onClick={decrease}>-</button>
            <span
                className="count"
            >
                {value}
            </span>
            <button onClick={increase}>+</button>
        </div>
    );
};

export default ProductCounter;
