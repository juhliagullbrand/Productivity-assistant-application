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
    let img = document.createElement("img");
    img.src = "icon/minus-solid.svg";
    img.style.height = "20px";
    img.style.width = "20px";
    let img2 = document.createElement("img");
    img2.src = "icon/plus-solid.svg";
    img2.style.height = "20px";
    img2.style.width = "20px";
    let img3 = document.createElement("img");
    img3.src = "icon/rotate-right-solid.svg";
    img3.style.height = "20px";
    img3.style.width = "20px";
    
    let deleteBox = document.createElement("div");
    deleteBox.classList = "deleteBox";

    deleteBox.addEventListener("click", () => {
        let savedRoutine = JSON.parse(localStorage.getItem("routine")) || [];
        let updatedRoutine = savedRoutine.filter(item => item.routine !== r.routine);
        localStorage.setItem("routine", JSON.stringify(updatedRoutine));
        
        routineBox.remove();
    });

    let img4 = document.createElement("img");
    img4.src = "icon/trash-can-solid.svg";
    img4.style.height = "20px";
    img4.style.width = "20px";
    
    routineListContainer.append(routineBox);
    routineBox.append(routineLeftBox,routineRightBox);
    routineLeftBox.append(routineName,routineRepetition);
    routineRightBox.append(priorityBox,minusPlusRepeatBox,deleteBox);
    minusPlusRepeatBox.append(img,img2,img3);
    deleteBox.append(img4);
}


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
    }
}

routineFilter.addEventListener("change",filter);

createRoutineList();