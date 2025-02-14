const inputTitle = document.querySelector("#input-title-todo");
const inputDescription = document.querySelector("#input-description-todo");
const categoryDropdown = document.querySelector("#category-todo");
const inputDeadline = document.querySelector("#deadline-todo");
const inputTimeEstimate = document.querySelector("#time-estimate-todo");
const btn = document.querySelector(".btn-todo");
const container = document.querySelector(".box-todo");

let resultTextDiv;
let resultIconDiv;
let resultContainer;
let selectResultContainer;

btn.addEventListener("click", () => {
  resultContainer = document.createElement("div");
  resultContainer.classList.add("resultContainer-todo");

  resultTextDiv = document.createElement("div");
  resultTextDiv.classList.add("resultTextDiv-todo");
  resultTextDiv.innerHTML = `<strong>${inputTitle.value}</strong><br>${inputDescription.value}`;

  selectResultContainer = document.createElement("div");
  selectResultContainer.classList.add("selectResultContainer-todo");
  selectResultContainer.innerHTML = `${categoryDropdown.value} ${inputDeadline.value} ${inputTimeEstimate.value}`

  resultIconDiv = document.createElement("div");
  resultIconDiv.classList.add("resultIconDiv-todo");

  resultContainer.append(resultTextDiv, resultIconDiv);
  container.append(resultContainer, selectResultContainer); 

  inputTitle.value = "";
  inputDescription.value = "";

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
    resultContainer.edit();
  })
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
    resultContainer.remove();
  });
};



