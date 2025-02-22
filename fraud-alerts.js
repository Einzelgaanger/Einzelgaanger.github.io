document.addEventListener('DOMContentLoaded', () => {
  // Fetch fraud entries from localStorage
  const fraudEntries = JSON.parse(localStorage.getItem('fraudEntries')) || [];

  // Function to update the fraud alerts table (latest entries at the top)
  function updateFraudTable() {
    const tableBody = document.querySelector("#fraud-alerts-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    // Reverse the array to display latest entries first
    const reversedFraudEntries = [...fraudEntries].reverse();

    reversedFraudEntries.forEach((entry) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.resourceType}</td>
        <td>${entry.quantity}</td>
        <td>${entry.time}</td>
        <td>${entry.location}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Initial render of the fraud table
  updateFraudTable();
});