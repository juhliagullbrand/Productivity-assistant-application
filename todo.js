const inputTitle = document.querySelector("#input-todo-title");
const inputDescription = document.querySelector("#input-todo-description");
const categoryDropdown = document.querySelector("#category-todo");
const inputDeadline = document.querySelector("#deadline-todo");
const inputTimeEstimate = document.querySelector("#time-estimate");
const btn = document.querySelector(".btn-todo");
const container = document.querySelector(".flex-container-todo");

btn.addEventListener("click", () => {
    let inputContainer = document.createElement("div");
    inputContainer.classList.add("input-container-result-todo");
    let result = document.createElement("p");
    result.innerHTML = `<strong>${inputTitle.value}</strong><br>${inputDescription.value}`;

    createEditDelete(inputContainer);

    container.append(inputContainer);
    inputContainer.append(result);
})

const createEditDelete = (inputContainer) => {
    let edit = document.createElement("button");
    edit.style.backgroundImage = `<img src="icon/delete.png">`;
    
    inputContainer.append(edit);

    deleteBtn.addEventListener("click", () => {
        inputContainer.remove();
    });

};

