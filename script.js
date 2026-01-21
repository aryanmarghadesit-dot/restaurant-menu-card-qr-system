const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzR5wq7Bw1A-zYYTYMTkHhgRR-yDzFW09INfkW6Xy7TgMb3w1OkvTiGFQmqhsXueKmm/exec";

let orderList = [];

function filterItems(type, btn) {
  document.querySelectorAll(".filters button")
    .forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  document.querySelectorAll(".card").forEach(card => {
    card.style.display =
      type === "all" || card.classList.contains(type) ? "block" : "none";
  });
}

function addItem(item) {
  orderList.push(item);
  document.getElementById("orderItems").value = orderList.join(", ");
}

function openOrder() {
  document.getElementById("overlay").style.display = "block";
}

function closeOrder() {
  document.getElementById("overlay").style.display = "none";
}

function sendOrder() {
  const table = document.getElementById("tableNo").value;
  const items = orderList.join(", ");

  if (!table || orderList.length === 0) {
    alert("Please enter table number and select items");
    return;
  }

  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({ table, items })
  })
  .then(res => res.text())
  .then(data => {
    console.log("Server:", data);
    alert("✅ Order Sent Successfully!");

    orderList = [];
    document.getElementById("orderItems").value = "";
    document.getElementById("tableNo").value = "";
    closeOrder();
  })
  .catch(err => {
    console.error(err);
    alert("❌ Order failed");
  });
}
