const ADMIN_EMAIL = "aminenafia05@gmail.com";
const ADMIN_PASSWORD = "123456";

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("error-message");

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem("adminLoggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    errorMsg.textContent = "بيانات الدخول غير صحيحة";
  }
}
