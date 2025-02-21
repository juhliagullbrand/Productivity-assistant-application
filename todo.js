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

const createTodo = (task = null) => {
  filterContainer.classList.remove("hide");

  const resultDivFlex = document.createElement("div");
  resultDivFlex.classList.add("resultDivFlex-todo");
  resultDivFlex.dataset.category = task ? task.category : categoryDropdown.value;
  resultDivFlex.dataset.completed = task ? task.completed : "false";

  const resultContainer = document.createElement("div");
  resultContainer.classList.add("resultContainer-todo");

  const resultTextDiv = document.createElement("div");
  resultTextDiv.classList.add("resultTextDiv-todo");
  resultTextDiv.innerHTML = `<strong>${task ? task.title : inputTitle.value}</strong><br>${task ? task.description : inputDescription.value}`;

  const resultIconDiv = document.createElement("div");
  resultIconDiv.classList.add("resultIconDiv-todo");

  const selectResultContainer = document.createElement("div");
  selectResultContainer.classList.add("selectResultContainer-todo");
  selectResultContainer.innerHTML = `<strong>Kategori:</strong> ${task ? task.category : categoryDropdown.value} 
  <strong>Deadline:</strong> ${task ? task.deadline : inputDeadline.value} 
  <strong>Estimerad tidsåtgång: </strong>${task ? task.timeEstimate : inputTimeEstimate.value}`;

  container.append(resultDivFlex);
  resultDivFlex.append(resultContainer, selectResultContainer);
  resultContainer.append(resultTextDiv, resultIconDiv);

  createEditButton(resultTextDiv, resultIconDiv);
  createDeleteButton(resultDivFlex, resultIconDiv);

  if (task && task.completed === "true") {
    createCheckedBtn(resultTextDiv, resultIconDiv);
  } else {
    createUncheckedBtn(resultTextDiv, resultIconDiv);
  }

  if (!task) {
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
  }
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
    editInput(taskDiv);
  });
};

const editInput = (taskDiv) => {
  let currentTitle = taskDiv.querySelector("strong").innerText;
  let currentDescription = taskDiv.innerHTML.split("<br>")[1];

  let inputField = document.createElement("input");
  inputField.type = "text";
  inputField.classList.add("new-input-field-todo");
  inputField.value = currentDescription;

  let saveBtn = document.createElement("button");
  saveBtn.innerText = "Spara";
  saveBtn.classList.add("save-btn-todo");

  taskDiv.innerHTML = `<strong>${currentTitle}</strong><br>`;
  taskDiv.append(inputField, saveBtn);

  saveBtn.addEventListener("click", () => {
    taskDiv.innerHTML = `<strong>${currentTitle}</strong><br>${inputField.value}`;
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
    saveTasks = saveTasks.filter(task => task.title !== taskContainer.querySelector("strong").innerText);
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
    updateLocalStorage();
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
    updateLocalStorage();
  });
};

const updateLocalStorage = () => {
  let saveTasks = [];
  document.querySelectorAll(".resultDivFlex-todo").forEach(task => {
    saveTasks.push({
      title: task.querySelector("strong").innerText,
      description: task.querySelector(".resultTextDiv-todo").innerHTML.split("<br>")[1],
      category: task.dataset.category,
      deadline: task.querySelector(".selectResultContainer-todo").textContent.match(/Deadline:\s*(\d{4}-\d{2}-\d{2})/)[1],
      timeEstimate: task.querySelector(".selectResultContainer-todo").textContent.match(/Estimerad tidsåtgång:\s*(\d+)/)[1],
      completed: task.dataset.completed
    });
  });
  localStorage.setItem("todos", JSON.stringify(saveTasks));
};

const loadTodos = () => {
  let saveTasks = JSON.parse(localStorage.getItem("todos")) || [];
  saveTasks.forEach(task => createTodo(task));
};

window.addEventListener("load", loadTodos);
