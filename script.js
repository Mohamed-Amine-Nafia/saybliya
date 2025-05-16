// Toggle navigation menu (used on all pages)
const menuBar = document.getElementById("menu-bar");
const navBar = document.getElementById("nav-bar");

if (menuBar && navBar) {
  menuBar.addEventListener("click", () => {
    menuBar.classList.toggle("active");
    navBar.classList.toggle("active");
  });
}

const wrapper = document.getElementById("wrapper");

if (wrapper) {
  const serviceChoice = wrapper.querySelectorAll("div");
  serviceChoice.forEach((serviceItem) => {
    serviceItem.addEventListener("click", () => {
      serviceChoice.forEach((item) => {
        item.classList.remove("checked");
        item.firstElementChild.classList.remove("active");
      });

      serviceItem.classList.add("checked");
      serviceItem.firstElementChild.classList.add("active");

      // Save chosen service to localStorage
      localStorage.setItem("chosenService", serviceItem.dataset.service || "");
    });
  });
}

/* THIS THE CUSTOMER INFORAMTIONS PRECESSED */

// Add customer
function saveInfo() {
  const fullName = document.getElementById("fullName").value;
  const phoneNumber = document.getElementById("phone").value;
  const addressInfo = document.getElementById("address").value;
  const chosenService = localStorage.getItem("chosenService") || "";

  const customer = {
    fullName,
    phoneNumber,
    addressInfo,
    chosenService,
    done: false,
  };

  let customers = JSON.parse(localStorage.getItem("customers") || "[]");
  customers.push(customer);
  localStorage.setItem("customers", JSON.stringify(customers));

  showThankYou();
  document.getElementById("customer-form").reset();
  localStorage.removeItem("chosenService");
}

// Attach saveInfo to your form's submit event
const form = document.getElementById("customer-form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    saveInfo();
  });
}

// Get customers for dashboard
function renderTable() {
  const table = document.getElementById("customer-table");
  if (!table) return;
  table.innerHTML = "";

  let customers = JSON.parse(localStorage.getItem("customers") || "[]");
  customers.forEach((customer, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td data-label="الاسم الكامل">${customer.fullName}</td>
      <td data-label="رقم الهاتف">${customer.phoneNumber}</td>
      <td data-label="العنوان">${customer.addressInfo}</td>
      <td data-label="الخدمة">${customer.chosenService || ""}</td>
      <td data-label="تم الإنجاز؟">
        <input type="checkbox" class="done-checkbox" data-index="${index}" ${
      customer.done ? "checked" : ""
    }>
      </td>
      <td data-label="حذف">
        <button class="delete-btn" data-index="${index}">حذف</button>
      </td>
    `;
    table.appendChild(row);
  });

  // Delete logic
  table.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      customers.splice(index, 1);
      localStorage.setItem("customers", JSON.stringify(customers));
      renderTable();
    });
  });

  // Mission done logic
  table.querySelectorAll(".done-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const index = this.getAttribute("data-index");
      customers[index].done = this.checked;
      localStorage.setItem("customers", JSON.stringify(customers));
      // Optionally re-render table
      // renderTable();
    });
  });
}

function logout() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin.html";
}

document.addEventListener("DOMContentLoaded", renderTable);
