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

function saveInfo() {
  const fullName = document.getElementById("fullName").value;
  const phoneNumber = document.getElementById("phone").value;
  const addressInfo = document.getElementById("address").value;
  const chosenService = localStorage.getItem("chosenService") || "";

  const customers = JSON.parse(localStorage.getItem("customers") || "[]");
  customers.push({ fullName, phoneNumber, addressInfo, chosenService });
  localStorage.setItem("customers", JSON.stringify(customers));

  showThankYou(); // Show custom popup
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

function renderTable() {
  const table = document.getElementById("customer-table");
  if (!table) return;
  table.innerHTML = ""; // Clear previous rows

  const customers = JSON.parse(localStorage.getItem("customers") || "[]");
  customers.forEach((customer, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td data-label="الاسم الكامل">${customer.fullName}</td>
      <td data-label="رقم الهاتف">${customer.phoneNumber}</td>
      <td data-label="العنوان">${customer.addressInfo}</td>
      <td data-label="الخدمة">${customer.chosenService || ""}</td>
      <td data-label="تم الإنجاز؟"><input type="checkbox"></td>
      <td data-label="حذف">
        <button class="delete-btn" data-index="${index}" style="
          background-color: #e74c3c;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 6px 14px;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.2s;
        ">حذف</button>
      </td>
    `;
    table.appendChild(row);
  });

  // Add event listeners for delete buttons
  const deleteButtons = table.querySelectorAll(".delete-btn");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const idx = parseInt(this.getAttribute("data-index"));
      const customers = JSON.parse(localStorage.getItem("customers") || "[]");
      customers.splice(idx, 1);
      localStorage.setItem("customers", JSON.stringify(customers));
      renderTable();
    });
  });
}

function logout() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin.html";
}

document.addEventListener("DOMContentLoaded", renderTable);
