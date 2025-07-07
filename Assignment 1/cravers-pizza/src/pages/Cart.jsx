import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

  const updateQuantity = (index, quantity) => {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, quantity);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Sync localStorage changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <h1><center>Your Cart</center></h1>
      <div id="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index}>
              <strong>{item.name}</strong> - ${item.price.toFixed(2)} x{' '}
              <input
                type="number"
                className="qty-input"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
              />{' '}
              = ${(item.price * item.quantity).toFixed(2)}
              <button onClick={() => removeItem(index)}>Remove</button>
            </div>
          ))
        )}
      </div>
      <p>
        <center>
          Total: $<span id="total-price">{totalPrice.toFixed(2)}</span>
        </center>
      </p>
      <button id="clear-cart" onClick={clearCart}>
        Clear Cart
      </button>
    </>
  );
};

export default Cart;
