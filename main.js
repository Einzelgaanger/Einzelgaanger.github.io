document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const roleToggle = document.getElementById('role-toggle');
    const disburserNameGroup = document.getElementById('disburser-name-group');
    const disburserNameInput = document.getElementById('disburser-name');
    const passkeyInput = document.getElementById('passkey');
    const passkeyError = document.getElementById('passkey-error');
  
    // Hardcoded passkeys
    const ADMIN_PASSKEY = "@Admin123#"; // Admin passkey
    const DISBURSER_PASSKEY = "@Disburser123#"; // Disburser passkey
  
    // Default role is Admin
    let currentRole = 'admin';
  
    // Show/hide Disburser Name field based on role selection
    roleToggle.addEventListener('change', function () {
      if (this.checked) {
        currentRole = 'disburser';
        disburserNameGroup.style.display = 'block';
        disburserNameInput.setAttribute('required', true);
      } else {
        currentRole = 'admin';
        disburserNameGroup.style.display = 'none';
        disburserNameInput.removeAttribute('required');
      }
    });
  
    // Handle form submission
    if (loginForm) {
      loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
  
        // Get passkey input
        const passkey = passkeyInput.value;
  
        // Validate passkey based on role
        let isPasskeyValid = false;
  
        if (currentRole === 'admin') {
          // Validate admin passkey
          isPasskeyValid = passkey === ADMIN_PASSKEY;
        } else if (currentRole === 'disburser') {
          // Validate disburser passkey
          isPasskeyValid = passkey === DISBURSER_PASSKEY;
        }
  
        // Show error if passkey is invalid
        if (!isPasskeyValid) {
          passkeyError.style.display = 'block'; // Show error message
          return; // Stop further execution
        } else {
          passkeyError.style.display = 'none'; // Hide error message
        }
  
        let redirectPage = '';
  
        // Validate login based on role
        if (currentRole === 'admin') {
          // Admin login logic
          redirectPage = 'admin.html';
        } else if (currentRole === 'disburser') {
          // Disburser login logic
          const disburserName = disburserNameInput.value;
          const disbursers = JSON.parse(localStorage.getItem('disbursers')) || [];
  
          // Check if disburser name exists
          const disburserExists = disbursers.some(
            (disburser) => disburser.name.toLowerCase() === disburserName.toLowerCase()
          );
  
          if (!disburserExists) {
            alert('Disburser name not found. Please check your name and try again.');
            return;
          }
  
          redirectPage = 'disburser.html';
        } else {
          alert('Invalid role selected.');
          return;
        }
  
        // Simulate loading and redirect
        simulateLoading(`Redirecting to ${currentRole} dashboard`).then(() => {
          window.location.href = redirectPage; // Redirect after loading
        });
      });
    }
  
    // Simulate a loading state for any action
    function simulateLoading(action, delay = 1000) {
      console.log(`Simulating ${action}...`);
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`${action} completed.`);
          resolve();
        }, delay);
      });
    }
  });