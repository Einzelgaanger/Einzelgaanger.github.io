// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Contact Popup Toggle
function toggleContactPopup() {
  const contactPopup = document.getElementById('contactPopup');
  contactPopup.classList.toggle('active');
}