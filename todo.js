
const inputTitle = document.querySelector("#input-title-todo");
const inputDescription = document.querySelector("#input-description-todo");
const categoryDropdown = document.querySelector("#category-todo");
const inputDeadline = document.querySelector("#deadline-todo");
const inputTimeEstimate = document.querySelector("#time-estimate-todo");
const btn = document.querySelector(".btn-todo");
const container = document.querySelector(".box-todo");
const filterContainer = document.querySelector(".filter-container-todo");

btn.addEventListener("click", () => {
  filterContainer.classList.remove("hide");

  const resultDivFlex = document.createElement("div");
  resultDivFlex.classList.add("resultDivFlex-todo");

  resultDivFlex.dataset.category = categoryDropdown.value;
  resultDivFlex.dataset.completed = "false";

  const resultContainer = document.createElement("div");
  resultContainer.classList.add("resultContainer-todo");

  const resultTextDiv = document.createElement("div");
  resultTextDiv.classList.add("resultTextDiv-todo");
  resultTextDiv.innerHTML = `<strong>${inputTitle.value}</strong><br>${inputDescription.value}`;

  const resultIconDiv = document.createElement("div");
  resultIconDiv.classList.add("resultIconDiv-todo");

  const selectResultContainer = document.createElement("div");
  selectResultContainer.classList.add("selectResultContainer-todo");
  selectResultContainer.innerHTML = `<strong>Kategori:</strong> ${categoryDropdown.value} <strong>Deadline:</strong> ${inputDeadline.value} <strong>Estimerad tidsåtgång: </strong>${inputTimeEstimate.value}`;

  container.append(resultDivFlex);
  resultDivFlex.append(resultContainer, selectResultContainer);
  resultContainer.append(resultTextDiv, resultIconDiv);

  clearInputs();

  createEditButton(resultTextDiv, resultIconDiv);
  createDeleteButton(resultDivFlex, resultIconDiv);
  createUncheckedBtn(resultTextDiv, resultIconDiv);
});

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
  });
};

const filterTasks = () => {
  let selectedCategories = Array.from(document.querySelectorAll('input[name="filter-category-checkbox-todo"]:checked')).map(checkbox => checkbox.value);

  let showCompleted = document.querySelector("#filter-status-done").checked;
  let showNotCompleted = document.querySelector("#filter-status").checked;

  document.querySelectorAll(".resultDivFlex-todo").forEach(task => {
    let taskCategory = task.dataset.category;  
    let taskCompleted = task.dataset.completed === "true";  

    let isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(taskCategory);

    let isStatusMatch = 
        (!showCompleted && !showNotCompleted) ||  
        (showCompleted && taskCompleted) ||       
        (showNotCompleted && !taskCompleted); 

    task.style.display = (isCategoryMatch && isStatusMatch) ? "flex" : "none";
});
}

document.querySelectorAll('input[name="filter-category-checkbox-todo"], #filter-status-done, #filter-status')
  .forEach(checkbox => {
    checkbox.addEventListener("change", filterTasks);
  });
