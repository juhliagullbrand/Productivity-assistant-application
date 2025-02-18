const inputTitleEvent = document.querySelector("#inputTitleEvent"); 
const startDateEvent = document.querySelector("#startDate-event");
const endDateEvent = document.querySelector("#endDate-event"); 
const eventForm = document.querySelector("#eventForm"); 
const displayEvent = document.querySelector("#displayEvent");

// 🟢 FIX: Rätt variabelnamn (events istället för event)
let events = JSON.parse(localStorage.getItem("events")) || [];

const createEventBox = (event) => {
    const eventBox = document.createElement("div");
    eventBox.classList.add("event-box");

    const now = new Date(); // 🟢 FIX: Definierar "now"

    // 🟢 FIX: Kontrollera rätt datumvariabel
    if (new Date(event.end) < now) {
        eventBox.classList.add("past-event");
    }

    eventBox.innerHTML = `
        <div class="event-div">
            <span class="event-title"><strong>${event.title}</strong></span>
            <span class="event-date">📅 Start: ${new Date(event.start).toLocaleString()}</span>
            <span class="event-date">⏳ Slut: ${new Date(event.end).toLocaleString()}</span>
        </div>
    `;

    displayEvent.appendChild(eventBox); // 🟢 FIX: Lägg till i DOM:en
};

const renderEvents = () => {
    displayEvent.innerHTML = "";
    events.sort((a, b) => new Date(a.start) - new Date(b.start)); // Sortera efter starttid

    events.forEach((event) => {
        createEventBox(event);
    });

    localStorage.setItem("events", JSON.stringify(events)); // Spara i localStorage
};

eventForm.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const title = inputTitleEvent.value.trim(); 
    const start = startDateEvent.value; 
    const end = endDateEvent.value;

    if (!title || !start || !end) {
        alert("Vänligen fyll i alla fält!"); // 🟢 FIX: Felstavning fixad
        return;
    }

    if (new Date(start) >= new Date(end)) {
        alert("Startdatum måste vara före slutdatum!"); // 🟢 FIX: Ändrat alter -> alert
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

// 🟢 FIX: Säkerställ att sidan laddar korrekt vid start
renderEvents();