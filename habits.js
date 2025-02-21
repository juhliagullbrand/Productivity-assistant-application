let button = document.querySelector("#routineBtn");
let routineNameInput = document.querySelector("#input-routine-title");
let priorityInput = document.querySelector("#priority");
let repetitionInput = document.querySelector("#repetition");
let routineContainer = document.querySelector(".routine-container");
let routineListContainer = document.querySelector(".routineListContainer");
let routineFilter = document.querySelector("#routineFilter");
let routineSort = document.querySelector("#routineSort");

let addRoutine = () => {
    let routine = routineNameInput.value;
    let priority = priorityInput.options[priorityInput.selectedIndex].text;
    let repetition = repetitionInput.options[repetitionInput.selectedIndex].text;

    let routineArr = JSON.parse(localStorage.getItem("routine"));

    if(routine && priority && repetition){
        let routineObject = {
            id: routineArr.length ? routineArr.length + 1 : 0,
            routine: routine,
            priority: priority,
            repetition: repetition,
            currentRepetition: 0
        }

    routineArr.push(routineObject);
    localStorage.setItem("routine",JSON.stringify(routineArr));
    createRoutineList();
    }

resetInputField();
}

button.addEventListener("click", addRoutine);

let resetInputField = () => {
    routineNameInput.value = "";
    priorityInput.value = "";
    repetitionInput.value = "";
}

let createRoutineList = () => {
    document.querySelector(".routineListContainer").innerHTML = "";
    let savedRoutine = JSON.parse(localStorage.getItem("routine"));
    if(savedRoutine !== null){
        savedRoutine.forEach(r => {
            createRoutineBox(r, savedRoutine);
        });
    }else{
        localStorage.setItem("routine",JSON.stringify([]))
    }
}
let createRoutineBox = (r, savedRoutine) => {
    let routineBox = document.createElement("div");
    routineBox.classList = "routine-box";
    let routineRightBox = document.createElement("div");
    routineRightBox.classList = "routineRightBox";
    let routineLeftBox = document.createElement("div");
    routineLeftBox.classList = "routineLeftBox";
    let repetitionIncrease = document.createElement("p");
    repetitionIncrease.innerText = r.currentRepetition;

    let repetitionsDiv = document.createElement("div");
    repetitionsDiv.classList = "repetitionsDiv";

    let routineName = document.createElement("p");
    routineName.innerText = r.routine;
    let routineRepetition = document.createElement("p");
    routineRepetition.innerText = r.repetition;

    let priorityBox = document.createElement("div");
    priorityBox.innerHTML = r.priority;
    if(r.priority === "Hög"){
        priorityBox.classList = "priorityBox priorityHigh";
    }else if(r.priority === "Mellan"){
        priorityBox.classList = "priorityBox priorityMiddle";
    }else if(r.priority === "Låg"){
        priorityBox.classList = "priorityBox priorityLow";
    }


    let imgMinus = document.createElement("img");
    imgMinus.classList = "imgMinus";
    let imgReset = document.createElement("img");
    imgReset.classList = "imgReset";

    let minusPlusRepeatBox = document.createElement("div");
    minusPlusRepeatBox.classList = "minusPlusRepeatBox";
    imgMinus.src = "icon/minus-solid.svg";
    imgMinus.style.height = "20px";
    imgMinus.style.width = "20px";
    imgMinus.style.cursor = "pointer";
    imgMinus.style.paddingRight = "0.7rem";
    imgMinus.addEventListener("click", () => {
        decrease(r,repetitionIncrease);
    });

    let imgPlus = document.createElement("img");
    imgPlus.classList = "imgPlus";
    imgPlus.src = "icon/plus-solid.svg";
    imgPlus.style.cursor = "pointer";
    imgPlus.style.height = "20px";
    imgPlus.style.width = "20px";
    imgPlus.style.cursor = "pointer";
    imgPlus.style.paddingRight = "0.7rem";
    imgPlus.addEventListener("click", () => {
        increase(r,repetitionIncrease);
    });

    imgReset.src = "icon/rotate-right-solid.svg";
    imgReset.style.height = "20px";
    imgReset.style.width = "20px";
    imgReset.style.cursor = "pointer";
    imgReset.addEventListener("click", () => {
        reset(r,repetitionIncrease);
    });

    let deleteBox = document.createElement("div");
    deleteBox.classList = "deleteBox";

    let imgDelete = document.createElement("img");
    imgDelete.src = "icon/trash-can-solid.svg";
    imgDelete.style.height = "20px";
    imgDelete.style.width = "20px";
    imgDelete.style.cursor = "pointer";

    deleteBox.addEventListener("click", () => {
        let savedRoutine = JSON.parse(localStorage.getItem("routine")) || [];
        let updatedRoutine = savedRoutine.filter(item => item.routine !== r.routine);
        localStorage.setItem("routine", JSON.stringify(updatedRoutine));
        
        routineBox.remove();
    });

    routineListContainer.append(routineBox);
    routineBox.append(routineLeftBox,routineRightBox);
    routineLeftBox.append(routineName, repetitionsDiv);
    repetitionsDiv.append(repetitionIncrease, "/", routineRepetition);
    routineRightBox.append(priorityBox,minusPlusRepeatBox,deleteBox);
    minusPlusRepeatBox.append(imgMinus,imgPlus,imgReset);
    deleteBox.append(imgDelete);

}

let increase = (r,repetitionIncrease) => {
    let savedRoutines = JSON.parse(localStorage.getItem("routine"));
    let updatedRoutine = savedRoutines.find(item => item.id === r.id);
    if(updatedRoutine.currentRepetition < updatedRoutine.repetition){
        updatedRoutine.currentRepetition += 1; 
        repetitionIncrease.innerText = updatedRoutine.currentRepetition;
        localStorage.setItem("routine", JSON.stringify(savedRoutines));
    }else{
        alert("Du har uppfyllt ditt mål!");
    }
    
}
let decrease = (r,repetitionIncrease) => {
    let savedRoutines = JSON.parse(localStorage.getItem("routine"));
    let updatedRoutine = savedRoutines.find(item => item.id === r.id);
    if(updatedRoutine.currentRepetition > 0){
        updatedRoutine.currentRepetition -= 1; 
        repetitionIncrease.innerText = updatedRoutine.currentRepetition;
        localStorage.setItem("routine", JSON.stringify(savedRoutines));
    }else{
        alert("Du kan inte gå lägre!");
    }
}
let reset = (r,repetitionIncrease) => {
    let savedRoutines = JSON.parse(localStorage.getItem("routine"));
    let updatedRoutine = savedRoutines.find(item => item.id === r.id);
    updatedRoutine.currentRepetition = 0; 
    repetitionIncrease.innerText = updatedRoutine.currentRepetition;
    localStorage.setItem("routine", JSON.stringify(savedRoutines));
}
let filterSort = () => {
    let savedRoutine = JSON.parse(localStorage.getItem("routine")) || [];

    if(routineFilter.value === "high"){
        savedRoutine = savedRoutine.filter(item => item.priority === "Hög");
    }else if(routineFilter.value === "middle"){
        savedRoutine = savedRoutine.filter(item => item.priority === "Mellan");
    }else if(routineFilter.value === "low"){
        savedRoutine = savedRoutine.filter(item => item.priority === "Låg");
    } else if (routineFilter.value === "all"){
        savedRoutine = JSON.parse(localStorage.getItem("routine")) || [];
    }
    
    if(routineSort.value === "highest-prio"){
        let priorityOrder = {"Hög": 1, "Mellan": 2, "Låg": 3};
        savedRoutine.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }else if(routineSort.value === "lowest-prio"){
        let priorityOrder = {"Hög": 1, "Mellan": 2, "Låg": 3};
        savedRoutine.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);git
    }else if(routineSort.value === "most-repetitions"){
        savedRoutine.sort((a, b) => b.repetition - a.repetition);
    }else if(routineSort.value === "least-repetitions"){
        savedRoutine.sort((a, b) => a.repetition - b.repetition);
    }

    document.querySelector(".routineListContainer").innerHTML = "";
    savedRoutine.forEach(r => {
        createRoutineBox(r);
    })
}

routineSort.addEventListener("change",filterSort);
routineFilter.addEventListener("change",filterSort);

createRoutineList();