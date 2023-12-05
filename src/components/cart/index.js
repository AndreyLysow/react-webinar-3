import React, { useState, useEffect } from 'react';
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
  const totalGroups = cartItems.length;
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.count, 0);

  useEffect(() => {
    const handleBodyScroll = () => {
      document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
    };

    document.addEventListener('scroll', handleBodyScroll);

    return () => {
      document.removeEventListener('scroll', handleBodyScroll);
    };
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRemoveItem = (code) => {
    onRemoveItem(code, true);
  };

  const modalStyle = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      position: 'absolute',
      width: '960px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '3',
      border: 'none',
      borderRadius: '10px',
      overflow: 'auto',
      padding: '0',
    },
  };

  return (
    <div className="CartSummary">
      <p>
        {totalItems > 0 ? (
          <>
            В корзине: {totalGroups} {totalGroups === 1 ? 'товар' : totalGroups < 5 ? 'товара' : 'товаров'} / {totalPrice.toLocaleString()} ₽
          </>
        ) : (
          <>
            В корзине: <b>пусто</b>
          </>
        )}
      </p>
      <div className="button-container" onClick={openModal}>
        <button className="remove-button go-button">Перейти</button>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={modalStyle}>
        <div className="modal-header">
          <h2>Корзина</h2>
          <button className="remove-button" onClick={closeModal}>
            Закрыть
          </button>
        </div>
        {cartItems.map((item, index) => (
          <div key={item.code} className="item">
            <div className="item-content">
              <span className="item-info">{index + 1} {item.title}</span>
              <span className="item-details">
              <span className="item-price">{item.price * item.count} ₽</span>
              <span className="item-count">{item.count} шт</span>
              </span>
            </div>
            <button className="remove-button" onClick={() => handleRemoveItem(item.code)}>
              Удалить
            </button>
          </div>
        ))}
        {totalItems > 0 && (
          <div className="total">
            Итого  {totalPrice.toLocaleString()} ₽
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
