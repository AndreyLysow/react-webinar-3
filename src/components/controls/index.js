import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Controls({ onAdd }) {
  return (
    <div className="Controls">
      <button onClick={onAdd}>Добавить в корзину</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default Controls;