const createUser = () => {
    const username = document.querySelector("#username-input-login").value;
    const password = document.querySelector("#password-input-login").value;

    if (!username || !password) {
        alert("Fyll i både användarnamn och lösenord!");
        return;
    }

    const usersString = localStorage.getItem("users");
    const users = usersString ? JSON.parse(usersString) : [];

    const userExists = users.some(user => user.username === username);
    if (userExists) {
        alert("Användarnamnet är redan taget!");
        return;
    }

    const newUser = {
        username: username,
        password: password, 
        loggedIn: false
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Konto skapat! Nu kan du logga in.");
};

const createAccountBtn = document.querySelector("#btn-create-account");
createAccountBtn.addEventListener("click", createUser);


const loginUser = () => {
    const username = document.querySelector("#username-input-login").value;
    const password = document.querySelector("#password-input-login").value;

    const usersString = localStorage.getItem('users');
    const users = usersString ? JSON.parse(usersString) : [];

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        user.loggedIn = true;
        localStorage.setItem('users', JSON.stringify(users));

        localStorage.setItem('currentUser', JSON.stringify(users.find(u => u.username === username)));

        window.location.href = 'startpage.html';
    } else {
        alert("Fel användarnamn eller lösenord");
    }
}

const login = document.querySelector("#btn-login");
login.addEventListener("click", loginUser);

