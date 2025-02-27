const displayQuote = document.querySelector("#displayQuote");

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

