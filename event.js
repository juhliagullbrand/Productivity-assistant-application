const flexContainer = document.querySelector(".flex-container");
const inputContainer = document.querySelector(".input-container");
const inputTitleEvent = document.querySelector("#inputTitleEvent"); 
const startDateEvent = document.querySelector("#startDate-event");
const endDateEvent = document.querySelector("#endDate-event"); 
const displayBtn = document.querySelector("#eventBtn"); 
const eventFrom = document.querySelector("#eventFrom"); 
const displayEvent = document.querySelector("#displayEvent");

eventFrom.addEventListener("submit", (e)=> {
    e.preventDefault(); 

 const eventContainer = document.createElement("div");
 eventContainer.classList.add("event-item"); 

const checkbox = document.createElement("input"); 
checkbox.type = "checkbox"; 
checkbox.classList.add("checkbox-event"); 

const title = document.createElement("p");
title.textContent = inputTitleEvent.value;

const startDate = document.createElement("span");
startDate.textContent = new Date(startDateEvent.value).toLocaleString("sv-SE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
})

const endDate = document.createElement("span");
endDate.textContent = new Date(endDateEvent.value).toLocaleString("sv-SE", {
    day: "2-digit", 
    month: "short", 
    year: "2-digit", 
    hour: "2-digit", 
    minute: "2-digit"
})

inputContainer.appendChild(checkbox);
inputContainer.appendChild(title); 
inputContainer.appendChild(startDate); 
inputContainer.appendChild(endDate); 


displayEvent.appendChild(eventContainer);
}); 
