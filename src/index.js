import React from 'react';
import { createRoot } from 'react-dom/client';
import { generateCode } from './utils';
import App from './app';
import Store from './store';

const initialProducts = [
  { title: 'Название товара', price: 100.0 },
  { title: 'Книга про React', price: 770 },
  { title: 'Конфета', price: 33 },
  { title: 'Трактор', price: 7955320 },
  { title: 'Телефон iPhone XIXV', price: 120000 },
  { title: 'Карандаши цветные', price: 111 },
  { title: 'Товар сюрприз', price: 0 },
];

const initialData = {
  list: initialProducts.map(product => ({
    code: generateCode(),
    title: product.title,
    price: product.price,
  })),
};

const store = new Store(initialData);
const root = createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(<App store={store} />);
};

store.subscribe(renderApp);


renderApp();

