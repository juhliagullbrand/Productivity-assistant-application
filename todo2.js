const inputTitle = document.querySelector("#input-title-todo");
const inputDescription = document.querySelector("#input-description-todo");
const categoryDropdown = document.querySelector("#category-todo");
const inputDeadline = document.querySelector("#deadline-todo");
const inputTimeEstimate = document.querySelector("#time-estimate-todo");
const btn = document.querySelector(".btn-todo");
const container = document.querySelector(".box-todo");
const filterContainer = document.querySelector(".filter-container-todo");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const createTodoBox = (todo) => {
    const todoDivFlex = document.createElement("div");
    todoDivFlex.classList.add("todoDivFlex");

    todoDivFlex.dataset.category = todo.category;
    todoDivFlex.dataset.completed = "false";  // Sätt till "false" vid skapande

    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todoContainer");

    const todoTextDiv = document.createElement("div");
    todoTextDiv.classList.add("todoTextDiv");

    const todoTextResult = document.createElement("div");
    todoTextResult.classList.add("todoTextResult");

    const todoSelectDiv = document.createElement("div");
    todoSelectDiv.classList.add("todoSelectDiv");

    todoTextResult.innerHTML = `
    <div id="todoTitle"><strong>${todo.title}</strong></div>
    <div id="todoDescription">${todo.description}</div>`;

    todoSelectDiv.innerHTML = `
    <div id="todoCategory"><strong>Kategori:</strong> ${todo.category}</div>
    <div id="todoDeadline"><strong>Deadline:</strong> ${todo.deadline}</div>
    <div id="todoTimeEstimate"><strong>Estimerad tidsåtgång:</strong> ${todo.timeEstimate}h</div>`;

    const todoActions = document.createElement("div");
    todoActions.classList.add("todoActions");

    // Lägg till check/uncheck-knapparna här
    createUncheckedBtn(todoActions);

    todoEditBtn(todoActions, todo, todoTextDiv, todoSelectDiv);
    todoDeleteBtn(todoActions, todo, todoDivFlex);

    container.append(todoDivFlex);
    todoDivFlex.append(todoContainer);
    todoContainer.append(todoTextDiv, todoSelectDiv);
    todoTextDiv.append(todoTextResult, todoActions);
};

btn.addEventListener("click", () => {
    if (!inputTitle.value || !inputDescription.value || !categoryDropdown.value || 
        !inputDeadline.value || !inputTimeEstimate.value) {
        alert("Vänligen fyll i alla fält!");
        return;
    }

    const newTodo = {
        id: Date.now(),
        title: inputTitle.value,
        description: inputDescription.value,
        category: categoryDropdown.value,
        deadline: inputDeadline.value,
        timeEstimate: inputTimeEstimate.value,
    };

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));

    createTodoBox(newTodo);
    clearInputs();
});

const clearInputs = () => {
    inputTitle.value = "";
    inputDescription.value = "";
    categoryDropdown.selectedIndex = 0;
    inputDeadline.value = "";
    inputTimeEstimate.value = "";
};

const updateTodoDisplay = (todo, todoTextDiv, todoSelectDiv) => {
    const todoTextResult = document.createElement("div");
    todoTextResult.classList.add("todoTextResult");
    todoTextResult.innerHTML = `
        <div id="todoTitle"><strong>${todo.title}</strong></div>
        <div id="todoDescription">${todo.description}</div>
    `;

    todoTextDiv.innerHTML = "";
    todoTextDiv.appendChild(todoTextResult);

    const todoActions = document.createElement("div");
    todoActions.classList.add("todoActions");
    todoEditBtn(todoActions, todo, todoTextDiv, todoSelectDiv);
    todoDeleteBtn(todoActions, todo, todoTextDiv.closest(".todoDivFlex"));
    
    todoTextDiv.appendChild(todoActions);

    todoSelectDiv.innerHTML = `
        <div id="todoCategory"><strong>Kategori:</strong> ${todo.category}</div>
        <div id="todoDeadline"><strong>Deadline:</strong> ${todo.deadline}</div>
        <div id="todoTimeEstimate"><strong>Estimerad tidsåtgång:</strong> ${todo.timeEstimate}h</div>
    `;
};

const todoEditBtn = (todoActions, todo, todoTextDiv, todoSelectDiv) => {
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn-todo");

    const iconEdit = document.createElement("img");
    iconEdit.src = "/icon/edit.png";
    iconEdit.style.width = "30px";

    editBtn.append(iconEdit);
    todoActions.append(editBtn);

    editBtn.addEventListener("click", () => {
        todoEditInput(todo, todoTextDiv, todoSelectDiv);
    });
};

const todoEditInput = (todo, todoTextDiv, todoSelectDiv) => {
    const todoTextParent = todoTextDiv.parentNode;
    const todoSelectParent = todoSelectDiv.parentNode;

    todoTextDiv.innerHTML = "";
    todoSelectDiv.innerHTML = "";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = todo.title;
    titleInput.classList.add("new-input-todo");

    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.value = todo.description;
    descriptionInput.classList.add("new-input-description");

    const categoryInput = document.createElement("input");
    categoryInput.type = "text";
    categoryInput.value = todo.category;
    categoryInput.classList.add("new-input-category");

    const deadlineInput = document.createElement("input");
    deadlineInput.type = "date";
    deadlineInput.value = todo.deadline;
    deadlineInput.classList.add("new-input-deadline");

    const timeEstimateInput = document.createElement("input");
    timeEstimateInput.type = "number";
    timeEstimateInput.value = todo.timeEstimate;
    timeEstimateInput.classList.add("new-input-timeEstimate");

    const saveBtn = document.createElement("button");
    saveBtn.innerText = "Spara";
    saveBtn.classList.add("save-btn-todo");

    saveBtn.addEventListener("click", () => {
        todo.title = titleInput.value;
        todo.description = descriptionInput.value;
        todo.category = categoryInput.value;
        todo.deadline = deadlineInput.value;
        todo.timeEstimate = timeEstimateInput.value;

        todos = todos.map(t => (t.id === todo.id ? todo : t));
        localStorage.setItem("todos", JSON.stringify(todos));

        updateTodoDisplay(todo, todoTextDiv, todoSelectDiv);
    });

    todoTextDiv.append(titleInput, descriptionInput, saveBtn);
    todoSelectDiv.append(categoryInput, deadlineInput, timeEstimateInput);
};

const todoDeleteBtn = (todoActions, todo, todoDivFlex) => {
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn-event");

    const iconDelete = document.createElement("img");
    iconDelete.src = "/icon/delete.png";
    iconDelete.style.width = "30px";

    deleteBtn.append(iconDelete);
    todoActions.append(deleteBtn);

    deleteBtn.addEventListener("click", () => {
        todoDivFlex.remove();
        todos = todos.filter(t => t.id !== todo.id);
        localStorage.setItem("todos", JSON.stringify(todos));
    });
};

const createUncheckedBtn = (todoActions) => {
    let uncheckedBtn = document.createElement("button");
    uncheckedBtn.classList.add("unchecked-btn-todo");

    let iconUncheked = document.createElement("img");
    iconUncheked.src = "/icon/unchecked.png";
    iconUncheked.style.width = "30px";

    uncheckedBtn.append(iconUncheked);
    todoActions.append(uncheckedBtn);

    uncheckedBtn.addEventListener("click", () => {
        uncheckedBtn.remove();
        createCheckedBtn(todoActions);
    });
};

const createCheckedBtn = (todoActions) => {
    let checkedBtn = document.createElement("button");
    checkedBtn.classList.add("checked-btn-todo");

    let iconCheked = document.createElement("img");
    iconCheked.src = "/icon/checked.png";
    iconCheked.style.width = "30px";

    checkedBtn.append(iconCheked);
    todoActions.append(checkedBtn);

    checkedBtn.addEventListener("click", () => {
        checkedBtn.remove();
        createUncheckedBtn(todoActions);
    });
};

// Filterfunktion
const filterTasks = () => {
    let selectedCategories = Array.from(document.querySelectorAll('input[name="filter-category-checkbox-todo"]:checked')).map(checkbox => checkbox.value);
  
    let showCompleted = document.querySelector("#filter-status-done").checked;
    let showNotCompleted = document.querySelector("#filter-status").checked;
  
    document.querySelectorAll(".todoDivFlex").forEach(task => {
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

// Lägg till event listeners för filtrering
window.addEventListener("DOMContentLoaded", () => {
    todos.forEach(todo => createTodoBox(todo));

    // Lägg till event listeners för filtreringsalternativen
    document.querySelectorAll('input[name="filter-category-checkbox-todo"]').forEach(checkbox => {
        checkbox.addEventListener("change", filterTasks);  // Uppdatera filter när checkbox ändras
    });

    document.querySelector("#filter-status-done").addEventListener("change", filterTasks);  // Filter för completed
    document.querySelector("#filter-status").addEventListener("change", filterTasks);  // Filter för not completed
});
