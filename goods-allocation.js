document.addEventListener('DOMContentLoaded', () => {
  const addGoodsBtn = document.getElementById('add-goods-btn');
  const popupOverlay = document.getElementById('popup-overlay');
  const cancelBtn = document.getElementById('cancel-btn');
  const goodsForm = document.getElementById('goods-form');
  const goodsTableBody = document.querySelector('#goods-table tbody');
  const popupTitle = document.getElementById('popup-title');

  // Fetch goods from localStorage
  let goods = JSON.parse(localStorage.getItem('goods')) || [];

  // Function to render the goods table
  function renderGoods() {
    goodsTableBody.innerHTML = ''; // Clear the table
    goods.forEach((good, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${good.name}</td>
        <td>${good.unit}</td>
        <td>${good.quantity}</td>
        <td>
          <button class="edit-btn" data-index="${index}">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="delete-btn" data-index="${index}">
            <i class="fas fa-trash"></i> Delete
          </button>
        </td>
      `;
      goodsTableBody.appendChild(row);
    });

    // Add event listeners to edit and delete buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    editButtons.forEach(button => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        editGoods(index);
      });
    });

    deleteButtons.forEach(button => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        deleteGoods(index);
      });
    });
  }

  // Function to delete goods
  function deleteGoods(index) {
    goods.splice(index, 1); // Remove the goods from the array
    localStorage.setItem('goods', JSON.stringify(goods)); // Update localStorage
    renderGoods(); // Re-render the table
  }

  // Function to edit goods
  function editGoods(index) {
    const good = goods[index];
    document.getElementById('goods-name').value = good.name;
    document.getElementById('unit').value = good.unit;
    document.getElementById('quantity').value = good.quantity;
    popupTitle.textContent = 'Edit Goods';
    popupOverlay.style.display = 'flex';
    goodsForm.setAttribute('data-index', index);
  }

  // Show popup form
  addGoodsBtn.addEventListener('click', () => {
    goodsForm.reset();
    popupTitle.textContent = 'Add Goods';
    popupOverlay.style.display = 'flex';
    goodsForm.removeAttribute('data-index');
  });

  // Hide popup form
  cancelBtn.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
  });

  // Handle form submission
  goodsForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get form data
    const name = document.getElementById('goods-name').value;
    const unit = document.getElementById('unit').value;
    const quantity = document.getElementById('quantity').value;

    // Create goods object
    const good = {
      name,
      unit,
      quantity,
    };

    // Check if editing or adding
    const index = goodsForm.getAttribute('data-index');
    if (index !== null) {
      goods[index] = good; // Update existing goods
    } else {
      goods.push(good); // Add new goods
    }

    // Save to localStorage
    localStorage.setItem('goods', JSON.stringify(goods));

    // Hide the popup
    popupOverlay.style.display = 'none';

    // Re-render the table
    renderGoods();
  });

  // Initial render
  renderGoods();
});