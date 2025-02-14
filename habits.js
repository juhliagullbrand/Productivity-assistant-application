let button = document.querySelector("#habitsBtn");
let outPutNameField = document.querySelector("#routineName");
let outPutPrioField = document.querySelector(".prioBoxHigh");
let outPutRepField = document.querySelector("#routineRepetation");
let habitNameInput = document.querySelector("#input-habits-title");
let prioInput = document.querySelector("#prio");
let repInput = document.querySelector("#repetition");

let addHabit = () => {
    
    let routine = habitNameInput.value;
    // outPutNameField.append(routine);

    let prioText = prioInput.options[prioInput.selectedIndex].text;
    // outPutPrioField.append(prioText);

    let rep = repInput.options[repInput.selectedIndex].text;
    // outPutRepField.append(rep);

    let routineArr = [];

    if(routine && prioText && rep){
    routineArr.push(routine,prioText,rep);
    }

    localStorage.setItem("Rutin",JSON.stringify(routineArr))
}

button.addEventListener("click", addHabit);

let createHabitList = () => {
    let savedHabit = JSON.parse(localStorage.getItem("Rutin"));
    if(savedHabit !== null){
        for (let i = 0; i < savedHabit.length; i++){
            // let data = document.createElement("p");
            // data.innerText = savedHabit[i];
            console.log(savedHabit[i]);
            // habitNameInput.append(data);
        }
    }
}

createHabitList();