import React from 'react';

function CartModal({ cart, onClose }) {
  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="cart-modal">
      <button onClick={onClose}>Закрыть</button>
      <ul>
        {cart.map(item => (
          <li key={item.code}>
            {item.title} - Количество: {item.quantity || 1} - Цена: {item.price * (item.quantity || 1)}
          </li>
        ))}
      </ul>
      <div>Общая сумма: {total}</div>
    </div>
  );
}

export default CartModal;