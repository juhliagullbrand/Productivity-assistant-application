//Skapa konto
document.querySelector("#btn-create-account").addEventListener("click", () => {
    const username = document.querySelector("#username-input-login").value;
    const password = document.querySelector("#password-input-login").value;

    if (!username || !password) {
        alert("Vänligen fyll i både användarnamn och lösenord.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
        alert("Användarnamnet är redan upptaget. Vänligen välj ett annat.");
        return;
    }

    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Konto skapat! Du kan nu logga in.");
});

//Logga in
document.querySelector("#btn-login").addEventListener("click", () => {
    const username = document.querySelector("#username-input-login").value;
    const password = document.querySelector("#password-input-login").value;

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username] === password) {
        localStorage.setItem("currentUser", username);
        window.location.href = "startpage.html";
    } else {
        alert("Fel användarnamn eller lösenord. Försök igen.");
    }
});
