document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#funds-table tbody');

  // Fetch allocated funds data from localStorage
  let allocatedFunds = JSON.parse(localStorage.getItem('allocatedFunds')) || [];

  // Track detected fraud entries
  const fraudEntries = JSON.parse(localStorage.getItem('fraudEntries')) || [];

  // Function to render the table (latest entries at the top)
  function renderTable() {
    tableBody.innerHTML = ''; // Clear the table

    // Reverse the array to display latest entries first
    const reversedAllocatedFunds = [...allocatedFunds].reverse();

    reversedAllocatedFunds.forEach((fund) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${fund.name}</td>
        <td>${fund.resourceType}</td>
        <td>${fund.location}</td> <!-- Display location -->
        <td>${fund.time}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Function to detect duplicate entries within 5 minutes
  function detectFraud(newEntry) {
    const currentTime = new Date();
    const fiveMinutesAgo = new Date(currentTime.getTime() - 5 * 60000);

    const isDuplicate = allocatedFunds.some(
      (entry) =>
        entry.name === newEntry.name &&
        new Date(entry.time) > fiveMinutesAgo
    );

    if (isDuplicate) {
      fraudEntries.push(newEntry);
      localStorage.setItem('fraudEntries', JSON.stringify(fraudEntries));
      updateFraudTable();
    }
  }

  // Function to update the fraud alerts table (latest entries at the top)
  function updateFraudTable() {
    const fraudTableBody = document.querySelector("#fraud-alerts-table tbody");
    if (fraudTableBody) {
      fraudTableBody.innerHTML = ""; // Clear existing rows

      // Reverse the array to display latest entries first
      const reversedFraudEntries = [...fraudEntries].reverse();

      reversedFraudEntries.forEach((entry) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${entry.name}</td>
          <td>${entry.resourceType}</td>
          <td>${entry.amount}</td>
          <td>${entry.time}</td>
          <td>${entry.location}</td>
        `;
        fraudTableBody.appendChild(row);
      });
    }
  }

  // Initial render
  renderTable();
});