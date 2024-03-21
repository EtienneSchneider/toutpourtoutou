import React, { useState } from 'react';
import './ButtonPlus.scss';

const Counter = () => {
  const [count, setCount] = useState(1);

  function increase() {
    setCount(count + 1);
  }



  function decrease() {
    if (count > 0) {
      setCount(count - 1);
    }
  }
  
  function onCountEdit(event) {
    let countContent = Number(event.target.textContent);
    if (Number.isNaN(countContent)) {
      setCount(Math.floor(Math.random() * 10));
    } else {
      setCount(countContent);
    }
  }

  return (
    <div className='count-wrapper'>
      <button className='buttonPlus' onClick={decrease}>-</button>
      <span className='count' contentEditable='false' onBlur={onCountEdit}>{count}</span>
      <button className="buttonPlus" onClick={increase}>+</button>
    </div>
  );
};

export default Counter;
