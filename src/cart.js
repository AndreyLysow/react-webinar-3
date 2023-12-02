import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

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

  const itemStyle = {
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const headerStyle = {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  };

  const totalStyle = {
    marginTop: '10px',
  };

  const removeButtonStyle = {
    background: 'none',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#333',
    padding: '8px 12px',
    marginLeft: '10px',
  };

  return (
    <div className="CartSummary">
      {totalItems > 0 ? (
        <p>
          В корзине: {totalItems} товара / {totalPrice} ₽
        </p>
      ) : (
        <p>В корзине: <b>пусто</b></p>
      )}
      <button onClick={openModal}>Перейти</button>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={modalStyle}>
        <div style={headerStyle}>
          <h2 style={{ margin: 0 }}>Корзина</h2>
          <button
            onClick={closeModal}
            style={{
              ...removeButtonStyle,
              background: '#f2f2f2',
            }}
          >
            Закрыть
          </button>
        </div>
        {cartItems.map((item, index) => (
          <div key={item.code} style={itemStyle}>
            <div>
              {index + 1}. {item.title} - {item.count} шт. - {item.price * item.count} ₽
            </div>
            <button
              onClick={() => handleRemoveItem(item.code)}
              style={removeButtonStyle}
            >
              Удалить
            </button>
          </div>
        ))}
        {totalItems > 0 && (
          <div style={totalStyle}>
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
