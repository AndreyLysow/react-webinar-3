import React, { useCallback } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartModal from "./cart-modal";
import CartSummary from "./cart-summary";

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

  return (
    <PageLayout>
      <Head title='Магазин' openCart={openCartModal} cartCount={cart.length} />
      <Controls onAdd={addToCart} />
      <List list={list} onAddToCart={addToCart} />
      {isCartModalOpen && (
        <CartModal cart={cart} onClose={openCartModal} />
      )}
      <CartSummary cart={cart} onOpenCart={openCartModal} />
    </PageLayout>
  );
}

export default App;