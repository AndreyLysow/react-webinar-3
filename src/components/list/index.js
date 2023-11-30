import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import styled from 'styled-components';

const StyledList = styled.div`
  /* Ваши стили здесь */
`;

const StyledListItem = styled.div`
  /* Ваши стили здесь */
`;

function List({ list, onAddToCart }) {
  return (
    <StyledList>
      {list.map(item => (
        <StyledListItem key={item.code}>
          <Item item={item} onAddToCart={onAddToCart} />
        </StyledListItem>
      ))}
    </StyledList>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
    })
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default React.memo(List);
