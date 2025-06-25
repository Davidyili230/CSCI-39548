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

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart`);
  });
});

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)}
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartItems.appendChild(div);
    total += item.price;
  });

  totalPriceEl.textContent = total.toFixed(2);
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

document.getElementById("clear-cart").addEventListener("click", () => {
  localStorage.removeItem("cart");
  renderCart();
});

renderCart();
