const inputTitleEvent = document.querySelector("#inputTitleEvent"); 
const startDateEvent = document.querySelector("#startDate-event");
const endDateEvent = document.querySelector("#endDate-event"); 
const eventForm = document.querySelector("#eventForm"); 
const displayEvent = document.querySelector("#displayEvent");
const filterEvents = document.querySelector("#filterEvents");

let events = JSON.parse(localStorage.getItem("events")) || [];

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
    eventTextDiv.innerHTML = `<div id="eventTitle"> <strong>${event.title}</strong></div>
    <div id="eventStart"><strong>Start:</strong> ${new Date(event.start).toLocaleString()}</div>
    <div id="eventStart"><strong>Slut:</strong> ${new Date(event.end).toLocaleString()} </div> `;

    const eventDelete = document.createElement("div"); 
    eventDelete.classList.add("eventDelete"); 

    createEditButton(eventDelete, event);
    createDeleteButton(eventDelete, event.id);
   
    eventTextDiv.append(eventDelete);
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

    localStorage.setItem("events", JSON.stringify(events)); 
    if (events.length === 0) {
        displayEvent.classList.add("hidden");
    } else {
        displayEvent.classList.remove("hidden");
    }
};

eventForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    displayEvent.classList.remove("hidden");

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

const createEditButton = (eventTextDiv, event) => {
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn-event");

    const iconEdit = document.createElement("img");
    iconEdit.src = "/icon/edit.png";
    iconEdit.style.width = "30px";

    editBtn.append(iconEdit);
    eventTextDiv.append(editBtn);

    editBtn.addEventListener("click", () => {
        editInput(eventTextDiv, event);
    });
};

const editInput = (eventTextDiv, event) => {
    const currentTitle = event.title;
    
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.classList.add("new-input-field");
    inputField.value = currentTitle;

    const saveBtn = document.createElement("button");
    saveBtn.innerText = "Spara";
    saveBtn.classList.add("save-btn");

    eventTextDiv.innerHTML = `<strong>${currentTitle}</strong><br>`;
    eventTextDiv.append(inputField, saveBtn);

    saveBtn.addEventListener("click", () => {
        event.title = inputField.value;
        renderEvents();
    });
};

const createDeleteButton = (eventTextDiv, eventId) =>{
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn-event"); 

    const iconDelete = document.createElement("img");
    iconDelete.src = "/icon/delete.png";
    iconDelete.style.width = "30px"; 
    
    deleteBtn.append(iconDelete);
    eventTextDiv.append(deleteBtn); 

    deleteBtn.addEventListener("click", () =>{
        events = events.filter(e => e.id !== eventId);
        renderEvents();
    })
}

renderEvents();