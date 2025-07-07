import React from 'react';
import Card from '../components/Card'; // Assumes you have a reusable Card component
import '../style.css'; // Adjust if using modular CSS

const pizzaItems = [
  {
    name: 'Basil Pizza',
    price: 12.99,
    image: '/card-item/basil.png',
  },
  {
    name: 'Hawaiian Pizza',
    price: 13.99,
    image: '/card-item/hawaiian.webp',
  },
  {
    name: 'Cheese Pizza',
    price: 11.99,
    image: '/card-item/cheese.png',
  },
  {
    name: 'Meat Lover Pizza',
    price: 14.99,
    image: '/card-item/meat.webp',
  },
  {
    name: 'Pepperoni Pizza',
    price: 13.49,
    image: '/card-item/pepperoni.png',
  },
  {
    name: 'Veggie Pizza',
    price: 12.49,
    image: '/card-item/veg.webp',
  },
];

function MenuPage() {
  const handleAddToCart = (name, price) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart`);
  };

  return (
    <main>
      <h1 style={{ textAlign: 'center', color: 'white' }}>Our Menu</h1>
      <div className="card-container">
        {pizzaItems.map((item, idx) => (
          <Card
            key={idx}
            name={item.name}
            price={item.price}
            image={item.image}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </main>
  );
}

export default MenuPage;
