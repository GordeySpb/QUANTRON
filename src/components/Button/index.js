import React from 'react';
import PropTypes from 'prop-types';

/** Button component
 *
 * @param {String} param.name button name
 * @param {Function} param.onClick sort function
 */

const Button = ({ name, onClick }) => (
  <button type="button" className="sortBtn" onClick={onClick}>
    {name}
  </button>
);

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
