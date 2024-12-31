const medicines = {
    analgesics: [
        { name: "Paracetamol", price: 20, image: "./1.jpg" },
        { name: "Ibuprofen", price: 30, image: "./2.jpg" },
        { name: "Aspirin", price: 25, image: "./3.jpg" },
        { name: "Diclofenac", price: 35, image: "./4.jpg" },
        { name: "Naproxen", price: 40, image: "./5.jpg" },
        { name: "Ketorolac", price: 50, image: "./6.jpg" },
    ],
    antibiotics: [
        { name: "Amoxicillin", price: 50, image: "./7.jpg" },
        { name: "Ciprofloxacin", price: 60, image: "./8.jpg" },
        { name: "Doxycycline", price: 70, image: "./9.jpg" },
        { name: "Azithromycin", price: 80, image: "./10.jpg" },
        { name: "Metronidazole", price: 90, image: "./11.jpg" },
        { name: "Cephalexin", price: 100, image: "./12.jpg" },
    ],
    antidepressants: [
        { name: "Fluoxetine", price: 120, image: "12.jpg" },
        { name: "Sertraline", price: 130, image: "13.jpg" },
        { name: "Amitriptyline", price: 140, image: "14.jpg" },
        { name: "Duloxetine", price: 150, image: "15.jpg" },
        { name: "Escitalopram", price: 160, image: "16.jpg" },
        { name: "Venlafaxine", price: 170, image: "17.jpg" },
    ],
    antihistamines: [
        { name: "Loratadine", price: 25, image: "18.jpg" },
        { name: "Cetirizine", price: 30, image: "19.jpg" },
        { name: "Diphenhydramine", price: 20, image: "20.jpg" },
        { name: "Chlorpheniramine", price: 15, image: "22.jpg" },
    ],
    antihypertensives: [
        { name: "Amlodipine", price: 90, image: "23.jpg" },
        { name: "Losartan", price: 100, image: "24.jpg" },
        { name: "Enalapril", price: 110, image: "25.jpg" },
        { name: "Ramipril", price: 120, image: "26.jpg" },
        { name: "Hydrochlorothiazide", price: 130, image: "27.jpg" },
        { name: "Valsartan", price: 140, image: "28.jpg" },
    ],
};

let cart = [];

function loadMedicines() {
    for (let category in medicines) {
        const container = document.getElementById(category);
        medicines[category].forEach((med) => {
            const medDiv = document.createElement("div");
            medDiv.classList.add("medicine");
            medDiv.innerHTML = `
                <img src="${med.image}" alt="${med.name}" style="width: 230px; height: 150px;">
                <h4>${med.name}</h4>
                <p>Price: ${med.price} LKR</p>
                <input type="number" min="0" placeholder="Qty" id="${category}-${med.name}" />
                <button onclick="addToCart('${category}', '${med.name}', ${med.price})">Add</button>
            `;
            container.appendChild(medDiv);
        });
    }
}

function addToCart(category, name, price) {
    const qty = document.getElementById(`${category}-${name}`).value;
    if (!qty || qty <= 0) {
        alert("Please enter a valid quantity!");
        return;
    }
    const total = qty * price;
    cart.push({ category, name, qty, price, total });
    updateCartTable();
}

function updateCartTable() {
    const tableBody = document.querySelector("#cartTable tbody");
    tableBody.innerHTML = "";
    let grandTotal = 0;
    cart.forEach((item, index) => {
        grandTotal += item.total;
        tableBody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.qty}</td>
                <td>${item.price}</td>
                <td>${item.total}</td>
                <td><button onclick="deleteFromCart(${index})">Delete</button></td>
            </tr>
        `;
    });
    document.getElementById("grandTotal").textContent = grandTotal;
}

function deleteFromCart(index) {
    cart.splice(index, 1);
    updateCartTable();
}

function saveToFavourites() {
    localStorage.setItem("favouriteOrder", JSON.stringify(cart));
    alert("Order saved to favourites!");
}

function applyFavourites() {
    const favouriteOrder = JSON.parse(localStorage.getItem("favouriteOrder"));
    if (!favouriteOrder) {
        alert("No favourites found!");
        return;
    }
    favouriteOrder.forEach((item) => {
        cart.push(item);
    });
    updateCartTable();
    alert("Favourites applied!");
}

function proceedToPayment() {
    localStorage.setItem('favouriteOrder', JSON.stringify(cart));
    window.location.href = 'checkout.html';
}

window.onload = loadMedicines;
