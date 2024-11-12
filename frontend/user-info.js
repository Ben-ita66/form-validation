document.addEventListener("DOMContentLoaded", function () {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (userInfo) {
    document.getElementById("fnameDisplay").textContent = userInfo.fname;
    document.getElementById("lnameDisplay").textContent = userInfo.lname;
    document.getElementById("phoneDisplay").textContent = userInfo.phone;
    document.getElementById("emailDisplay").textContent = userInfo.email;
  } else {
    alert("No user data found!");
  }
});
