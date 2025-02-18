let button = document.querySelector("#routineBtn");
let outputNameField = document.querySelector("#routineName");
let outputPriorityField = document.querySelector(".priorityBoxHigh");
let outputRepetitionField = document.querySelector("#routineRepetition");
let routineNameInput = document.querySelector("#input-routine-title");
let priorityInput = document.querySelector("#priority");
let repetitionInput = document.querySelector("#repetition");
let routineContainer = document.querySelector(".routine-container");
let routineListContainer = document.querySelector(".routineListContainer");
let routineFilter = document.querySelector("#routineFilter");
let imgPlus = document.createElement("img");
imgPlus.classList = "imgPlus";
let imgMinus = document.createElement("img");
imgMinus.classList = "imgMinus";
let imgReset = document.createElement("img");
imgReset.classList = "imgReset";
let repetitionsDiv = document.createElement("div");
repetitionsDiv.classList = "repetitionsDiv";

let addRoutine = () => {

    let routine = routineNameInput.value;
    

    let priority = priorityInput.options[priorityInput.selectedIndex].text;
    // outPutPrioField.append(prioText);

    let repetition = repetitionInput.options[repetitionInput.selectedIndex].text;
    // outPutRepField.append(rep);

    let routineArr = JSON.parse(localStorage.getItem("routine"));


    if(routine && priority && repetition){
        let routineObject = {
            routine,
            priority,
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

    let priorityBox = document.createElement("div");
    priorityBox.innerHTML = r.priority;
    if(r.priority === "Hög"){
        priorityBox.classList = "priorityBox priorityHigh";
    }else if(r.priority === "Mellan"){
        priorityBox.classList = "priorityBox priorityMiddle";
    }else if(r.priority === "Låg"){
        priorityBox.classList = "priorityBox priorityLow";
    }

    let minusPlusRepeatBox = document.createElement("div");
    minusPlusRepeatBox.classList = "minusPlusRepeatBox";
    imgMinus.src = "icon/minus-solid.svg";
    imgMinus.style.height = "20px";
    imgMinus.style.width = "20px";
    imgMinus.style.cursor = "pointer";
    imgMinus.style.paddingRight = "0.7rem";

    imgPlus.src = "icon/plus-solid.svg";
    imgPlus.style.cursor = "pointer";
    imgPlus.style.height = "20px";
    imgPlus.style.width = "20px";
    imgPlus.style.cursor = "pointer";
    imgPlus.style.paddingRight = "0.7rem";

    imgReset.src = "icon/rotate-right-solid.svg";
    imgReset.style.height = "20px";
    imgReset.style.width = "20px";
    imgReset.style.cursor = "pointer";

    
    let deleteBox = document.createElement("div");
    deleteBox.classList = "deleteBox";

    deleteBox.addEventListener("click", () => {
        let savedRoutine = JSON.parse(localStorage.getItem("routine")) || [];
        let updatedRoutine = savedRoutine.filter(item => item.routine !== r.routine);
        localStorage.setItem("routine", JSON.stringify(updatedRoutine));
        
        routineBox.remove();
    });

    let imgDelete = document.createElement("img");
    imgDelete.src = "icon/trash-can-solid.svg";
    imgDelete.style.height = "20px";
    imgDelete.style.width = "20px";
    imgDelete.style.cursor = "pointer";


    routineListContainer.append(routineBox);
    routineBox.append(routineLeftBox,routineRightBox);
    routineLeftBox.append(routineName, repetitionsDiv);
    repetitionsDiv.append(repetitionIncrease, "/", routineRepetition);
    routineRightBox.append(priorityBox,minusPlusRepeatBox,deleteBox);
    minusPlusRepeatBox.append(imgMinus,imgPlus,imgReset);
    deleteBox.append(imgDelete);
}

let increaseCounter = 0;
let repetitionIncrease = document.createElement("p");

let filter = () => {
    if(routineFilter.value === "high"){
        document.querySelector(".routineListContainer").innerHTML = "";
        let savedRoutine = JSON.parse(localStorage.getItem("routine")) || [];
        let filteredHigh = savedRoutine.filter(item => item.priority === "Hög");

        filteredHigh.forEach(r => {
            createRoutineBox(r);
        })

    }else if(routineFilter.value === "middle"){
        document.querySelector(".routineListContainer").innerHTML = "";
        let savedRoutine = JSON.parse(localStorage.getItem("routine")) || [];
        let filteredHigh = savedRoutine.filter(item => item.priority === "Mellan");

        filteredHigh.forEach(r => {
            createRoutineBox(r);
        })
    } else if(routineFilter.value === "low"){
        document.querySelector(".routineListContainer").innerHTML = "";
        let savedRoutine = JSON.parse(localStorage.getItem("routine")) || [];
        let filteredHigh = savedRoutine.filter(item => item.priority === "Låg");

        filteredHigh.forEach(r => {
            createRoutineBox(r);
        })
    } else if (routineFilter.value === "all"){
        document.querySelector(".routineListContainer").innerHTML = "";
        let savedRoutine = JSON.parse(localStorage.getItem("routine")) || [];

        savedRoutine.forEach(r => {
            createRoutineBox(r);
        })
    }
}

let increase = () => {
    increaseCounter += 1;
    repetitionIncrease.innerText = increaseCounter;
    // repetitionsDiv.append(repetitionIncrease);

}
let decrease = () => {
    increaseCounter -= 1;
    repetitionIncrease.innerText = increaseCounter + "/";
    repetitionsDiv.append(repetitionIncrease);
}
let reset = () => {
    increaseCounter = 0;
    repetitionIncrease.innerText = increaseCounter + "/";
    repetitionsDiv.append(repetitionIncrease);
}

imgMinus.addEventListener("click",decrease);
imgPlus.addEventListener("click",increase);
imgReset.addEventListener("click",reset);

routineFilter.addEventListener("change",filter);

createRoutineList();