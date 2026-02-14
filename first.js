let tasks = [];
let completed = [];
window.onload = () => {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  



  document.getElementById("addBtn").addEventListener("click", addNewTask);
  document.getElementById("showAll").addEventListener("click", displayAllTasks);
  document.getElementById("showCompleted").addEventListener("click", displayCompleted);
  document.getElementById("showPending").addEventListener("click", displayPending);
  displayAllTasks()
  };

// ADD TASK
const addNewTask = () => {
  let input = document.getElementById("taskInput");
  let text = input.value.trim();
  if(tasks.includes(text)){
    alert("task already exists")
    return;
  }
  

  if( text==="" ||tasks.includes(text)) {
    alert("please enter a valid task")
    return;
  }


  tasks.push({
    text: text,
    completed: false
  });

  input.value = "";
  save();
  displayAllTasks();
};

// SAVE STORAGE
const save = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// DISPLAY ALL
const displayAllTasks = () => {
  render(tasks);
};

// DISPLAY COMPLETED
const displayCompleted = () => {
  let completed = tasks.filter(t => t.completed);
  render(completed);
};

// DISPLAY PENDING
const displayPending = () => {
  let pending = tasks.filter(t => !t.completed);
  render(pending);
};

// RENDER FUNCTION
const render = (array) => {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  array.forEach((task, index) => {
    let realIndex = tasks.indexOf(task);

    let li = document.createElement("li");

    li.innerHTML = `
      <span style="text-decoration:${task.completed ? 'line-through' : 'none'}">
        ${task.text}
      </span>
      <button onclick="markAsCompleted(${realIndex})">Complete</button>
      <button onclick="deleteTask(${realIndex})">Delete</button>
    `;

    taskList.appendChild(li);
  });
};

// DELETE
const deleteTask = (index) => {
  tasks.splice(index, 1);
  save();
  displayAllTasks();
};

// COMPLETE
const markAsCompleted = (index) => {
  tasks[index].completed = !tasks[index].completed;
  
  save();
  displayAllTasks();
};