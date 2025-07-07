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

    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

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
      <strong>${item.name}</strong> - $${item.price.toFixed(2)} x 
      <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="qty-input" />
      = $${(item.price * item.quantity).toFixed(2)}
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartItems.appendChild(div);
    total += item.price * item.quantity;
  });

  totalPriceEl.textContent = total.toFixed(2);

  // Listen for quantity changes
  document.querySelectorAll(".qty-input").forEach(input => {
    input.addEventListener("change", (e) => {
      const i = e.target.dataset.index;
      cart[i].quantity = Math.max(1, parseInt(e.target.value));
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart(); // Refresh cart
    });
  });
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
