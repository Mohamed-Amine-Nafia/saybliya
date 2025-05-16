if (localStorage.getItem("adminLoggedIn") !== "true") {
  window.location.href = "admin.html";
}

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

renderTable();

function logout() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin.html";
}
