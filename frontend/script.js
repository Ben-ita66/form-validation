// Select the form and popup elements
const form = document.getElementById("form");
const popupMessage = document.getElementById("popupMessage");
const popupContent = document.getElementById("popupContent");
const popupClose = document.getElementById("popupClose");

//show the pop-up with an error message
function showPopup(message, additionalContent = null) {
  popupContent.innerHTML = message;

  // to show additional content i.e button
  if (additionalContent) {
    popupContent.appendChild(additionalContent);
  }

  popupMessage.classList.remove("hidden");
  popupMessage.classList.add("show");

  setTimeout(() => {
    popupMessage.classList.remove("show");
    popupMessage.classList.add("hidden");
  }, 8000);
}

// Hide the pop-up
popupClose.addEventListener("click", function () {
  popupMessage.classList.remove("show");
  popupMessage.classList.add("hidden");
});

// Toggle password
const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

togglePassword.addEventListener("click", function () {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  this.classList.toggle("fa-eye-slash");
});

// Toggle confirm password
const togglePassword2 = document.getElementById("togglePassword2");
const password2 = document.getElementById("password2");

togglePassword2.addEventListener("click", function () {
  const type =
    password2.getAttribute("type") === "password" ? "text" : "password";
  password2.setAttribute("type", type);
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
  if (!/^0?\d{10,14}$/.test(phone))
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
        body: JSON.stringify({
          firstName: fname,
          lastName: lname,
          phoneNumber: phone,
          email,
          password,
        }),
      }
    );

    if (response.ok) {
      showPopup(`Registration successful, ${fname}!`);

      form.reset();

      //button to view user information
      const checkoutButton = document.createElement("button");
      checkoutButton.textContent = "Check Out Your Info";
      checkoutButton.classList.add("btn-checkout");
      checkoutButton.addEventListener("click", function () {

        // Redirects to another page
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ fname, lname, phone, email })
        );
        window.location.href = "user-info.html";
      });

      //Append the button to the popup message
      showPopup(`Registration successful, ${fname}!`, checkoutButton);
    } else {
      const errorData = await response.json();

      // Check for duplicate email error (MongoDB E11000 error code)
      if (errorData.message && errorData.message.includes("E11000")) {

        // A "Login" button for the popup
        const loginButton = document.createElement("button");
        loginButton.textContent = "Login";
        loginButton.classList.add("btn-checkout1");
        loginButton.addEventListener("click", function () {
          window.open("login.html", "_blank"); // Open login page in a new tab
        });

        // Show duplicate email error message
        showPopup(
          "This email has already been registered.<br>Please login instead.<br>",
          loginButton
        );
      } else {
        showPopup("Something went wrong, please try again.");
      }
    }
  } catch (error) {
    showPopup("Something went wrong, please check your internet connection and try again.");
  }
});
