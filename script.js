const p1Dec = document.querySelector(".p1-dec");
const p2Dec = document.querySelector(".p2-dec");
const p3Dec = document.querySelector(".p3-dec");
const p1Inc = document.querySelector(".p1-inc");
const p2Inc = document.querySelector(".p2-inc");
const p3Inc = document.querySelector(".p3-inc");
const number1 = document.querySelector(".number1");
const number2 = document.querySelector(".number2");
const number3 = document.querySelector(".number3");
const subCart = document.querySelector(".sub-cart");
const noItem = document.querySelector(".no-item");
const total = document.querySelector(".total-price");
const productsAdded = {}; // Keep track of added products

// Initial total price is 0
let totalPrice = 0;

// Function to update the total price display
function updateTotalPrice() {
    total.textContent = totalPrice <= 0 ? "-" : totalPrice;
}

// Function to handle incrementing a product
function increment(number, pro, price) {
    noItem.style.display = "none";
    ++number.innerHTML;

    // Update the total price
    totalPrice += parseInt(price);
    updateTotalPrice();

    if (!productsAdded[pro]) {
        // If product hasn't been added, create a new cart product
        createCartProduct(number, pro, price);
        productsAdded[pro] = true; // Mark product as added
    } else {
        // If product has been added, increment its quantity
        const cartQuantity = document.querySelector(`.cart-product[data-product="${pro}"] .cart-quantity`);
        cartQuantity.innerHTML = parseInt(cartQuantity.innerHTML) + 1 + " ";
    }
}

// Function to handle creating a cart product
function createCartProduct(number, pro, price) {
    const cartProduct = document.createElement("div");
    cartProduct.classList.add("cart-product");
    cartProduct.setAttribute("data-product", pro);

    const productName = document.createElement("p");
    productName.innerHTML = pro;
    cartProduct.appendChild(productName);

    const quantityAndPrice = document.createElement("p");
    const cartQuantity = document.createElement("span");
    cartQuantity.classList.add("cart-quantity"); // Add cart-quantity class
    cartQuantity.innerHTML = number.innerHTML + " ";
    const multiply = document.createTextNode("x ");
    const priceSpan = document.createElement("span");
    priceSpan.innerHTML = price;
    quantityAndPrice.appendChild(cartQuantity);
    quantityAndPrice.appendChild(multiply);
    quantityAndPrice.appendChild(priceSpan);

    cartProduct.appendChild(quantityAndPrice);

    subCart.appendChild(cartProduct);
}

// Function to handle decrementing a product
function decrement(number, pro, price) {
    const cartProduct = document.querySelector(`.cart-product[data-product="${pro}"]`);
    const cartQuantity = cartProduct.querySelector(".cart-quantity");
    const currentQuantity = parseInt(cartQuantity.innerHTML);

    --number.innerHTML;

    if (currentQuantity > 0) {
        cartQuantity.innerHTML = currentQuantity - 1 + " ";

        // Update the total price
        totalPrice -= parseInt(price);
        updateTotalPrice();

        if (currentQuantity === 1) {
            // If quantity reaches 0, remove the cart product
            cartProduct.remove();
            productsAdded[pro] = false; // Mark product as not added
        }
    }

    let anyProductAdded = Object.values(productsAdded).some(added => added);
    if (!anyProductAdded) {
        noItem.style.display = "block";
    }
}

p1Inc.addEventListener("click", () => {
    increment(number1, "Product-1", "100");
});

p2Inc.addEventListener("click", () => {
    increment(number2, "Product-2", "200");
});

p3Inc.addEventListener("click", () => {
    increment(number3, "Product-3", "300");
});

p1Dec.addEventListener("click", () => {
    decrement(number1, "Product-1", "100");
});

p2Dec.addEventListener("click", () => {
    decrement(number2, "Product-2", "200");
});

p3Dec.addEventListener("click", () => {
    decrement(number3, "Product-3", "300");
});
