const inputTitle = document.querySelector("#input-title-todo");
const inputDescription = document.querySelector("#input-description-todo");
const categoryDropdown = document.querySelector("#category-todo");
const inputDeadline = document.querySelector("#deadline-todo");
const inputTimeEstimate = document.querySelector("#time-estimate-todo");
const btn = document.querySelector(".btn-todo");
const container = document.querySelector(".box-todo");
const filterBtn = document.querySelector("#filter-btn-todo");
const filterContainer= document.querySelector(".filter-container-todo");

let resultTextDiv;
let resultIconDiv;
let resultContainer;
let selectResultContainer;
let resultDivFlex;

btn.addEventListener("click", () => {

  filterContainer.classList.remove("hide");

  resultDivFlex = document.createElement("div");
  resultDivFlex.classList.add("resultDivFlex-todo");

  resultContainer = document.createElement("div");
  resultContainer.classList.add("resultContainer-todo");

  resultTextDiv = document.createElement("div");
  resultTextDiv.classList.add("resultTextDiv-todo");
  resultTextDiv.innerHTML = `<strong>${inputTitle.value}</strong><br>${inputDescription.value}`;

  resultIconDiv = document.createElement("div");
  resultIconDiv.classList.add("resultIconDiv-todo");

  selectResultContainer = document.createElement("div");
  selectResultContainer.classList.add("selectResultContainer-todo");
  selectResultContainer.innerHTML = `<strong>Kategori:</strong> ${categoryDropdown.value} <strong>Deadline:</strong> ${inputDeadline.value} <strong>Estimerad tidsåtgång: </strong>${inputTimeEstimate.value}`

  container.append(resultDivFlex);
  resultDivFlex.append(resultContainer, selectResultContainer); 
  resultContainer.append(resultTextDiv, resultIconDiv);
  

  inputTitle.value = "";
  inputDescription.value = "";
  categoryDropdown.value = "";
  inputDeadline.value = "";
  inputTimeEstimate.value = "";


  createEditButton();
  createDeleteButton();
});

const createEditButton = () => {
  let editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn-todo");

  let iconEdit = document.createElement("img");
  iconEdit.src = "/icon/edit.png";
  iconEdit.style.width = "30px";

  editBtn.append(iconEdit);
  resultIconDiv.append(editBtn);

  editBtn.addEventListener("click", () => {
    editInput(resultTextDiv);
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

const createDeleteButton = () => {
  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn-todo");

  let iconDelete = document.createElement("img");
  iconDelete.src = "/icon/delete.png";
  iconDelete.style.width = "30px";

  deleteBtn.append(iconDelete);
  resultIconDiv.append(deleteBtn);

  deleteBtn.addEventListener("click", () => {
    resultDivFlex.remove();
  });
};
