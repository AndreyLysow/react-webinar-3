import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Item(props) {
  const callbacks = {
    onClick: () => {
      props.onSelect(props.item.code);
    },
    onAddToCart: () => {
      props.onAddToCart(props.item.code);
    },
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
  };

  return (
    <div className={"Item" + (props.item.selected ? " Item_selected" : "")} onClick={callbacks.onClick}>
    <div className="Item-content">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">{formatPrice(props.item.price)}</div>
    </div>
    <div className="Item-actions">
      <button onClick={callbacks.onAddToCart}>Добавить</button>
    </div>
  </div>
  );
}


Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    price: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
};

Item.defaultProps = {
  onDelete: () => {
  },
  onSelect: () => {
  },
}

export default React.memo(Item);
