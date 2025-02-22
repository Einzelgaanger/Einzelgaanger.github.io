// Hardcoded credentials
const hardcodedUsers = [
  { username: "BizLens", password: "@BizLens123#" },
];

// Login form submission
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get input values
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Check if credentials match
  const user = hardcodedUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // Redirect to index.html
    window.location.href = "welcome.html";
  } else {
    // Show error message
    document.getElementById("error-message").style.display = "block";
  }
});