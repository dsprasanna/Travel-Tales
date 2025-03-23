document.addEventListener("DOMContentLoaded", function () {
    checkLoginStatus();
});

function checkLoginStatus() {
    const username = localStorage.getItem("loggedInUser");

    if (username) {
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("account-container").style.display = "block";
        document.getElementById("username-display").textContent = username; // Show username in dropdown
    } else {
        document.getElementById("login-btn").style.display = "block";
        document.getElementById("account-container").style.display = "none";
    }
}

function redirectToLogin() {
    window.location.href = "login.html";
}

function logout() {
    localStorage.removeItem("loggedInUser");
    checkLoginStatus();
}

function toggleDropdown() {
    let dropdown = document.getElementById("account-dropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
    let dropdown = document.getElementById("account-dropdown");
    let userIcon = document.getElementById("user-icon");

    if (!userIcon.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = "none";
    }
});
