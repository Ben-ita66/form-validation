// Select the form and popup elements for login validation
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("password");

// Function to validate login form
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();

  //email validation
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return showPopup("Please enter a valid email address.");
  }

  //password validation
  if (password.length < 6) {
    return showPopup("Password must be at least 6 characters long.");
  }
  window.location.href = "welcome.html";
});

// Show popup
function showPopup(message, additionalContent = null) {
  popupContent.innerHTML = message;
  if (additionalContent) {
    popupContent.appendChild(additionalContent);
  }
  popupMessage.classList.remove("hidden");
  popupMessage.classList.add("show");

  setTimeout(() => {
    popupMessage.classList.remove("show");
    popupMessage.classList.add("hidden");
  }, 3000);
}

// Hide popup
popupClose.addEventListener("click", function () {
  popupMessage.classList.remove("show");
  popupMessage.classList.add("hidden");
});

const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  this.classList.toggle("fa-eye-slash");
});
