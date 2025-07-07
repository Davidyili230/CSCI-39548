import React from 'react';
import Slider from '../components/Slider'; // We'll move slider functionality to this component

const Home = () => {
  return (
    <>
      <main>
        <h1 id="restaurantName">Craver's Pizza</h1>
        <p id="restaurantDescription">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam cum ducimus, quia esse optio necessitatibus expedita quibusdam placeat minus saepe obcaecati maxime animi beatae eius officiis facere quasi molestias. Natus?
        </p>
        <button className="order-btn" id="index-order-btn">
          <a href="/menu">Order Now</a>
        </button>

        <div className="slider-container">
          <Slider />
        </div>
      </main>
    </>
  );
};

export default Home;
