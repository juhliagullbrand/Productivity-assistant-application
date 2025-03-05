const getUserData = (username) => JSON.parse(localStorage.getItem(`todos_${username}`)) || [];
const saveUserData = (username, data) => localStorage.setItem(`todos_${username}`, JSON.stringify(data));

const inputTitle = document.querySelector("#input-title-todo");
const inputDescription = document.querySelector("#input-description-todo");
const categoryDropdown = document.querySelector("#category-todo");
const inputDeadline = document.querySelector("#deadline-todo");
const inputTimeEstimate = document.querySelector("#time-estimate-todo");
const btn = document.querySelector(".btn-todo");
const container = document.querySelector(".box-todo");

const currentUser = localStorage.getItem("currentUser");
let todos = getUserData(currentUser); 

const createTodoBox = (todo) => {
    const todoDivFlex = document.createElement("div");
    todoDivFlex.classList.add("todoDivFlex");

    todoDivFlex.dataset.category = todo.category;
    todoDivFlex.dataset.completed = todo.completed ? "true" : "false";

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
    <div id="todoTimeEstimate"><strong>Tidsestimat:</strong> ${todo.timeEstimate}h</div>`;

    const todoActions = document.createElement("div");
    todoActions.classList.add("todoActions");

    if (todo.completed) {
        createCheckedBtn(todoActions, todoDivFlex, todo);
    } else {
        createUncheckedBtn(todoActions, todoDivFlex, todo);
    }

    todoEditBtn(todoActions, todo, todoTextDiv, todoSelectDiv, todoDivFlex);
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
        completed: false
    };

    todos.push(newTodo);
    saveUserData(currentUser, todos); 

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

const todoEditBtn = (todoActions, todo, todoTextDiv, todoSelectDiv, todoDivFlex) => {
    const editBtn = document.createElement("button");
    editBtn.classList.add("btn-style-background");

    const iconEdit = document.createElement("img");
    iconEdit.src = "/icon/edit.png";
    iconEdit.style.width = "30px";

    editBtn.append(iconEdit);
    todoActions.append(editBtn);

    editBtn.addEventListener("click", () => {
        todoEditInput(todo, todoTextDiv, todoSelectDiv, todoActions, todoDivFlex);
    });
};

const todoEditInput = (todo, todoTextDiv, todoSelectDiv, todoActions, todoDivFlex) => {
    const todoTextResult = todoTextDiv.querySelector(".todoTextResult");
    if (todoTextResult) {
        todoTextResult.remove();
    }
    
    todoActions.innerHTML = "";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = todo.title;
    titleInput.classList.add("new-input");

    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.value = todo.description;
    descriptionInput.classList.add("new-input");

    const categoryInput = document.createElement("input");
    categoryInput.type = "text";
    categoryInput.value = todo.category;
    categoryInput.classList.add("new-input");

    const deadlineInput = document.createElement("input");
    deadlineInput.type = "date";
    deadlineInput.value = todo.deadline;
    deadlineInput.classList.add("new-input");

    const timeEstimateInput = document.createElement("input");
    timeEstimateInput.type = "number";
    timeEstimateInput.value = todo.timeEstimate;
    timeEstimateInput.classList.add("new-input");

    const saveBtn = document.createElement("button");
    saveBtn.innerText = "Spara";
    saveBtn.classList.add("btn");

    const editForm = document.createElement("div");
    editForm.classList.add("edit-form");
    editForm.append(titleInput);
    editForm.append(descriptionInput);
    todoTextDiv.append(editForm);

    const previousSelectContent = todoSelectDiv.innerHTML;
    todoSelectDiv.innerHTML = "";
    
    const selectEditForm = document.createElement("div");
    selectEditForm.classList.add("select-edit-form-todo");
    
    const categoryContainer = document.createElement("div");
    const categoryLabel = document.createElement("div");
    categoryLabel.textContent = "Kategori: ";
    categoryContainer.append(categoryLabel);
    categoryContainer.append(categoryInput);
    
    const deadlineContainer = document.createElement("div"); 
    const deadlineLabel = document.createElement("div");
    deadlineLabel.textContent = "Deadline: ";
    deadlineContainer.append(deadlineLabel);
    deadlineContainer.append(deadlineInput);
    
    const timeEstimateContainer = document.createElement("div");
    const timeEstimateLabel = document.createElement("div");
    timeEstimateLabel.textContent = "Tidsestimat: ";
    timeEstimateContainer.append(timeEstimateLabel);
    timeEstimateContainer.append(timeEstimateInput);
    
    selectEditForm.append(categoryContainer);
    selectEditForm.append(deadlineContainer);
    selectEditForm.append(timeEstimateContainer);
    
    todoSelectDiv.append(selectEditForm);

    todoActions.append(saveBtn);
    todoTextDiv.append(todoActions);

    saveBtn.addEventListener("click", () => {
        todo.title = titleInput.value;
        todo.description = descriptionInput.value;
        todo.category = categoryInput.value;
        todo.deadline = deadlineInput.value;
        todo.timeEstimate = timeEstimateInput.value;
    
        todos = todos.map(t => (t.id === todo.id ? todo : t));
        saveUserData(currentUser, todos);
        
        if (todoDivFlex) {
            todoDivFlex.dataset.category = todo.category;
        }
        
        editForm.remove();
        selectEditForm.remove();
        
        const newTodoTextResult = document.createElement("div");
        newTodoTextResult.classList.add("todoTextResult");
        newTodoTextResult.innerHTML = `
            <div id="todoTitle"><strong>${todo.title}</strong></div>
            <div id="todoDescription">${todo.description}</div>`;
        
        todoTextDiv.insertBefore(newTodoTextResult, todoActions);
        
        todoSelectDiv.innerHTML = `
            <div id="todoCategory"><strong>Kategori:</strong> ${todo.category}</div>
            <div id="todoDeadline"><strong>Deadline:</strong> ${todo.deadline}</div>
            <div id="todoTimeEstimate"><strong>Tidsestimat:</strong> ${todo.timeEstimate}h</div>`;
    
        todoActions.innerHTML = ""; 
    
        if (todo.completed) {
            createCheckedBtn(todoActions, todoDivFlex, todo);
        } else {
            createUncheckedBtn(todoActions, todoDivFlex, todo);
        }
    
        todoEditBtn(todoActions, todo, todoTextDiv, todoSelectDiv, todoDivFlex);
        todoDeleteBtn(todoActions, todo, todoDivFlex);
    });
};

const todoDeleteBtn = (todoActions, todo, todoDivFlex) => {
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn-style-background", "deleteBtn");

    const iconDelete = document.createElement("img");
    iconDelete.src = "/icon/delete.png";
    iconDelete.style.width = "30px";

    deleteBtn.append(iconDelete);
    todoActions.append(deleteBtn);

    deleteBtn.addEventListener("click", () => {
        todoDivFlex.remove();
        todos = todos.filter(t => t.id !== todo.id);
        saveUserData(currentUser, todos); 
    });
};

const createUncheckedBtn = (todoActions, todoDivFlex, todo) => {
    let uncheckedBtn = document.createElement("button");
    uncheckedBtn.classList.add("btn-style-background");

    let iconUnchecked = document.createElement("img");
    iconUnchecked.src = "/icon/unchecked.png";
    iconUnchecked.style.width = "30px";

    uncheckedBtn.append(iconUnchecked);
    todoActions.append(uncheckedBtn);

    uncheckedBtn.addEventListener("click", () => {
        let checkedBtn =  createCheckedBtn(todoActions, todoDivFlex, todo);
        uncheckedBtn.replaceWith(checkedBtn);
        todoDivFlex.dataset.completed = "true";
        todo.completed = true;
        saveUserData(currentUser, todos); 
    });

    return uncheckedBtn;
};

const createCheckedBtn = (todoActions, todoDivFlex, todo) => {
    let checkedBtn = document.createElement("button");
    checkedBtn.classList.add("btn-style-background");

    let iconChecked = document.createElement("img");
    iconChecked.src = "/icon/checked.png";
    iconChecked.style.width = "30px";

    checkedBtn.append(iconChecked);
    todoActions.append(checkedBtn);

    checkedBtn.addEventListener("click", () => {
        let uncheckedBtn = createUncheckedBtn(todoActions, todoDivFlex, todo);
        checkedBtn.replaceWith(uncheckedBtn);
        todoDivFlex.dataset.completed = "false";
        todo.completed = false;
        saveUserData(currentUser, todos); 
    });
    
    return checkedBtn;
};

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

        task.style.visibility = (isCategoryMatch && isStatusMatch) ? "visible" : "hidden";
        task.style.position = (isCategoryMatch && isStatusMatch) ? "relative" : "absolute";

    });
};

const sortTasks = () => {
    let tasks = Array.from(document.querySelectorAll(".todoDivFlex"));
    let sortOption = document.querySelector("#sort-dropdown-todo").value;

    tasks.sort((a, b) => {
        let aDeadline = new Date(a.querySelector("#todoDeadline").textContent.match(/Deadline:\s*(\d{4}-\d{2}-\d{2})/)[1]);
        let bDeadline = new Date(b.querySelector("#todoDeadline").textContent.match(/Deadline:\s*(\d{4}-\d{2}-\d{2})/)[1]);
        let aTimeEstimate = parseFloat(a.querySelector("#todoTimeEstimate").textContent.match(/Tidsestimat:\s*(\d+)/)?.[1] || 0);
        let bTimeEstimate = parseFloat(b.querySelector("#todoTimeEstimate").textContent.match(/Tidsestimat:\s*(\d+)/)?.[1] || 0);
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

    todos.forEach(todo => createTodoBox(todo));

    sortTasks();

    document.querySelectorAll('input[name="filter-category-checkbox-todo"]').forEach(checkbox => {
        checkbox.addEventListener("change", filterTasks);
    });

    document.querySelector("#filter-status-done").addEventListener("change", filterTasks);
    document.querySelector("#filter-status").addEventListener("change", filterTasks);