// Select the form and popup elements
const form = document.getElementById("form");
const popupMessage = document.getElementById("popupMessage");
const popupContent = document.getElementById("popupContent");
const popupClose = document.getElementById("popupClose");

// Function to show the pop-up with an error message
function showPopup(message) {
  popupContent.innerHTML = message;
  popupMessage.classList.remove("hidden");
  popupMessage.classList.add("show");

  setTimeout(() => {
    popupMessage.classList.remove("show");
    popupMessage.classList.add("hidden");
  }, 3000);
}

//hide the pop-up when the close button is clicked
popupClose.addEventListener("click", function () {
  popupMessage.classList.remove("show");
  popupMessage.classList.add("hidden");
});

// Toggle password visibility
const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

togglePassword.addEventListener("click", function () {
  // Toggle the type attribute
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  // Toggle the eye / eye-slash icon
  this.classList.toggle("fa-eye-slash");
});

// Toggle confirm password visibility
const togglePassword2 = document.getElementById("togglePassword2");
const password2 = document.getElementById("password2");

togglePassword2.addEventListener("click", function () {
  // Toggle the type attribute
  const type =
    password2.getAttribute("type") === "password" ? "text" : "password";
  password2.setAttribute("type", type);

  // Toggle the eye / eye-slash icon
  this.classList.toggle("fa-eye-slash");
});

// Validate form on submit
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const password2 = document.getElementById("password2").value.trim();

  if (fname === "") return showPopup("First name is required.");
  if (lname === "") return showPopup("Last name is required.");
  if (!/^\+?[1-9]\d{1,14}$/.test(phone))
    return showPopup("Please enter a valid phone number.");
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
    return showPopup("Please enter a valid email address.");
  if (password.length < 6)
    return showPopup("Password must be at least 6 characters long.");
  if (password !== password2) return showPopup("Passwords do not match.");

  // Send data to the backend
  try {
    const response = await fetch(
      "https://form-validation-jl67.onrender.com/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fname, lname, phone, email, password }),
      }
    );

    if (response.ok) {
      showPopup(`Registration successful, ${fname}!`);

      //A button to view user information
      const checkoutButton = document.createElement("button");
      checkoutButton.textContent = "Check Out Your Info";
      checkoutButton.classList.add("btn-checkout");
      checkoutButton.addEventListener("click", function () {
        // Redirects to another page or fetch the user's data
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ fname, lname, phone, email })
        );
        window.location.href = "user-info.html";
      });

      popupMessage.appendChild(checkoutButton);
    } else {
      const errorData = await response.json();
      showPopup("Error: " + (errorData.message || "Unknown error"));
    }
  } catch (error) {
    showPopup("Network error: " + error.message);
  }
});
