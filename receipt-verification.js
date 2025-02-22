document.addEventListener('DOMContentLoaded', () => {
  const beneficiaryNameInput = document.getElementById('beneficiary-name');
  const resourceTypeSelect = document.getElementById('resource-type');
  const receiptForm = document.getElementById('receipt-form');

  // Get the beneficiary name from the URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const beneficiaryName = urlParams.get('name');

  // Pre-fill the beneficiary name input field
  if (beneficiaryName) {
    beneficiaryNameInput.value = decodeURIComponent(beneficiaryName);
    beneficiaryNameInput.readOnly = true; // Make the field read-only
  }

  // Fetch pre-registered goods from localStorage
  const goods = JSON.parse(localStorage.getItem('goods')) || [];

  // Populate the resource type dropdown with pre-registered goods
  function populateResourceTypes() {
    resourceTypeSelect.innerHTML = '<option value="" disabled selected>Select resource type</option>'; // Reset dropdown
    goods.forEach((good) => {
      // Ensure the good object has the required properties
      const unit = good.unit || ''; // Default to empty string if undefined
      const name = good.name || 'Unnamed Resource'; // Default name if undefined
      const quantity = good.quantity || 0; // Default to 0 if undefined

      const option = document.createElement('option');
      option.value = name; // Use the goods name as the value
      // Display unit quantity, unit, name, and remaining quantity
      option.textContent = `${unit} ${name} - ${quantity} Remaining`;
      resourceTypeSelect.appendChild(option);
    });
  }

  // Call the function to populate the dropdown
  populateResourceTypes();

  // Function to get the device's current location
  function getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            resolve(location);
          },
          (error) => {
            reject(`Error getting location: ${error.message}`);
          }
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }

  // Handle form submission
  receiptForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const beneficiaryName = beneficiaryNameInput.value;
    const resourceType = resourceTypeSelect.value;

    if (beneficiaryName && resourceType) {
      try {
        // Get the device's current location
        const location = await getLocation();
        const locationString = `Lat: ${location.latitude}, Long: ${location.longitude}`;

        // Find the selected good from the pre-registered goods
        const selectedGood = goods.find((good) => good.name === resourceType);

        if (selectedGood) {
          // Create a receipt object
          const receipt = {
            name: beneficiaryName,
            resourceType: `${selectedGood.unit} ${selectedGood.name}`, // Include unit quantity and unit
            quantity: 1, // Assuming 1 unit is allocated per receipt
            location: locationString, // Include location in the receipt
            time: new Date().toLocaleString(), // Add timestamp
          };

          // Fetch existing allocated funds data from localStorage
          let allocatedFunds = JSON.parse(localStorage.getItem('allocatedFunds')) || [];

          // Check for duplicate entries within 5 minutes
          const currentTime = new Date();
          const fiveMinutesAgo = new Date(currentTime.getTime() - 5 * 60000);

          const isDuplicate = allocatedFunds.some(
            (entry) =>
              entry.name === receipt.name &&
              new Date(entry.time) > fiveMinutesAgo
          );

          if (isDuplicate) {
            // Add the duplicate entry to fraudEntries in localStorage
            let fraudEntries = JSON.parse(localStorage.getItem('fraudEntries')) || [];
            fraudEntries.push(receipt);
            localStorage.setItem('fraudEntries', JSON.stringify(fraudEntries));

            // Show error message
            alert(`${beneficiaryName} has already received funds within the last 5 minutes. Receipt cannot be generated.`);
            return;
          }

          // Add the new receipt to the allocated funds array
          allocatedFunds.push(receipt);

          // Save the updated array back to localStorage
          localStorage.setItem('allocatedFunds', JSON.stringify(allocatedFunds));

          // Update the quantity of the selected good
          selectedGood.quantity -= 1; // Deduct 1 from the available quantity
          localStorage.setItem('goods', JSON.stringify(goods));

          // Show success message
          alert(`Receipt generated for ${beneficiaryName} for ${selectedGood.unit} ${selectedGood.name} at ${locationString}.`);

          // Redirect or perform further actions here
          window.location.href = "beneficiary-verification.html";
        } else {
          alert('Selected resource type not found in pre-registered goods.');
        }
      } catch (error) {
        alert(`Failed to generate receipt: ${error}`);
      }
    } else {
      alert('Please fill in all fields.');
    }
  });
});