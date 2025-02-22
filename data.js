document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#beneficiary-table tbody');

  // Fetch beneficiary data from localStorage
  let beneficiaries = JSON.parse(localStorage.getItem('beneficiaries')) || [];

  // Function to render the table (latest entries at the top)
  function renderTable() {
    tableBody.innerHTML = ''; // Clear the table

    // Reverse the array to display latest entries first
    const reversedBeneficiaries = [...beneficiaries].reverse();

    reversedBeneficiaries.forEach((beneficiary, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${beneficiary.name}</td>
        <td>${beneficiary.age}</td>
        <td>${beneficiary.uniqueNotes}</td>
        <td>${beneficiary.time}</td>
        <td>${beneficiary.location}</td>
        <td>
          <button class="delete-btn" data-index="${beneficiaries.length - 1 - index}">
            <i class="fas fa-trash"></i> Delete
          </button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        deleteBeneficiary(index);
      });
    });
  }

  // Redirect to funds-allocated.html
  const fundsAllocatedBtn = document.getElementById('funds-allocated-btn');
  if (fundsAllocatedBtn) {
    fundsAllocatedBtn.addEventListener('click', () => {
      window.location.href = "funds-allocated.html";
    });
  }

  // Function to delete a beneficiary
  function deleteBeneficiary(index) {
    beneficiaries.splice(index, 1); // Remove the beneficiary from the array
    localStorage.setItem('beneficiaries', JSON.stringify(beneficiaries)); // Update localStorage
    renderTable(); // Re-render the table
  }

  // Initial render
  renderTable();
});