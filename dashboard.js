if (localStorage.getItem("adminLoggedIn") !== "true") {
  window.location.href = "admin.html";
}

const dummyData = [
  {
    fullName: "أحمد علي",
    phone: "0612345678",
    address: "الدار البيضاء",
    done: false,
  },
  { fullName: "ليلى مراد", phone: "0623456789", address: "الرباط", done: true },
];

function renderTable() {
  const table = document.getElementById("customer-table");
  table.innerHTML = "";
  dummyData.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.fullName}</td>
      <td>${item.phone}</td>
      <td>${item.address}</td>
      <td>
        <input type="checkbox" ${
          item.done ? "checked" : ""
        } onchange="toggleDone(${index})" />
      </td>
    `;
    table.appendChild(row);
  });
}

function toggleDone(index) {
  dummyData[index].done = !dummyData[index].done;
  renderTable();
}

renderTable();
function logout() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "admin.html";
}
