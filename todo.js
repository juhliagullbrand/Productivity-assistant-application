const inputTitle = document.querySelector("#input-title-todo");
const inputDescription = document.querySelector("#input-description-todo");
const categoryDropdown = document.querySelector("#category-todo");
const inputDeadline = document.querySelector("#deadline-todo");
const inputTimeEstimate = document.querySelector("#time-estimate-todo");
const btn = document.querySelector(".btn-todo");
const container = document.querySelector(".box-todo");
const filterContainer = document.querySelector(".filter-container-todo");

btn.addEventListener("click", () => {
  if (!validateInputs()) return;
  createTodo();
  clearInputs();
});

const validateInputs = () => {
  if (
    !inputTitle.value ||
    !inputDescription.value ||
    !categoryDropdown.value ||
    !inputDeadline.value ||
    !inputTimeEstimate.value
  ) {
    alert("Alla fält måste fyllas i!");
    return false;
  }
  return true;
};

const createTodo = () => {
  const resultDivFlex = document.createElement("div");
  resultDivFlex.classList.add("resultDivFlex-todo");
  // resultDivFlex.dataset.category = categoryDropdown.value;
  // resultDivFlex.dataset.completed = "false";

  const resultContainer = document.createElement("div");
  resultContainer.classList.add("resultContainer-todo");

  const resultTextDiv = document.createElement("div");
  resultTextDiv.classList.add("resultTextDiv-todo");

  const resultTextTitle = document.createElement("p");
  resultTextTitle.classList.add("result-titel-todo")
  resultTextTitle.innerHTML = `<strong>${inputTitle.value}</strong>`;

  const resultTextDescription = document.createElement("p");
  resultTextDescription.classList.add("result-description-todo");
  resultTextDescription.innerHTML = `${inputDescription.value}`;

  const resultIconDiv = document.createElement("div");
  resultIconDiv.classList.add("resultIconDiv-todo");

  const selectResultContainer = document.createElement("div");
  selectResultContainer.classList.add("selectResultContainer-todo");

  const resultCategory = document.createElement("p");
  resultCategory.innerHTML = `<strong>Kategori:</strong> ${categoryDropdown.value}`;
  resultCategory.classList.add("categoryInput-todo")


  const resultDeadline = document.createElement("p");
  resultDeadline.innerHTML = `<strong>Deadline:</strong> ${inputDeadline.value}`;
  resultDeadline.classList.add("deadlineInput-todo")

  const resultTimeEstimate = document.createElement("p");
  resultTimeEstimate.innerHTML = `<strong>Estimerad tidsåtgång:</strong> ${inputTimeEstimate.value}h`;
  resultTimeEstimate.classList.add("time-estimate-todo")


  container.append(resultDivFlex);
  resultDivFlex.append(resultContainer, selectResultContainer);
  resultTextDiv.append(resultTextTitle, resultTextDescription)
  resultContainer.append(resultTextDiv, resultIconDiv);
  selectResultContainer.append(resultCategory, resultDeadline, resultTimeEstimate)

  createEditButton(resultTextDiv, resultIconDiv);
  createDeleteButton(resultDivFlex, resultIconDiv);
  createUncheckedBtn(resultTextDiv, resultIconDiv);

  let saveTasks = JSON.parse(localStorage.getItem("todos")) || [];
  saveTasks.push({
    title: inputTitle.value,
    description: inputDescription.value,
    category: categoryDropdown.value,
    deadline: inputDeadline.value,
    timeEstimate: inputTimeEstimate.value,
    completed: "false"
  });
  localStorage.setItem("todos", JSON.stringify(saveTasks));
};

const clearInputs = () => {
  inputTitle.value = "";
  inputDescription.value = "";
  categoryDropdown.value = "";
  inputDeadline.value = "";
  inputTimeEstimate.value = "";
};

const createEditButton = (taskDiv, iconContainer) => {
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn-todo");

  const iconEdit = document.createElement("img");
  iconEdit.src = "/icon/edit.png";
  iconEdit.style.width = "30px";

  editBtn.append(iconEdit);
  iconContainer.append(editBtn);

  editBtn.addEventListener("click", () => {
    editInput(taskDiv, iconContainer);
  });
};

const editInput = (taskDiv, resultIconDiv) => {
  let currentTitle = taskDiv.querySelector(".result-titel-todo").innerText;
  let currentDescription = taskDiv.querySelector(".result-description-todo").innerText;
  let currentCategory = taskDiv.querySelector(".categoryInput-todo").innerText;
  let currentDeadline = taskDiv.querySelector(".deadlineInput-todo").innerText;
  let currentTimeEstimate = taskDiv.querySelector(".time-estimate-todo").innerText;

  let inputTitle = document.createElement("input");
  inputTitle.type = "text";
  inputTitle.value = currentTitle;
  
  let inputDescription = document.createElement("input");
  inputDescription.type = "text";
  inputDescription.value = currentDescription;
  
  let inputCategory = document.createElement("input");
  inputCategory.type = "text";
  inputCategory.value = currentCategory;
  
  let inputDeadline = document.createElement("input");
  inputDeadline.type = "date";
  inputDeadline.value = currentDeadline;
  
  let inputTimeEstimate = document.createElement("input");
  inputTimeEstimate.type = "number";
  inputTimeEstimate.value = currentTimeEstimate;

  let saveBtn = document.createElement("button");
  saveBtn.innerText = "Spara";
  saveBtn.classList.add("save-btn-todo");

  taskDiv.innerHTML = "";
  taskDiv.append(inputTitle, inputDescription);

  let selectResultContainer = taskDiv.nextElementSibling;
  selectResultContainer.innerHTML = "";
  selectResultContainer.append(inputCategory, inputDeadline, inputTimeEstimate);

  resultIconDiv.innerHTML = "";
  resultIconDiv.append(saveBtn);

  saveBtn.addEventListener("click", () => {
    taskDiv.innerHTML = `
      <p class="result-titel-todo"><strong>${inputTitle.value}</strong></p>
      <p class="result-description-todo">${inputDescription.value}</p>`;

    selectResultContainer.innerHTML = `
      <p><strong>Kategori:</strong> ${inputCategory.value}</p>
      <p><strong>Deadline:</strong> ${inputDeadline.value}</p>
      <p><strong>Estimerad tidsåtgång:</strong> ${inputTimeEstimate.value}h</p>`;

    resultIconDiv.innerHTML = "";
    createEditButton(taskDiv, resultIconDiv);
    createDeleteButton(taskDiv.closest(".resultDivFlex-todo"), resultIconDiv);
    createUncheckedBtn(taskDiv, resultIconDiv);

    // Uppdatera localStorage
    let saveTasks = JSON.parse(localStorage.getItem("todos")) || [];
    saveTasks = saveTasks.map(task => {
      if (task.title === currentTitle) {
        task.title = inputTitle.value;
        task.description = inputDescription.value;
        task.category = inputCategory.value;
        task.deadline = inputDeadline.value;
        task.timeEstimate = inputTimeEstimate.value;
      }
      return task;
    });

    localStorage.setItem("todos", JSON.stringify(saveTasks));
  });
};



const createDeleteButton = (taskContainer, iconContainer) => {
  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn-todo");

  let iconDelete = document.createElement("img");
  iconDelete.src = "/icon/delete.png";
  iconDelete.style.width = "30px";

  deleteBtn.append(iconDelete);
  iconContainer.append(deleteBtn);

  deleteBtn.addEventListener("click", () => {
    taskContainer.remove();

    let saveTasks = JSON.parse(localStorage.getItem("todos")) || [];
    saveTasks = saveTasks.filter(task => task.title !== taskContainer.querySelector(".resultTextDiv-todo strong").innerText);
    localStorage.setItem("todos", JSON.stringify(saveTasks)); 
  });
};

const createUncheckedBtn = (taskDiv, iconContainer) => {
  let uncheckedBtn = document.createElement("button");
  uncheckedBtn.classList.add("unchecked-btn-todo");

  let iconUncheked = document.createElement("img");
  iconUncheked.src = "/icon/unchecked.png";
  iconUncheked.style.width = "30px";

  uncheckedBtn.append(iconUncheked);
  iconContainer.append(uncheckedBtn);

  uncheckedBtn.addEventListener("click", () => {
    uncheckedBtn.remove();
    const resultDivFlex = taskDiv.closest(".resultDivFlex-todo");
    resultDivFlex.dataset.completed = "true"; 
    createCheckedBtn(taskDiv, iconContainer);
    filterTasks();

    updateTaskStatus(resultDivFlex);
  });
};

const createCheckedBtn = (taskDiv, iconContainer) => {
  let checkedBtn = document.createElement("button");
  checkedBtn.classList.add("checked-btn-todo");

  let iconCheked = document.createElement("img");
  iconCheked.src = "/icon/checked.png";
  iconCheked.style.width = "30px";

  checkedBtn.append(iconCheked);
  iconContainer.append(checkedBtn);

  checkedBtn.addEventListener("click", () => {
    checkedBtn.remove();
    const resultDivFlex = taskDiv.closest(".resultDivFlex-todo");
    resultDivFlex.dataset.completed = "false"; 
    createUncheckedBtn(taskDiv, iconContainer);
    filterTasks();

    updateTaskStatus(resultDivFlex);
  });
};

const updateTaskStatus = (taskDiv) => {
  let saveTasks = JSON.parse(localStorage.getItem("todos")) || [];
  const taskTitle = taskDiv.querySelector(".resultTextDiv-todo strong").innerText;

  saveTasks = saveTasks.map(task => {
    if (task.title === taskTitle) {
      task.completed = taskDiv.dataset.completed;
    }
    return task;
  });

  localStorage.setItem("todos", JSON.stringify(saveTasks));
};

const filterTasks = () => {
  let selectedCategories = Array.from(document.querySelectorAll('input[name="filter-category-checkbox-todo"]:checked')).map(checkbox => checkbox.value);

  let showCompleted = document.querySelector("#filter-status-done").checked;
  let showNotCompleted = document.querySelector("#filter-status").checked;

  document.querySelectorAll(".resultDivFlex-todo").forEach(task => {
    let taskCategory = task.dataset.category;  
    let taskCompleted = task.dataset.completed === "true";  

    let isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(taskCategory);
 
    let noFilterSelected = !showCompleted && !showNotCompleted;
    let completedMatch = showCompleted && taskCompleted;
    let notCompletedMatch = showNotCompleted && !taskCompleted;
    let isStatusMatch = noFilterSelected || completedMatch || notCompletedMatch;

    task.style.display = (isCategoryMatch && isStatusMatch) ? "flex" : "none";
  });
};

document.querySelectorAll('input[name="filter-category-checkbox-todo"], #filter-status-done, #filter-status')
  .forEach(checkbox => {
    checkbox.addEventListener("change", filterTasks);
  });

const sortTasks = () => {
  let tasks = Array.from(document.querySelectorAll(".resultDivFlex-todo"));
  let sortOption = document.querySelector("#sort-dropdown-todo").value;

  tasks.sort((a, b) => {
    let aDeadline = new Date(a.querySelector(".selectResultContainer-todo").textContent.match(/Deadline:\s*(\d{4}-\d{2}-\d{2})/)[1]);
    let bDeadline = new Date(b.querySelector(".selectResultContainer-todo").textContent.match(/Deadline:\s*(\d{4}-\d{2}-\d{2})/)[1]);
    let aTimeEstimate = parseFloat(a.querySelector(".selectResultContainer-todo").textContent.match(/Estimerad tidsåtgång:\s*(\d+)/)?.[1] || 0);
    let bTimeEstimate = parseFloat(b.querySelector(".selectResultContainer-todo").textContent.match(/Estimerad tidsåtgång:\s*(\d+)/)?.[1] || 0);
    let aCompleted = a.dataset.completed === "true";
    let bCompleted = b.dataset.completed === "true";

    if (sortOption === "deadline-increasing") return aDeadline - bDeadline;
    if (sortOption === "deadline-decreasing") return bDeadline - aDeadline;
    if (sortOption === "time-estimate-increasing") return aTimeEstimate - bTimeEstimate;
    if (sortOption === "time-estimate-decreasing") return bTimeEstimate - aTimeEstimate;
    if (sortOption === "finished") return bCompleted - aCompleted;
    if (sortOption === "non-finished") return aCompleted - bCompleted;
    
    return 0;
  });

  tasks.forEach(task => container.append(task));
};

document.querySelector("#sort-dropdown-todo").addEventListener("change", sortTasks);

const loadTodosFromLocalStorage = () => {
  let saveTasks = JSON.parse(localStorage.getItem("todos")) || [];

  saveTasks.forEach(task => {
    const resultDivFlex = document.createElement("div");
    resultDivFlex.classList.add("resultDivFlex-todo");
    resultDivFlex.dataset.category = task.category;
    resultDivFlex.dataset.completed = task.completed;

    const resultContainer = document.createElement("div");
    resultContainer.classList.add("resultContainer-todo");

    const resultTextDiv = document.createElement("div");
    resultTextDiv.classList.add("resultTextDiv-todo");
    resultTextDiv.innerHTML = `<strong>${task.title}</strong><br>${task.description}`;

    const resultIconDiv = document.createElement("div");
    resultIconDiv.classList.add("resultIconDiv-todo");

    const selectResultContainer = document.createElement("div");
    selectResultContainer.classList.add("selectResultContainer-todo");
    selectResultContainer.innerHTML = `<strong>Kategori:</strong> ${task.category} <strong>Deadline:</strong> ${task.deadline} <strong>Estimerad tidsåtgång: </strong>${task.timeEstimate}`;

    container.append(resultDivFlex);
    resultDivFlex.append(resultContainer, selectResultContainer);
    resultContainer.append(resultTextDiv, resultIconDiv);

    createEditButton(resultTextDiv, resultIconDiv);
    createDeleteButton(resultDivFlex, resultIconDiv);

    // Kolla om uppgiften är slutförd eller inte och skapa rätt knapp
    if (task.completed === "true") {
      createCheckedBtn(resultTextDiv, resultIconDiv);  // Skapa checked-knappen om uppgiften är slutförd
    } else {
      createUncheckedBtn(resultTextDiv, resultIconDiv);  // Skapa unchecked-knappen om uppgiften inte är slutförd
    }
  });
};

document.addEventListener("DOMContentLoaded", loadTodosFromLocalStorage);
