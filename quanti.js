function addToCart(productName, quantity, price) {
    var cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    var existingProductIndex = cartData.findIndex(item => item.productName === productName);

    if (existingProductIndex !== -1) {
        cartData[existingProductIndex].quantity += quantity;
    } else {
        cartData.push({ productName, quantity, price });
    }

    localStorage.setItem('cartData', JSON.stringify(cartData));
    window.location.href = 'carrinho.html';
}

function updateCart() {
    var cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    var cartTable = document.getElementById('cartTable');
    var cartTotal = 0;
    cartTable.innerHTML = '<tr><th>Produto</th><th>Quantidade</th><th>Preço Unitário</th><th>Total</th><th>Remover</th></tr>';

    cartData.forEach((item, index) => {
        var newRow = cartTable.insertRow(-1);
        var productNameCell = newRow.insertCell(0);
        var quantityCell = newRow.insertCell(1);
        var priceCell = newRow.insertCell(2);
        var totalCell = newRow.insertCell(3);
        var removeCell = newRow.insertCell(4);

        var quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.dataset.productName = item.productName;
        quantityInput.onchange = function() {
            updateQuantity(this.dataset.productName, parseInt(this.value));
        };

        var removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = function() {
            removeProduct(item.productName);
        };

        productNameCell.innerText = item.productName;
        quantityCell.appendChild(quantityInput);
        priceCell.innerText = 'R$' + item.price.toFixed(2);
        totalCell.innerText = 'R$' + (item.quantity * item.price).toFixed(2);
        removeCell.appendChild(removeButton);

        cartTotal += item.quantity * item.price;
    });

    document.getElementById('cartTotal').innerText = 'Total: R$' + cartTotal.toFixed(2);
}

function updateQuantity(productName, quantity) {
    var cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    var productIndex = cartData.findIndex(item => item.productName === productName);

    if (productIndex !== -1) {
        if (quantity >= 1) {
            cartData[productIndex].quantity = quantity;
        } else {
            cartData.splice(productIndex, 1);  
        }
        localStorage.setItem('cartData', JSON.stringify(cartData));
        updateCart();  
    }
}

function removeProduct(productName) {
    var cartData = JSON.parse(localStorage.getItem('cartData'));
    cartData = cartData.filter(item => item.productName !== productName);
    localStorage.setItem('cartData', JSON.stringify(cartData));
    updateCart(); 
}
window.onload = function() {
    if (window.location.pathname.endsWith('carrinho.html')) {
        updateCart();
    }
};
