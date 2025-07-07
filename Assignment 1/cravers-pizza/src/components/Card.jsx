import React from 'react';

function Card({ name, price, image, onAddToCart }) {
  return (
    <div className="card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>${price.toFixed(2)}</p>
      <button onClick={() => onAddToCart(name, price)}>Add to Cart</button>
    </div>
  );
}

export default Card;
