import React, { useState } from 'react';
import './SizeButtons.scss';

const SizeButtons = () => {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <form>
      <fieldset className="picker">
        <legend>Tailles</legend>
        {['S', 'M', 'L'].map((size) => (
          <label key={size} htmlFor={`size-${size}`}>
            <input
              type="radio"
              name="sizes"
              id={`size-${size}`}
              onChange={() => handleSizeClick(size)}
            />
            <span>{size}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="picker">
        <legend>Couleurs</legend>
        {['multicolor', 'violet', 'green', 'pink'].map((color) => (
          <label key={color} htmlFor={`color-${color.toLowerCase()}`} style={{ '--color': color}}>
            <input
              type="radio"
              name="colors"
              id={`color-${color.toLowerCase()}`}
              onChange={() => handleSizeClick(color)}
            />
            <span>{color}</span>
          </label>
        ))}
      </fieldset>
    </form>
  );
};

export default SizeButtons;
