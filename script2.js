let cart = JSON.parse(localStorage.getItem('favouriteOrder')) || [];
let grandTotal = 0;

function updateCheckoutSummary() {
    const tableBody = document.querySelector("#checkoutCartTable tbody");
    tableBody.innerHTML = "";
    grandTotal = 0;

    cart.forEach(item => {
        grandTotal += item.total;
        tableBody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.qty}</td>
                <td>${item.price}</td>
                <td>${item.total}</td>
            </tr>
        `;
    });

    document.getElementById("checkoutGrandTotal").textContent = grandTotal;
}

function completePurchase() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const deliveryDate = document.getElementById("deliveryDate").value;
    const paymentMethod = document.getElementById("paymentMethod").value;

    if (name && email && address && phone && deliveryDate && paymentMethod) {
        // Save order information to localStorage (or send to backend)
        localStorage.removeItem("favouriteOrder"); // Clear favourites
        alert(`Thank you for your purchase, ${name}! Your order will be delivered by ${deliveryDate}.`);
        window.location.href = "thanks.html"; // Redirect to thanks page
    } else {
        alert("Please fill all the fields.");
    }
}

window.onload = updateCheckoutSummary;
