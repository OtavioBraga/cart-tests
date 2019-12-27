import React, { useState } from 'react';
import './App.css';
import { calculateFreight } from './common/Correios'
import Freight from './common/Freight'
import Cart from './common/Cart'


function App() {
  const [cart, setCart] = useState({
    user: {
      name: 'Otavio Braga',
      postalCode: '80050370'
    },
    products: [],
    freightValue: ''
  })

  const [postalCode, setPostalCode] = useState('')

  const freight = new Freight(calculateFreight)
  
  const cartManager = new Cart(cart, setCart, freight)

  const defaultProducts = [
    {
      name: 'Produto 1',
      price: 78888,
      id: '1'
    },
    {
      name: 'Produto 2',
      price: 50000,
      id: '2'
    },
    {
      name: 'Produto 3',
      price: 129900,
      id: '3'
    },
    {
      name: 'Produto 4',
      price: 1500,
      id: '4'
    },
  ]

  const handlePostalCodeChange = ({ target: { value } }) => setPostalCode(value)
  
  return (
    <div className="App">
      <h1 data-testid="cart-total">R$ {cartManager.total}</h1>
      {cartManager.freightValue > 0 ? (
        <h1 data-testid="cart-freight-total">Frete: R$ {cartManager.freightValue}</h1>
      ) : cartManager.freightValue !== '' ? (
        <h1 data-testid="cart-freight-total">Frete grátis</h1>
      ) : ''}
      <div>
        <input
          data-testid="cart-postal-code-input"
          onChange={handlePostalCodeChange} 
          value={postalCode} 
          placeholder="Informe o seu CEP" 
        />
        <button
          data-testid="calculate-freight-button"
          onClick={() => cartManager.calculateFreight(postalCode)}
        >
          Calcular frete
        </button>
      </div>
      {defaultProducts.map(product => (
        <div data-testid="product-item" className="Product-item Card-1" key={product.id}>
          <div className="Product-item-description">
            <p>{product.name}</p>
            <p>R$ {cartManager.formatValue(product.price)}</p>
          </div>
          <div className="Product-item-buttons">
            <button
              data-testid="product-item-add"
              className="Button Button-add"
              onClick={() => cartManager.addProduct(product)}
            >
              +
            </button>
            <p
              data-testid="product-item-quantity"
              className="Product-item-buttons-quantity"
            >
              {cartManager.getProductQuantity(product)}
            </p>
            <button 
              data-testid="product-item-remove"
              className="Button Button-remove"
              onClick={() => cartManager.removeProduct(product)} 
              disabled={cartManager.getProductQuantity(product) < 1 && true}
            >
              -
            </button>
          </div>
        </div>
      ))}
     
    </div>
  );
}

export default App;
