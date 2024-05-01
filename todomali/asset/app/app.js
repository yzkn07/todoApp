window.addEventListener("load", loadTodos)

function loadTodos() {
        todos.forEach(todo => {
            renderTodos(todo.todo, todo.kalanGun);
        });
}
let todos = JSON.parse(localStorage.getItem("todos")) || [];

const todosContainer = document.querySelector(".todos")
const todoInput = document.querySelector(".todoInputText")

const addTaskForm = document.querySelector(".todoForm")
const today = new Date();


const addTask = (e) => {
    e.preventDefault()

    
    const formData = new FormData(e.target)
    const todo = formData.get("todo")
    const endDay = formData.get("endDay")
    const finallyEndDate = endDay.replaceAll("-", ".").split(".").reverse().join(".")
    const endDate = new Date(endDay)
    
    const zamanFarki = endDate.getTime() - today.getTime()
    const kalanGun = Math.ceil(zamanFarki / (1000 * 3600 *24));
    
    const newTodo = {
        todo,
        addedDay : today.toLocaleDateString(),
        finallyEndDate,
        kalanGun,
        isCompleted : false
    }
    
    todos.push(newTodo)

    
    localStorage.setItem("todos", JSON.stringify(todos))

    console.log(todos);
    
    if (todoInput.value === "") {
        alert("Lütfen bir görev ekleyin")
    } else {
        renderTodos(todoInput.value, kalanGun)
    }
    
    
}

addTaskForm.addEventListener("submit", addTask)

function renderTodos(todoText, leftedDay) {
    const todoItemsElement = document.createElement("li")
    todoItemsElement.classList.add("todoItems")
    const divTodoItem = document.createElement("div")
    divTodoItem.classList.add("divTodoItem")
    
    // completed todo button ekleme
    const completedTodoButton = document.createElement("button")
    completedTodoButton.classList.add("completedTodoButton")
    completedTodoButton.innerText = "tamamla"
    
    
    // paragraf ekleme
    const todoTextElement = document.createElement("p")
    todoTextElement.innerText = todoText;
    todoTextElement.classList.add("todoItem") 

    // kalan gün sayısını ekleme 
    const todoItemLeftDays = document.createElement("p")
    todoItemLeftDays.classList.add("todoItemLeftDays")
    todoItemLeftDays.innerText = leftedDay + " gün kaldı."
    
    // edit ve sil butonlarını ekleme
    const divTodoItemsButtons = document.createElement("div")
    divTodoItemsButtons.classList.add("todoItemsButtons")
    
    const editButton = document.createElement("button")
    editButton.classList.add("edit")
    editButton.innerText = "düzenle"
    
    const deleteButton = document.createElement("button")
    deleteButton.classList.add("delete")
    deleteButton.innerText = "sil"
    
    todosContainer.appendChild(todoItemsElement)
    todoItemsElement.appendChild(divTodoItem)
    divTodoItem.appendChild(completedTodoButton)
    divTodoItem.appendChild(todoTextElement)
    divTodoItem.appendChild(todoItemLeftDays)
    todoItemsElement.appendChild(divTodoItemsButtons)
    divTodoItemsButtons.appendChild(editButton)
    divTodoItemsButtons.appendChild(deleteButton)


    todoInput.value = ""
    todoInput.focus();

}

// eklenmiş olan tasklardan görev silme

todosContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
       const todoText = e.target.parentElement.parentElement.querySelector(".todoItem").innerText;

       todos = todos.filter(todo => todo.todo !== todoText);

       localStorage.setItem('todos', JSON.stringify(todos));

        // Silinen görevi ekrandan kaldır
        e.target.parentElement.parentElement.remove();

    }else {
        console.log("dışarıya tıkladın");
    }
})

