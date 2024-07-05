// DOM ELEMEMTS
const taskTodoList = document.getElementById("taskTodoList");
const taskProgressList = document.getElementById("taskProgressList");
const taskDoneList = document.getElementById("taskDoneList");
const taskBlockedList = document.getElementById("taskBlockedList");
const addTaskBtn = document.getElementById("addTaskBtn");
const saveBtn = document.getElementById("save-btn");
const taskInput = document.getElementById("task-input");
const taskStatus = document.getElementById("status");
const editing = document.getElementsByClassName("edit");
const taskNbr = document.getElementsByClassName("text-secondary");
let isEdited = false;
let editIndex = -1;
let todoCountEl = document.getElementById("todoCount");
let progressCountEl = document.getElementById("progressCount");
let doneCountEl = document.getElementById("doneCount");
let blockedCountEl = document.getElementById("blockedCount");
// VARIABLES FOR TASK
const tasks = [
  // {
  //   name: "Task One",
  //   status: "TODO",
  // },
  // {
  //   name: "Task Two",
  //   status: "INPROGRESS",
  // },
  // {
  //   name: "Task Three",
  //   status: "BLOCKED",
  // },
];

function draw() {
  taskTodoList.innerHTML = "";
  taskProgressList.innerHTML = "";
  taskDoneList.innerHTML = "";
  taskBlockedList.innerHTML = "";
  let todoCount = 0;
  let progressCount = 0;
  let doneCount = 0;
  let blockedCount = 0;

  for (let i = 0; i < tasks.length; i++) {
    console.log("TASKS", tasks);
    const newTaskCard = `
    <div class="d-flex justify-content-between align-items-center border border-1 rounded p-2 ${getStatusColor(
      tasks[i].status
    )}">
    <span>${tasks[i].name}</span>
    <div>
        <button class="btn"
        data-bs-toggle="modal"
          data-bs-target="#taskModal"
         onclick="editTask(${i})">
    
        <i class="bi bi-pencil"></i>
        </button>
        <button class="btn">
        <i class="bi bi-trash" onclick="deleteTask(${i})"></i>
        </button>
    </div>
    </div>
`;

    switch (tasks[i].status) {
      case "TODO": {
        taskTodoList.innerHTML += newTaskCard;
        todoCount++;
        break;
      }
      case "INPROGRESS": {
        taskProgressList.innerHTML += newTaskCard;
        progressCount++;
        break;
      }
      case "DONE": {
        taskDoneList.innerHTML += newTaskCard;
        doneCount++;
        break;
      }
      case "BLOCKED": {
        taskBlockedList.innerHTML += newTaskCard;
        blockedCount++;
        break;
      }
      default: {
        console.log("Error");
      }
    }
  }
  // display view
  todoCountEl.textContent = todoCount;
  progressCountEl.textContent = progressCount;
  doneCountEl.textContent = doneCount;
  blockedCountEl.textContent = blockedCount;
}

saveBtn.addEventListener("click", function () {
  if (isEdited) {
    tasks[editIndex].name = taskInput.value;
    tasks[editIndex].status = taskStatus.value;
    isEdited = false;
  } else {
    const newTask = {
      name: taskInput.value,
      status: taskStatus.value,
    };
    tasks.push(newTask);
  }
  taskInput.value = "";
  taskStatus.value = "TODO";
  draw();
});

const deleteTask = (taskIndex) => {
  console.log(tasks);
  tasks.splice(taskIndex, 1);
  draw();
  console.log("Task deleted", taskIndex);
};
draw();
const editTask = (taskIndex) => {
  console.log(taskIndex);
  taskInput.value = tasks[taskIndex].name;
  taskStatus.value = tasks[taskIndex].status;
  isEdited = true;
  editIndex = taskIndex;
};

function getStatusColor(status) {
  switch (status) {
    case "TODO": {
      return null;
    }
    case "INPROGRESS": {
      return "border-warning";
    }
    case "DONE": {
      return "border-success";
    }
    case "BLOCKED": {
      return "border-danger";
    }
  }
}
