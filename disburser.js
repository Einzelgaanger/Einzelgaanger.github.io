document.addEventListener('DOMContentLoaded', () => {
  // Simulate biometric verification and redirect to receipt verification page
  const verifyButton = document.getElementById('verify-biometric');
  if (verifyButton) {
      verifyButton.addEventListener('click', async () => {
          await simulateLoading('Biometric verification');
          window.location.href = "receipt-verification.html"; // Redirect after verification
      });
  }

  // Simulate receipt generation and redirect to receipt verification page
  const generateReceiptButton = document.getElementById('generate-receipt');
  if (generateReceiptButton) {
      generateReceiptButton.addEventListener('click', async () => {
          const timeWindowValid = checkTimeWindow(); // Check if within allowed time window
          if (!timeWindowValid) {
              alert('Receipt generation is only allowed within the specified time window.');
              return;
          }

          await simulateLoading('Generating receipt');
          window.location.href = "receipt-verification.html"; // Redirect after receipt generation
      });
  }

  // Handle beneficiary verification and redirect to receipt verification page
  const verifyBeneficiaryButton = document.getElementById('verify-btn');
  if (verifyBeneficiaryButton) {
      verifyBeneficiaryButton.addEventListener('click', async (event) => {
          event.preventDefault(); // Prevent form submission (if needed)
          await simulateLoading('Verifying beneficiary');
          window.location.href = "receipt-verification.html"; // Redirect after verification
      });
  }

  // Handle fund allocation and redirect to beneficiary verification page
  const allocateFundsButton = document.getElementById('allocate-funds-btn');
  if (allocateFundsButton) {
      allocateFundsButton.addEventListener('click', async () => {
          await simulateLoading('Allocating funds');
          window.location.href = "beneficiary-verification.html"; // Redirect to beneficiary verification page
      });
  }

  // Handle beneficiary registration and redirect to register-beneficiary.html
  const registerBeneficiaryButton = document.getElementById('register-beneficiary-btn');
  if (registerBeneficiaryButton) {
      registerBeneficiaryButton.addEventListener('click', async () => {
          await simulateLoading('Registering beneficiary');
          window.location.href = "register-beneficiary.html"; // Redirect after clicking the button
      });
  }

  // Check if the current time is within the allowed window (mock logic)
  function checkTimeWindow() {
      const now = new Date();
      const startTime = new Date();
      startTime.setHours(9, 0, 0); // 9:00 AM
      const endTime = new Date();
      endTime.setHours(14, 0, 0); // 2:00 PM

      return now >= startTime && now <= endTime;
  }

  // Populate the dropdown with goods from localStorage
  const resourceTypeSelect = document.getElementById('resource-type');
  const receiptForm = document.getElementById('receipt-form');
  const goods = JSON.parse(localStorage.getItem('goods')) || [];

  function populateResourceDropdown() {
      resourceTypeSelect.innerHTML = ''; // Clear existing options

      goods.forEach((good) => {
          const option = document.createElement('option');
          option.value = good.name;
          option.textContent = `${good.name} (Quantity/Amount: ${good.quantity})`;
          resourceTypeSelect.appendChild(option);
      });
  }

  // Handle receipt form submission
  if (receiptForm) {
      receiptForm.addEventListener('submit', (event) => {
          event.preventDefault();

          // Get form data
          const beneficiaryName = document.getElementById('beneficiary-name').value;
          const resourceType = document.getElementById('resource-type').value;
          const quantity = document.getElementById('quantity').value;

          // Create receipt object
          const receipt = {
              beneficiaryName,
              resourceType,
              quantity,
              timestamp: new Date().toLocaleString(),
          };

          // Save receipt to localStorage (or send to backend)
          saveReceipt(receipt);

          // Show success message
          alert('Receipt generated successfully!');

          // Redirect to another page (optional)
          window.location.href = 'disburser.html';
      });
  }

  // Function to save receipt to localStorage
  function saveReceipt(receipt) {
      let receipts = JSON.parse(localStorage.getItem('receipts')) || [];
      receipts.push(receipt);
      localStorage.setItem('receipts', JSON.stringify(receipts));
  }

  // Initial population of the dropdown
  populateResourceDropdown();
});

// Simulate a loading state
function simulateLoading(action, delay = 1000) {
  console.log(`Simulating ${action}...`);
  return new Promise((resolve) => {
      setTimeout(() => {
          console.log(`${action} completed.`);
          resolve();
      }, delay);
  });
}