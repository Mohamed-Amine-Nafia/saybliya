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
async function saveInfo() {
  const fullName = document.getElementById("fullName").value;
  const phoneNumber = document.getElementById("phone").value;
  const addressInfo = document.getElementById("address").value;
  const chosenService = localStorage.getItem("chosenService") || "";

  await fetch("https://saybliya-production.up.railway.app/api/customers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, phoneNumber, addressInfo, chosenService }),
  });

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
async function renderTable() {
  const table = document.getElementById("customer-table");
  if (!table) return;
  table.innerHTML = "";

  const res = await fetch(
    "https://saybliya-production.up.railway.app/api/customers"
  );
  const customers = await res.json();
  customers.forEach((customer, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td data-label="الاسم الكامل">${customer.fullName}</td>
      <td data-label="رقم الهاتف">${customer.phoneNumber}</td>
      <td data-label="العنوان">${customer.addressInfo}</td>
      <td data-label="الخدمة">${customer.chosenService || ""}</td>
      <td data-label="تم الإنجاز؟">
        <input type="checkbox" class="done-checkbox" data-id="${
          customer._id
        }" ${customer.done ? "checked" : ""}>
      </td>
      <td data-label="حذف">
        <button class="delete-btn" data-id="${customer._id}">حذف</button>
      </td>
    `;
    table.appendChild(row);
  });

  // Delete logic
  table.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async function () {
      const id = this.getAttribute("data-id");
      await fetch(
        `https://saybliya-production.up.railway.app/api/customers/${id}`,
        { method: "DELETE" }
      );
      renderTable();
    });
  });

  // Mission done logic
  table.querySelectorAll(".done-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", async function () {
      const id = this.getAttribute("data-id");
      const done = this.checked;
      await fetch(
        `https://saybliya-production.up.railway.app/api/customers/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ done }),
        }
      );
      // Optionally re-render table to reflect changes
      // renderTable();
    });
  });
}

function logout() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin.html";
}

document.addEventListener("DOMContentLoaded", renderTable);
