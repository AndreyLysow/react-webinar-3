import React, { useCallback } from 'react';
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartSummary from "./components/cart";  // Импортируйте CartSummary из папки cart

function App({ store }) {
  const { list = [], cart = [], isCartModalOpen } = store.getState();

  const addToCart = useCallback((code) => {
    const selectedProduct = list.find(item => item.code === code);

    if (selectedProduct) {
      store.addToCart(selectedProduct.code);
    }
  }, [store, list]);

  const openCartModal = useCallback(() => {
    store.toggleCartModal();
  }, [store]);

  const removeItemFromCart = useCallback((code) => {
    store.removeFromCart(code);
  }, [store]);

  return (
    <PageLayout>
      <Head title='Магазин' openCart={openCartModal} cartCount={cart.length} />
           <CartSummary cart={cart} onOpenCart={openCartModal} onRemoveItem={removeItemFromCart} />
      <List list={list} onAddToCart={addToCart} />
      {/* Используйте новый компонент Cart вместо CartModal и CartSummary */}

    </PageLayout>
  );
}

export default App;