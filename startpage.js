const displayQuote = document.querySelector("#displayQuote");
const pQuote = document.querySelector("#quote");
const pAuthor = document.querySelector("#author");

const displayTodoUl = document.querySelector("#displayTodoUl");
const displayHabitsUl = document.querySelector("#displayHabitsUl");
const displayEventUl = document.querySelector("#displayEventUl");

const todos = JSON.parse(localStorage.getItem("todos")) || []; 
const habits = JSON.parse(localStorage.getItem("habits")) || []; 
const events = JSON.parse(localStorage.getItem("events")) || [];

const latestEvents = events
.filter(event => new Date(event.start) > new Date())
.sort((a, b) => new Date(a.start) - new (b.start))
.slice(0, 3); 

let getData = async () => {
    const url = "https://dummyjson.com/quotes/random";
    try {
        let response = await fetch(url);
        let json = await response.json();
        return json

    } catch (error) {
        console.log(error);
    }
}

let renderPage = async () => {
    let quotes = await getData();
    pQuote.innerText = quotes.quote;
    pAuthor.innerText = quotes.author;
}

renderPage();