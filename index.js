// Contact Popup Toggle
function toggleContactPopup() {
  const contactPopup = document.getElementById('contactPopup');
  contactPopup.classList.toggle('active');
}

// Close Contact Popup when clicking outside
document.addEventListener('click', (event) => {
  const contactPopup = document.getElementById('contactPopup');
  const contactForm = document.querySelector('.contact-form');
  if (contactPopup.classList.contains('active') && !contactForm.contains(event.target) && !event.target.matches('.cta-btn')) {
    contactPopup.classList.remove('active');
  }
});

// Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  fetch('https://formspree.io/f/mvojnqkj', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      alert('Message sent successfully!');
      contactForm.reset();
      toggleContactPopup();
    } else {
      alert('Oops! Something went wrong.');
    }
  });
});