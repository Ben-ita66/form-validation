// Select the form and popup elements
const form = document.getElementById('form');
const popupMessage = document.getElementById('popupMessage');
const popupContent = document.getElementById('popupContent');
const popupClose = document.getElementById('popupClose');

// Function to show the pop-up with an error message
function showPopup(message) {
    popupContent.innerHTML = message;
    popupMessage.classList.remove('hidden');
    popupMessage.classList.add('show');
}

// Function to hide the pop-up when the close button is clicked
popupClose.addEventListener('click', function() {
    popupMessage.classList.remove('show');
    popupMessage.classList.add('hidden');
});

// Toggle password visibility
const togglePassword = document.getElementById('togglePassword');
const password = document.getElementById('password');

togglePassword.addEventListener('click', function () {
    // Toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    
    // Toggle the eye / eye-slash icon
    this.classList.toggle('fa-eye-slash');
});

// Toggle confirm password visibility
const togglePassword2 = document.getElementById('togglePassword2');
const password2 = document.getElementById('password2');

togglePassword2.addEventListener('click', function () {
    // Toggle the type attribute
    const type = password2.getAttribute('type') === 'password' ? 'text' : 'password';
    password2.setAttribute('type', type);
    
    // Toggle the eye / eye-slash icon
    this.classList.toggle('fa-eye-slash');
});

// Validate form on submit
form.addEventListener('submit', function(e) {
    e.preventDefault();
    let errors = [];

    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const password2 = document.getElementById('password2').value.trim();

    if (fname === '') {
        showPopup('First name is required.');
        return;
    }

    if (lname === '') {
        showPopup('Last name is required.');
        return;
    }

    const phonePattern = /^\+?[1-9]\d{1,14}$/; 
if (!phonePattern.test(phone)) {
    showPopup('Please enter a valid phone number.');
    return;
}

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        showPopup('Please enter a valid email address.');
        return;
    }

    if (password.length < 6) {
        showPopup('Password must be at least 6 characters long.');
        return;
    }

    if (password !== password2) {
        showPopup('Passwords do not match.');
        return;
    }

    showPopup('Registration successful!');
});
