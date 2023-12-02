import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import './style.css';

function CartSummary({ cart, onOpenCart, onRemoveItem }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cartItems = cart
    ? cart.reduce((acc, item) => {
        const existingItem = acc.find((cartItem) => cartItem.code === item.code);

        if (existingItem) {
          existingItem.count += 1;
        } else {
          acc.push({ ...item, count: 1 });
        }

        return acc;
      }, [])
    : [];

  const totalItems = cartItems.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.count, 0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRemoveItem = (code) => {
    // Всегда удаляем полностью
    onRemoveItem(code, true);
  };

  const modalStyle = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      width: '80vw',
      maxWidth: 'none',
      margin: 'auto',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      borderRadius: '8px',
    },
  };

  return (
    <div className="CartSummary">
      <p>
        {totalItems > 0 ? (
          <>В корзине: {totalItems} товара / {totalPrice} ₽</>
        ) : (
          <>В корзине: <b>пусто</b></>
        )}
      </p>
      <button onClick={openModal}>Перейти</button>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={modalStyle}>
        <div className="modal-header">
          <h2>Корзина</h2>
          <button className="remove-button" onClick={closeModal}>
            Закрыть
          </button>
        </div>
        {cartItems.map((item, index) => (
          <div key={item.code} className="item">
            <div>
              {index + 1}. {item.title} - {item.count} шт. - {item.price * item.count} ₽
            </div>
            <button className="remove-button" onClick={() => handleRemoveItem(item.code)}>
              Удалить
            </button>
          </div>
        ))}
        {totalItems > 0 && (
          <div className="total">
            Итого: {totalPrice} ₽
          </div>
        )}
      </Modal>
    </div>
  );
}

CartSummary.propTypes = {
  cart: PropTypes.array,
  onOpenCart: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};

export default React.memo(CartSummary);
