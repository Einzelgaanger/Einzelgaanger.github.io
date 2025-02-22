document.addEventListener('DOMContentLoaded', () => {
  const addDisburserBtn = document.getElementById('add-disburser-btn');
  const popupOverlay = document.getElementById('popup-overlay');
  const cancelBtn = document.getElementById('cancel-btn');
  const addDisburserForm = document.getElementById('add-disburser-form');
  const disbursersTableBody = document.querySelector('#disbursers-table tbody');
  const scanFingerprintBtn = document.getElementById('scan-fingerprint-btn');
  const fingerprintInput = document.getElementById('fingerprint');

  // Fetch disbursers from localStorage
  let disbursers = JSON.parse(localStorage.getItem('disbursers')) || [];

  // Function to render the disbursers table (latest entries at the top)
  function renderDisbursers() {
    disbursersTableBody.innerHTML = ''; // Clear the table

    // Reverse the array to display latest entries first
    const reversedDisbursers = [...disbursers].reverse();

    reversedDisbursers.forEach((disburser, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${disburser.name}</td>
        <td>${disburser.email}</td>
        <td>${disburser.phone}</td>
        <td>${disburser.fingerprint || "N/A"}</td>
        <td>
          <button class="delete-btn" data-index="${disbursers.length - 1 - index}">
            <i class="fas fa-trash"></i> Delete
          </button>
        </td>
      `;
      disbursersTableBody.appendChild(row);
    });

    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        deleteDisburser(index);
      });
    });
  }

  // Function to delete a disburser
  function deleteDisburser(index) {
    disbursers.splice(index, 1); // Remove the disburser from the array
    localStorage.setItem('disbursers', JSON.stringify(disbursers)); // Update localStorage
    renderDisbursers(); // Re-render the table
  }

  // Show popup form
  addDisburserBtn.addEventListener('click', () => {
    popupOverlay.style.display = 'flex';
  });

  // Hide popup form
  cancelBtn.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
  });

  // Handle fingerprint scanning (mock implementation)
  if (scanFingerprintBtn) {
    scanFingerprintBtn.addEventListener('click', async () => {
      try {
        // Simulate fingerprint scanning
        const fingerprint = await simulateFingerprintScan();
        fingerprintInput.value = fingerprint; // Store fingerprint in hidden input
        alert("Fingerprint scanned successfully!");
      } catch (error) {
        console.error("Error scanning fingerprint:", error);
        alert("Failed to scan fingerprint. Please try again.");
      }
    });
  }

  // Handle form submission
  addDisburserForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const fingerprint = fingerprintInput.value;
    const notes = document.getElementById('notes').value;

    // Create disburser object
    const disburser = {
      name,
      email,
      phone,
      fingerprint,
      notes,
    };

    // Add disburser to the array
    disbursers.push(disburser);
    localStorage.setItem('disbursers', JSON.stringify(disbursers));

    // Clear the form
    addDisburserForm.reset();

    // Hide the popup
    popupOverlay.style.display = 'none';

    // Re-render the table
    renderDisbursers();
  });

  // Initial render
  renderDisbursers();
});

// Simulate fingerprint scanning
function simulateFingerprintScan() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fingerprint = `fingerprint-${Math.random().toString(36).substring(2, 9)}`;
      resolve(fingerprint);
    }, 1000); // Simulate a 1-second delay
  });
}