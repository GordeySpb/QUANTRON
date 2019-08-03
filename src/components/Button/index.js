import React from 'react';

const Button = ({ name, onClick }) => (
  <button type="button" className="sortBtn" onClick={onClick}>
    {name}
  </button>
);

export default Button;
