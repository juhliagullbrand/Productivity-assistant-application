const displayQuote = document.querySelector("#displayQuote");
const pQuote = document.querySelector("#quote");
const pAuthor = document.querySelector("#author");

const displayTodoUl = document.querySelector("#displayTodoUl");
const displayHabitsUl = document.querySelector("#displayHabitsUl");
const displayEventUl = document.querySelector("#displayEventUl");

const currentUser = localStorage.getItem("currentUser");

const todos = JSON.parse(localStorage.getItem(`todos_${currentUser}`)) || [];
const habits = JSON.parse(localStorage.getItem(`routines_${currentUser}`)) || [];
const events = JSON.parse(localStorage.getItem(`events_${currentUser}`)) || [];

const displayEvent = () => {
    const sortEvent = events
        .sort((a, b) => new Date(a.start) - new Date(b.start))
        .slice(0, 3);

    if (sortEvent.length === 0) {
        displayEventUl.innerHTML = "<li> Du har inga Kommande Händelser</li>";
    } else {
        displayEventUl.innerHTML = "";
        sortEvent.forEach(event => {
            const liStartpage = document.createElement("li");
            liStartpage.classList.add("liStartpage");
            liStartpage.textContent = `${event.title}`;
            displayEventUl.appendChild(liStartpage);
        });
    }
};

const displayTodo = () => {
    if (!displayTodoUl) {
        console.error("displayTodoUl hittades inte i DOM!");
        return;
    }

    const sortTodo = todos.filter(todo => todo.completed === true).slice(0, 3);

    if (sortTodo.length === 0) {
        displayTodoUl.innerHTML = "<li>Du har inga pågående ärenden</li>";
    } else {
        displayTodoUl.innerHTML = "";
        sortTodo.forEach(todo => {
            const liStartpage = document.createElement("li");
            liStartpage.classList.add("liStartpage");
            liStartpage.textContent = todo.description || "Inga ärenden";
            displayTodoUl.appendChild(liStartpage);
        });
    }
};

const displayHabits = () => {
    const sortHabit = habits
        .sort((a, b) => b.currentRepetition - a.currentRepetition)
        .slice(0, 3);

    if (sortHabit.length === 0) {
        displayHabitsUl.innerHTML = "<li>Du har inga pågående vanor ännu</li>";
    } else {
        displayHabitsUl.innerHTML = "";
        sortHabit.forEach(habit => {
            const liStartpage = document.createElement("li");
            liStartpage.classList.add("liStartpage");
            liStartpage.textContent = `${habit.routine} - ${habit.currentRepetition} repetitioner`;
            displayHabitsUl.appendChild(liStartpage);
        });
    }
};

if (currentUser) {
    displayEvent();
    displayTodo();
    displayHabits();
}

const getData = async () => {
    const url = "https://dummyjson.com/quotes/random";
    try {
        let response = await fetch(url);
        let json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
};

const renderPage = async () => {
    let quotes = await getData();
    pQuote.innerText = quotes.quote;
    pAuthor.innerText = quotes.author;
};

renderPage();
