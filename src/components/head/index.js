import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({ title, cartCount }) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  cartCount: PropTypes.number.isRequired,
};

export default React.memo(Head);

