const flexContainer = document.querySelector(".flex-container");
const inputContainer = document.querySelector(".input-container");
const inputTitleEvent = document.querySelector("#inputTitleEvent"); 
const startDateEvent = document.querySelector("#startDate-event");
const endDateEvent = document.querySelector("#endDate-event"); 
const displayBtn = document.querySelector("#eventBtn"); 
const eventFrom = document.querySelector("#eventFrom"); 

displayBtn.addEventListener("click", ()=> {
 const events = document.createElement("div");
 events.classList.add("displayEvent"); 
 let result = document.createElement("p"); 
 result.innerHTML = `${inputTitleEvent.value} 
 Start:${events.startDateEvent} 
 Slut:${events.endDateEvent} `;

}); 
console.log(displayBtn)