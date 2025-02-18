const inputTitle = document.querySelector("#input-title-todo");
const inputDescription = document.querySelector("#input-description-todo");
const categoryDropdown = document.querySelector("#category-todo");
const inputDeadline = document.querySelector("#deadline-todo");
const inputTimeEstimate = document.querySelector("#time-estimate-todo");
const btn = document.querySelector(".btn-todo");
const container = document.querySelector(".box-todo");
const filterContainer= document.querySelector(".filter-container-todo");

btn.addEventListener("click", () => {

  filterContainer.classList.remove("hide");

  const resultDivFlex = document.createElement("div");
  resultDivFlex.classList.add("resultDivFlex-todo");

  const resultContainer = document.createElement("div");
  resultContainer.classList.add("resultContainer-todo");

  const resultTextDiv = document.createElement("div");
  resultTextDiv.classList.add("resultTextDiv-todo");
  resultTextDiv.innerHTML = `<strong>${inputTitle.value}</strong><br>${inputDescription.value}`;

  const resultIconDiv = document.createElement("div");
  resultIconDiv.classList.add("resultIconDiv-todo");

  const selectResultContainer = document.createElement("div");
  selectResultContainer.classList.add("selectResultContainer-todo");
  selectResultContainer.innerHTML = `<strong>Kategori:</strong> ${categoryDropdown.value} <strong>Deadline:</strong> ${inputDeadline.value} <strong>Estimerad tidsåtgång: </strong>${inputTimeEstimate.value}`

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

}

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
  inputField.classList.add("new-input-field-todo")
  inputField.value = currentDescription;

  let saveBtn = document.createElement("button");
  saveBtn.innerText = "Spara";
  saveBtn.classList.add("save-btn-todo")

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
    createCheckedBtn(taskDiv, iconContainer);
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
    createUncheckedBtn(taskDiv, iconContainer);
  });

};

const filterCategory = () => {
  let chosenCheckboxes = document.querySelectorAll('input[name="filter-category-checkbox-todo"]:checked');
  let chosenCategories = Array.from(chosenCheckboxes).map(checkbox => checkbox.value);

  let allChosenCategories = document.querySelectorAll(".resultDivFlex-todo");

  let filteredCategories = Array.from(allChosenCategories).filter(todo => {
    const categoryLabel = todo.querySelector(".selectResultContainer-todo").innerText;
    return chosenCategories.length === 0 || chosenCategories.some(category => categoryLabel.includes(category));
  });

  allChosenCategories.forEach(todo => {
    todo.style.display = "none";
  });

  filteredCategories.forEach(todo => {
    todo.style.display = "flex";
  });
};

document.querySelectorAll('input[name="filter-category-checkbox-todo"]').forEach(checkbox => {
  checkbox.addEventListener("change", filterCategory);
});

