document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const cartIcon = document.querySelector(".cart-icon");
    const closeSidebar = document.querySelector(".sidebar-close");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartTotalElement = document.querySelector(".cart-total");
    const cartCountElement = document.querySelector(".cart-icon span");
    const searchBox = document.querySelector(".search--box input");
    const menuItems = document.querySelectorAll(".menu--item");
    const cards = document.querySelectorAll(".card");
    const searchInput = document.querySelector('.search--box input');
    const removeIcon = document.querySelector('.remove-icon');

    let cart = [];

    cartIcon.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });

    closeSidebar.addEventListener("click", () => {
        sidebar.classList.remove("open");
    });

    addToCartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".card");
            const title = card.querySelector(".card--title").textContent;
            const price = parseFloat(card.querySelector(".price").textContent.replace("$", ""));

            const itemInCart = cart.find(item => item.title === title);

            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                cart.push({ title, price, quantity: 1 });
            }

            updateCart();
        });
    });

    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            const cartItem = document.createElement("div");
            cartItem.classList.add("individual-cart-item");
            cartItem.innerHTML = `
                <div class="cart-item-title">${item.title} x ${item.quantity}</div>
                <div class="cart-item-price">$${itemTotal.toFixed(2)}</div>
                <i class="fa-solid fa-x remove-item" data-index="${index}"></i>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotalElement.textContent = `$${total.toFixed(2)}`;
        cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

        // Add event listeners to the remove buttons
        const removeButtons = document.querySelectorAll(".remove-item");
        removeButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const itemIndex = e.target.getAttribute("data-index");
                cart.splice(itemIndex, 1); // Remove the item from the cart array
                updateCart(); // Update the cart display
            });
        });
    }

    // Search functionality
    searchBox.addEventListener("input", () => {
        const query = searchBox.value.toLowerCase();

        menuItems.forEach(item => {
            const itemName = item.querySelector("h5").textContent.toLowerCase();
            if (itemName.includes(query)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });

        cards.forEach(card => {
            const cardName = card.querySelector(".card--title").textContent.toLowerCase();
            if (cardName.includes(query)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    searchInput.addEventListener('input', function () {
        if (searchInput.value.length > 0) {
            removeIcon.style.display = 'block';
        } else {
            removeIcon.style.display = 'none';
        }
    });

    removeIcon.addEventListener('click', function () {
        searchInput.value = '';
        removeIcon.style.display = 'none';
        searchInput.focus(); // Optional: focus the input field again

        // Reset the display of all menu items and cards
        menuItems.forEach(item => {
            item.style.display = "block";
        });

        cards.forEach(card => {
            card.style.display = "block";
        });
    });
});
