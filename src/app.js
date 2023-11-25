import React from 'react';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const formatSelectionCount = (count) => {
    if (count === 0) {
      return '';
    } else {
      const lastDigit = count % 10;
      const lastTwoDigits = count % 100;

      if (lastDigit === 1 && lastTwoDigits !== 11) {
        return `${count} раз`;
      } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
        return `${count} раза`;
      } else {
        return `${count} раз`;
      }
    }
  };

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>
          {list.map(item => (
            <div key={item.code} className='List-item'>
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}
              >
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>
                  {item.title}
                  {item.selectionCount > 0 && (
                    <span className='Item-selection-count'>
                      {'  | '}Выделяли {formatSelectionCount(item.selectionCount)}
                    </span>
                  )}
                </div>
                <div className='Item-actions'>
                  <button onClick={() => store.deleteItem(item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

