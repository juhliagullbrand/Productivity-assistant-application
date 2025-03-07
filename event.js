
const getUserData = (username) => JSON.parse(localStorage.getItem(`events_${username}`)) || [];
const saveUserData = (username, data) => localStorage.setItem(`events_${username}`, JSON.stringify(data));

const inputTitleEvent = document.querySelector("#inputTitleEvent"); 
const startDateEvent = document.querySelector("#startDate-event");
const endDateEvent = document.querySelector("#endDate-event"); 
const eventForm = document.querySelector("#eventForm"); 
const displayEvent = document.querySelector("#displayEvent");
const filterEvents = document.querySelector("#filterEvents");
const filterEventBtn = document.querySelector(".filter-events")

const currentUser = localStorage.getItem("currentUser");
let events = getUserData(currentUser); 

if (events.length === 0) {
    displayEvent.classList.add("hidden");
} else {
    displayEvent.classList.remove("hidden");
}

const createEventBox = (event) => {
    const eventDivFlex = document.createElement("div");
    eventDivFlex.classList.add("eventDivFlex");

    const eventContainer = document.createElement("div"); 
    eventContainer.classList.add("eventContainer"); 

    const eventTextDiv = document.createElement("div");
    eventTextDiv.classList.add("eventTextDiv"); 

    const isPast = new Date (event.end) < new Date();
        if(isPast){
            eventTextDiv.classList.add("past-event");
        }

    eventTextDiv.innerHTML = `
    <div id="eventTitle"><strong>${event.title}</strong></div>
    <div id="eventStart"><strong>Start:</strong> ${new Date(event.start).toLocaleString([], 
        {year: 'numeric', month: '2-digit', day:'2-digit', hour: '2-digit', minute: '2-digit' })}</div>
    <div id="eventEnd"><strong>Slut:</strong> ${new Date(event.end).toLocaleString([], 
        {year: 'numeric', month: '2-digit', day:'2-digit', hour: '2-digit', minute: '2-digit' })}</div>
    `;
    
    const eventActions = document.createElement("div");
    eventActions.classList.add("eventActions");

    eventEditButton(eventActions, event);
    eventDeleteButton(eventActions, event.id);

    eventTextDiv.append(eventActions);
    eventContainer.append(eventTextDiv);
    eventDivFlex.append(eventContainer);
    displayEvent.append(eventDivFlex);
};

const renderEvents = () => {
    displayEvent.innerHTML = "";
    events.sort((a, b) => new Date(a.start) - new Date(b.start)); 

    events.forEach((event) => {
        createEventBox(event);
    });

    saveUserData(currentUser, events);

    if (events.length === 0) {
        displayEvent.classList.add("hidden");
    } else {
        displayEvent.classList.remove("hidden");
    }
};

eventForm.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const title = inputTitleEvent.value.trim(); 
    const start = startDateEvent.value; 
    const end = endDateEvent.value;

    if (!title || !start || !end) {
        alert("Vänligen fyll i alla fält!"); 
        return;
    }

    if (new Date(start) >= new Date(end)) {
        alert("Startdatum måste vara före slutdatum!"); 
        return;
    }

    const newEvent = {
        id: Date.now(),
        title,
        start,
        end
    };

    events.push(newEvent);
    renderEvents();
    eventForm.reset();
});

const eventEditButton = (eventActions, event) => {
    const editBtn = document.createElement("button");
    editBtn.classList.add("btn-style-background");

    const iconEdit = document.createElement("img");
    iconEdit.src = "/icon/edit.png";
    iconEdit.style.width = "30px";

    editBtn.append(iconEdit);
    eventActions.append(editBtn);

    editBtn.addEventListener("click", () => {
        eventEditInput(eventActions.parentElement, event);
    });
};

const eventEditInput = (eventTextDiv, event) => {
    eventTextDiv.innerHTML = ""; 

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = event.title;
    inputField.classList.add("new-input");

    const inputStart = document.createElement("input"); 
    inputStart.type = "datetime-local";
    inputStart.value = event.start.substring(0, 16); 
    inputStart.classList.add("new-input");

    const inputEnd = document.createElement("input"); 
    inputEnd.type = "datetime-local"; 
    inputEnd.value = event.end.substring(0, 16);
    inputEnd.classList.add("new-input");

    const saveBtn = document.createElement("button");
    saveBtn.innerText = "Spara";
    saveBtn.classList.add("btn");


    saveBtn.addEventListener("click", () => {
        
        const newStart = inputStart.value;
        const newEnd = inputEnd.value;
        
        if (new Date(newStart) >= new Date(newEnd)) {
            alert("Startdatum måste vara före slutdatum!");
            return;
        }
        event.title = inputField.value;
        event.start = inputStart.value; 
        event.end = inputEnd.value; 

        saveUserData(currentUser, events); 

        renderEvents();
    });
    eventTextDiv.append(inputField, inputStart, inputEnd, saveBtn);
};

const eventDeleteButton = (eventActions, eventId) => {
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn-style-background", "deleteBtn"); 

    const iconDelete = document.createElement("img");
    iconDelete.src = "/icon/delete.png";
    iconDelete.style.width = "30px"; 
    
    deleteBtn.append(iconDelete);
    eventActions.append(deleteBtn); 

    deleteBtn.addEventListener("click", () => {
        events = events.filter(e => e.id !== eventId);
        renderEvents();
    });
};

const filter = (filterType) =>{
    let filteredEvents;
    if(filterType === "upcoming"){
        filteredEvents = events.filter(event => new Date(event.start) > new Date());
      
    }else if(filterType === "pastEvents"){
        filteredEvents = events.filter(event => new Date(event.end) < new Date());
    }else {
        filteredEvents = events;
    }
    renderFilteredEvents(filteredEvents);
}; 

const renderFilteredEvents   = (filteredEvents) =>{
    displayEvent.innerHTML="";
    filteredEvents.forEach(event =>{
        createEventBox(event);
    })
}

document.querySelector("#filterEvents").addEventListener("change", (e) =>{
    filter(e.target.value);
});

renderEvents();