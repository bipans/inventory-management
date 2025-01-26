// Array to store inventory data
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
const itemsPerPage = 5; // Number of items per page
let currentPage = 1;

// Get form and table elements
const form = document.getElementById('inventoryForm');
const purchaseForm = document.getElementById('purchaseForm');
const salesForm = document.getElementById('salesForm');
const tableBody = document.querySelector('#inventoryTable tbody');
const searchInput = document.getElementById('searchInput');
const pagination = document.getElementById('pagination');
const purchaseItemSelect = document.getElementById('purchaseItem');
const salesItemSelect = document.getElementById('salesItem');

// Function to save inventory to localStorage
function saveInventory() {
  localStorage.setItem('inventory', JSON.stringify(inventory));
}

// Function to populate item select dropdowns
function populateItemSelects() {
  purchaseItemSelect.innerHTML = '';
  salesItemSelect.innerHTML = '';
  inventory.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.name;
    purchaseItemSelect.appendChild(option.cloneNode(true));
    salesItemSelect.appendChild(option);
  });
}

// Function to validate form inputs
function validateForm(itemName, itemQuantity, itemPrice) {
  if (!itemName || itemName.trim() === '') {
    alert('Item Name is required.');
    return false;
  }
  if (isNaN(itemQuantity) || itemQuantity <= 0) {
    alert('Quantity must be a positive number.');
    return false;
  }
  if (isNaN(itemPrice) || itemPrice <= 0) {
    alert('Price must be a positive number.');
    return false;
  }
  return true;
}

// Function to add item to inventory
function addItem(event) {
  event.preventDefault();

  // Get form values
  const itemName = document.getElementById('itemName').value;
  const itemQuantity = parseInt(document.getElementById('itemQuantity').value);
  const itemPrice = parseFloat(document.getElementById('itemPrice').value);

  // Validate form inputs
  if (!validateForm(itemName, itemQuantity, itemPrice)) {
    return;
  }

  // Create new item object
  const newItem = {
    id: Date.now(), // Unique ID for each item
    name: itemName,
    quantity: itemQuantity,
    price: itemPrice,
    purchases: [],
    sales: []
  };

  // Add item to inventory array
  inventory.push(newItem);

  // Save to localStorage
  saveInventory();

  // Clear form
  form.reset();

  // Refresh table and dropdowns
  renderTable();
  populateItemSelects();
  renderPagination();
}

// Function to record purchase
function recordPurchase(event) {
  event.preventDefault();

  const itemId = parseInt(purchaseItemSelect.value);
  const quantity = parseInt(document.getElementById('purchaseQuantity').value);
  const date = document.getElementById('purchaseDate').value;

  const item = inventory.find(item => item.id === itemId);
  if (item) {
    item.purchases.push({ quantity, date });
    item.quantity += quantity;
    saveInventory();
    renderTable();
    purchaseForm.reset();
  }
}

// Function to record sale
function recordSale(event) {
  event.preventDefault();

  const itemId = parseInt(salesItemSelect.value);
  const quantity = parseInt(document.getElementById('salesQuantity').value);
  const date = document.getElementById('salesDate').value;

  const item = inventory.find(item => item.id === itemId);
  if (item) {
    if (item.quantity < quantity) {
      alert('Insufficient stock!');
      return;
    }
    item.sales.push({ quantity, date });
    item.quantity -= quantity;
    saveInventory();
    renderTable();
    salesForm.reset();
  }
}

// Function to render table
function renderTable(data = inventory, page = currentPage) {
  tableBody.innerHTML = ''; // Clear table

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = data.slice(start, end);

  paginatedData.forEach(item => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td class="actions">
        <button class="btn btn-warning btn-sm" onclick="editItem(${item.id})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteItem(${item.id})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Function to delete item
function deleteItem(id) {
  inventory = inventory.filter(item => item.id !== id);
  saveInventory();
  renderTable();
  populateItemSelects();
  renderPagination();
}

// Function to edit item
function editItem(id) {
  const item = inventory.find(item => item.id === id);

  // Fill form with item data
  document.getElementById('itemName').value = item.name;
  document.getElementById('itemQuantity').value = item.quantity;
  document.getElementById('itemPrice').value = item.price;

  // Remove item from inventory
  deleteItem(id);
}

// Function to search items
function searchItems() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredItems = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm)
  );
  renderTable(filteredItems);
  renderPagination(filteredItems);
}

// Function to generate stock report
function generateStockReport() {
  const headers = ['Item Name', 'Available Stock', 'Price'];
  const rows = inventory.map(item => [item.name, item.quantity, `$${item.price.toFixed(2)}`]);

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += headers.join(',') + '\n';
  rows.forEach(row => csvContent += row.join(',') + '\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'stock_report.csv');
  document.body.appendChild(link);
  link.click();
}

// Event Listeners
form.addEventListener('submit', addItem);
purchaseForm.addEventListener('submit', recordPurchase);
salesForm.addEventListener('submit', recordSale);
searchInput.addEventListener('input', searchItems);

// Initial render
populateItemSelects();
renderTable();
renderPagination();