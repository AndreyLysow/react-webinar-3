import React from 'react';
import PropTypes from 'prop-types';

function CartSummary({ cart, onOpenCart }) {
  const totalItems = cart.reduce((acc, item) => acc + (item.count || 1), 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="CartSummary">
      <p>
        В корзине: {totalItems} товара / {totalPrice} ₽
      </p>
      <button onClick={onOpenCart}>Перейти</button>
    </div>
  );
}

CartSummary.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number,
      price: PropTypes.number,
    })
  ).isRequired,
  onOpenCart: PropTypes.func.isRequired,
};

export default CartSummary;