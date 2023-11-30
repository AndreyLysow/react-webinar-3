import { generateCode } from './utils';

class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
    this.listeners.forEach(listener => listener());
  }

  addToCart(code) {
    const { list = [], cart = [] } = this.state;
    const selectedProduct = list.find(item => item.code === code);

    if (selectedProduct) {
      this.setState({
        ...this.state,
        cart: [...cart, selectedProduct],
      });
    }
  }

  toggleCartModal() {
    this.setState({
      ...this.state,
      isCartModalOpen: !this.state.isCartModalOpen,
    });
  }



  addProduct(title, price) {
    const { list = [] } = this.state;

    this.setState({
      ...this.state,
      list: [...list, { code: generateCode(), title, price }],
    });
  }


  removeFromCart(code) {
    const { cart = [] } = this.state;
    const updatedCart = cart.filter(item => item.code !== code);

    this.setState({
      ...this.state,
      cart: updatedCart,
    });
  }
}

export default Store;