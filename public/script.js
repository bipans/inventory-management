document.getElementById('data-entry-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch('/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Data submitted successfully');
        this.reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('box').addEventListener('input', function() {
    const piecesPerBox = document.getElementById('piecesPerBox').value;
    const box = this.value;
    document.getElementById('total').value = piecesPerBox * box;
});

document.getElementById('search').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    fetch('/search?query=' + query)
    .then(response => response.json())
    .then(data => {
        const reportDiv = document.getElementById('report');
        reportDiv.innerHTML = '';
        if (data.length === 0) {
            reportDiv.textContent = 'No results found';
        } else {
            data.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.textContent = JSON.stringify(item);
                reportDiv.appendChild(itemDiv);
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('search').addEventListener('click', function() {
    this.select();
});

document.getElementById('report').addEventListener('click', function(event) {
    if (event.target.tagName === 'DIV') {
        alert('Item clicked: ' + event.target.textContent);
    }
});
