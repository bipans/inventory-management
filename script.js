document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search').addEventListener('input', function(event) {
        const query = event.target.value.toLowerCase();
        const report = document.getElementById('report');
        report.innerHTML = ''; // Clear previous results

        // Assuming you have an array of inventory items
        const inventoryItems = [
            // Example items
            { productName: 'Product 1', status: 'Delivered', doa: '2023-10-01' },
            { productName: 'Product 2', status: 'In-Transit', doa: '2023-10-05' },
            // ...other items
        ];

        const filteredItems = inventoryItems.filter(item => 
            item.productName.toLowerCase().includes(query) ||
            item.status.toLowerCase().includes(query) ||
            item.doa.includes(query)
        );

        filteredItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'card mb-2';
            itemElement.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${item.productName}</h5>
                    <p class="card-text">Status: ${item.status}</p>
                    <p class="card-text">Date of Arrival: ${item.doa}</p>
                </div>
            `;
            report.appendChild(itemElement);
        });
    });

    document.getElementById('searchButton').addEventListener('click', function() {
        const query = document.getElementById('search').value.toLowerCase();
        const report = document.getElementById('report');
        report.innerHTML = ''; // Clear previous results

        // Assuming you have an array of inventory items
        const inventoryItems = [
            // Example items
            { productName: 'Product 1', status: 'Delivered', doa: '2023-10-01' },
            { productName: 'Product 2', status: 'In-Transit', doa: '2023-10-05' },
            // ...other items
        ];

        const filteredItems = inventoryItems.filter(item => 
            item.productName.toLowerCase().includes(query) ||
            item.status.toLowerCase().includes(query) ||
            item.doa.includes(query)
        );

        filteredItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'card mb-2';
            itemElement.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${item.productName}</h5>
                    <p class="card-text">Status: ${item.status}</p>
                    <p class="card-text">Date of Arrival: ${item.doa}</p>
                </div>
            `;
            report.appendChild(itemElement);
        });
    });

    document.getElementById('generateReportButton').addEventListener('click', function() {
        const report = document.getElementById('report');
        report.innerHTML = ''; // Clear previous results

        // Assuming you have an array of inventory items
        const inventoryItems = [
            // Example items
            { productName: 'Product 1', status: 'Delivered', doa: '2023-10-01' },
            { productName: 'Product 2', status: 'In-Transit', doa: '2023-10-05' },
            // ...other items
        ];

        inventoryItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'card mb-2';
            itemElement.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${item.productName}</h5>
                    <p class="card-text">Status: ${item.status}</p>
                    <p class="card-text">Date of Arrival: ${item.doa}</p>
                </div>
            `;
            report.appendChild(itemElement);
        });
    });
});
