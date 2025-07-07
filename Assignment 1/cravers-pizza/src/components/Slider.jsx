import React, { useState, useEffect, useRef } from "react";

const images = [
  { src: "/card-item/basil.png", alt: "Basil" },
  { src: "/card-item/hawaiian.webp", alt: "Hawaiian" },
  { src: "/card-item/cheese.png", alt: "Cheese" },
  { src: "/card-item/meat.webp", alt: "Meat Lover" },
  { src: "/card-item/pepperoni.png", alt: "Pepperoni" },
  { src: "/card-item/veg.webp", alt: "Veggie" },
];

const imagesPerView = 4;

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const autoScrollRef = useRef(null);

  // Calculate image width + gap
  const getImageWidth = () => {
    if (!sliderRef.current) return 0;
    const img = sliderRef.current.querySelector("img");
    if (!img) return 0;

    const style = window.getComputedStyle(img);
    const gap = parseFloat(window.getComputedStyle(sliderRef.current).gap) || 0;
    return img.offsetWidth + gap;
  };

  const updateSlider = () => {
    const imageWidth = getImageWidth();
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
    }
  };

  // Call updateSlider on currentIndex change and on window resize
  useEffect(() => {
    updateSlider();
  }, [currentIndex]);

  useEffect(() => {
    const handleResize = () => {
      updateSlider();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - imagesPerView ? prevIndex + 1 : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - imagesPerView
    );
  };

  // Auto scroll logic with pause on mouse enter/leave
  useEffect(() => {
    autoScrollRef.current = nextSlide;
  });

  useEffect(() => {
    function play() {
      autoScrollRef.current();
    }
    const interval = setInterval(play, 4000);

    const sliderContainer = sliderRef.current?.parentElement;

    if (!sliderContainer) return () => clearInterval(interval);

    const handleMouseEnter = () => clearInterval(interval);
    const handleMouseLeave = () => {
      setInterval(play, 3000);
    };

    sliderContainer.addEventListener("mouseenter", handleMouseEnter);
    sliderContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearInterval(interval);
      sliderContainer.removeEventListener("mouseenter", handleMouseEnter);
      sliderContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="slider-container" style={{ position: "relative", overflow: "hidden" }}>
      <button className="btn prev" aria-label="Previous Slide" onClick={prevSlide}>
        &#10094;
      </button>
      <div className="slider" ref={sliderRef} style={{ display: "flex", gap: "20px", transition: "transform 0.5s ease-in-out" }}>
        {images.map(({ src, alt }, i) => (
          <img
            key={i}
            src={src}
            alt={alt}
            style={{ flexShrink: 0, width: `calc((100% - 60px) / 4)`, borderRadius: "8px", objectFit: "cover" }}
          />
        ))}
      </div>
      <button className="btn next" aria-label="Next Slide" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
}
