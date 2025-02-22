document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');

  // Handle form submission
  if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent form submission

      // Get form data
      const name = document.getElementById('name').value;
      const age = document.getElementById('age').value;
      const uniqueNotes = document.getElementById('unique-notes').value;

      // Validate form data
      if (!name || !age || !uniqueNotes) {
        alert('Please fill in all fields.');
        return; // Stop execution if any field is empty
      }

      // Get current time
      const currentTime = new Date().toLocaleString();

      // Get current location
      let location = "Location not available";
      try {
        const position = await getLocation();
        location = `Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`;
      } catch (error) {
        console.error("Error fetching location:", error);
      }

      // Create beneficiary object
      const beneficiary = {
        name,
        age,
        uniqueNotes,
        time: currentTime,
        location,
      };

      // Save to localStorage (simulate backend storage)
      saveBeneficiary(beneficiary);

      // Show success message and wait for user to acknowledge
      alert("Beneficiary registered successfully!");

      // Redirect to admin page (or refresh) after user acknowledges the message
      window.location.href = "register-beneficiary.html";
    });
  }

  // Function to get current location
  function getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  }

  // Function to save beneficiary data
  function saveBeneficiary(beneficiary) {
    let beneficiaries = JSON.parse(localStorage.getItem('beneficiaries')) || [];
    beneficiaries.push(beneficiary);
    localStorage.setItem('beneficiaries', JSON.stringify(beneficiaries));
  }
});