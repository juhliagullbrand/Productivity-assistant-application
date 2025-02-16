let button = document.querySelector("#routineBtn");
let outputNameField = document.querySelector("#routineName");
let outputPriorityField = document.querySelector(".priorityBoxHigh");
let outputRepetitionField = document.querySelector("#routineRepetition");
let routineNameInput = document.querySelector("#input-routine-title");
let priorityInput = document.querySelector("#priority");
let repetitionInput = document.querySelector("#repetition");
let routineContainer = document.querySelector(".routine-container");
let routineListContainer = document.querySelector(".routineListContainer");

let addRoutine = () => {

    let routine = routineNameInput.value;
    

    let priorityText = priorityInput.options[priorityInput.selectedIndex].text;
    // outPutPrioField.append(prioText);

    let repetition = repetitionInput.options[repetitionInput.selectedIndex].text;
    // outPutRepField.append(rep);

    let routineArr = JSON.parse(localStorage.getItem("routine"));


    if(routine && priorityText && repetition){
        let routineObject = {
            routine,
            priorityText,
            repetition
        }

    routineArr.push(routineObject);
    localStorage.setItem("routine",JSON.stringify(routineArr));
    createRoutineList();
    }
}

button.addEventListener("click", addRoutine);

let createRoutineList = () => {
    document.querySelector(".routineListContainer").innerHTML = "";
    let savedRoutine = JSON.parse(localStorage.getItem("routine"));
    if(savedRoutine !== null){
        savedRoutine.forEach(r => {
            createRoutineBox(r);
        });
    }else{
        localStorage.setItem("routine",JSON.stringify([]))
    }
}

let createRoutineBox = (r) => {
    let routineBox = document.createElement("div");
    routineBox.classList = "routine-box";
    let routineRightBox = document.createElement("div");
    routineRightBox.classList = "routineRightBox";
    let routineLeftBox = document.createElement("div");
    routineLeftBox.classList = "routineLeftBox";

    let routineName = document.createElement("p");
    routineName.innerText = r.routine;
    let routineRepetition = document.createElement("p");
    routineRepetition.innerText = r.repetition;

    let priorityBoxHigh = document.createElement("div");
    let minusPlusRepeatBox = document.createElement("div");
    let deleteBox = document.createElement("div");

    routineListContainer.append(routineBox);
    routineBox.append(routineLeftBox,routineRightBox);
    routineLeftBox.append(routineName,routineRepetition);
    routineRightBox.append(priorityBoxHigh,minusPlusRepeatBox,deleteBox);
}

createRoutineList();