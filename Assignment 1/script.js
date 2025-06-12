document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu toggle
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  // Slider code
  const slider = document.querySelector('.slider');
  const images = document.querySelectorAll('.slider img');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let currentIndex = 0;
  const imagesPerView = 4;

  function getImageWidth() {
    const img = images[0];
    const style = getComputedStyle(img);
    const margin = parseFloat(style.marginRight) || 0;
    const gap = parseFloat(getComputedStyle(slider).gap) || 0;
    return img.offsetWidth + gap;
  }

  function updateSlider() {
    const imageWidth = getImageWidth();
    slider.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
  }

  function nextSlide() {
    if (currentIndex < images.length - imagesPerView) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateSlider();
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = images.length - imagesPerView;
    }
    updateSlider();
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
  }

  let autoScroll = setInterval(nextSlide, 4000);

  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
      clearInterval(autoScroll);
    });
    sliderContainer.addEventListener('mouseleave', () => {
      autoScroll = setInterval(nextSlide, 3000);
    });
  }
});
