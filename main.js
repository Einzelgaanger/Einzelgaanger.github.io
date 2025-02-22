document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const roleSelection = document.querySelectorAll('input[name="role"]');
  const disburserNameGroup = document.getElementById('disburser-name-group');
  const disburserNameInput = document.getElementById('disburser-name');
  const passkeyInput = document.getElementById('passkey');
  const passkeyError = document.getElementById('passkey-error');

  // Hardcoded passkeys
  const ADMIN_PASSKEY = "@Admin123#"; // Admin passkey
  const DISBURSER_PASSKEY = "@Disburser123#"; // Disburser passkey

  // Show/hide Disburser Name field based on role selection
  roleSelection.forEach((role) => {
      role.addEventListener('change', () => {
          if (role.value === 'disburser') {
              disburserNameGroup.style.display = 'block';
              disburserNameInput.setAttribute('required', true);
          } else {
              disburserNameGroup.style.display = 'none';
              disburserNameInput.removeAttribute('required');
          }
      });
  });

  // Handle form submission
  if (loginForm) {
      loginForm.addEventListener('submit', function (event) {
          event.preventDefault(); // Prevent form submission

          // Get selected role
          const selectedRole = document.querySelector('input[name="role"]:checked');
          if (!selectedRole) {
              alert("Please select a role before logging in.");
              return;
          }

          // Get passkey input
          const passkey = passkeyInput.value;

          // Validate passkey based on role
          const role = selectedRole.value;
          let isPasskeyValid = false;

          if (role === 'admin') {
              // Validate admin passkey
              isPasskeyValid = passkey === ADMIN_PASSKEY;
          } else if (role === 'disburser') {
              // Validate disburser passkey
              isPasskeyValid = passkey === DISBURSER_PASSKEY;
          }

          // Show error if passkey is invalid
          if (!isPasskeyValid) {
              passkeyError.style.display = "block"; // Show error message
              return; // Stop further execution
          } else {
              passkeyError.style.display = "none"; // Hide error message
          }

          let redirectPage = "";

          // Validate login based on role
          if (role === 'admin') {
              // Admin login logic
              redirectPage = "admin.html";
          } else if (role === 'disburser') {
              // Disburser login logic
              const disburserName = disburserNameInput.value;
              const disbursers = JSON.parse(localStorage.getItem('disbursers')) || [];

              // Check if disburser name exists
              const disburserExists = disbursers.some(
                  (disburser) => disburser.name.toLowerCase() === disburserName.toLowerCase()
              );

              if (!disburserExists) {
                  alert("Disburser name not found. Please check your name and try again.");
                  return;
              }

              redirectPage = "disburser.html";
          } else {
              alert("Invalid role selected.");
              return;
          }

          // Simulate loading and redirect
          simulateLoading(`Redirecting to ${role} dashboard`).then(() => {
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