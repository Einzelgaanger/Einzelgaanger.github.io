document.addEventListener('DOMContentLoaded', () => {
  const verificationForm = document.getElementById('verification-form');
  const nameInput = document.getElementById('name');
  const verifyBtn = document.getElementById('verify-btn');

  // Fetch beneficiary data from localStorage
  const beneficiaries = JSON.parse(localStorage.getItem('beneficiaries')) || [];

  // Function to check if the name exists in the beneficiaries array
  function isNameValid(name) {
    return beneficiaries.some(beneficiary => beneficiary.name.toLowerCase() === name.toLowerCase());
  }

  // Enable/disable the Verify button based on name input
  nameInput.addEventListener('input', () => {
    const name = nameInput.value.trim();
    verifyBtn.disabled = !(name && isNameValid(name)); // Enable if name is valid, else disable
  });

  // Handle form submission
  verificationForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    const name = nameInput.value.trim();

    if (name) {
      if (isNameValid(name)) {
        alert("Beneficiary verified successfully! Proceeding...");
        // Redirect to the receipt generation page with the beneficiary name as a URL parameter
        window.location.href = `receipt-verification.html?name=${encodeURIComponent(name)}`;
      } else {
        // Display error message if beneficiary is not found
        alert("Beneficiary not found. Please check the name and try again.");
      }
    } else {
      alert("Please enter a beneficiary name.");
    }
  });

  // Disable the Verify button initially
  verifyBtn.disabled = true;
});