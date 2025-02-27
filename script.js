document.addEventListener("DOMContentLoaded", () => {
    const createAccountBtn = document.querySelector("#btn-create-account");
    const loginBtn = document.querySelector("#btn-login");

    if (createAccountBtn) createAccountBtn.addEventListener("click", createUserLogin);
    if (loginBtn) loginBtn.addEventListener("click", loginUser);
});

// Skapar ett nytt konto
const createUserLogin = () => {
    const username = document.querySelector("#username-input-login").value.trim();
    const password = document.querySelector("#password-input-login").value.trim();

    if (!username || !password) {
        alert("Fyll i både användarnamn och lösenord!");
        return;
    }

    const usersString = localStorage.getItem("users");
    const users = usersString ? JSON.parse(usersString) : [];

    if (users.some(user => user.username === username)) {
        alert("Användarnamnet är redan taget!");
        return;
    }

    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Skapa en tom databas för den nya användaren
    localStorage.setItem(`userData_${username}`, JSON.stringify({}));

    alert("Konto skapat! Nu kan du logga in.");
};

// Loggar in användaren
const loginUser = () => {
    const username = document.querySelector("#username-input-login").value.trim();
    const password = document.querySelector("#password-input-login").value.trim();

    const usersString = localStorage.getItem("users");
    const users = usersString ? JSON.parse(usersString) : [];

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem("currentUser", username);
        
        // Säkerställ att användarens data finns
        if (!localStorage.getItem(`userData_${username}`)) {
            localStorage.setItem(`userData_${username}`, JSON.stringify({}));
        }

        window.location.href = "startpage.html";
    } else {
        alert("Fel användarnamn eller lösenord");
    }
};

// Sparar data för en viss sida
const saveUserData = (page, data) => {
    const username = localStorage.getItem("currentUser");
    if (!username) return;

    let userData = JSON.parse(localStorage.getItem(`userData_${username}`)) || {};
    userData[page] = data;
    localStorage.setItem(`userData_${username}`, JSON.stringify(userData));
};

// Hämtar sparad data för en viss sida
const getUserData = (page) => {
    const username = localStorage.getItem("currentUser");
    if (!username) return null;

    let userData = JSON.parse(localStorage.getItem(`userData_${username}`)) || {};
    return userData[page] || null;
};

