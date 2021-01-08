import initData from './initData.js';
import WorkDislay from './classes/WorkDisplay.js';
import LocalStorage from './classes/Storage.js';

const workDisplay = new WorkDislay();
const storage = new LocalStorage();

let draggedElement = null;
let ghostOfElement = null;
let elementWidth;
let elementHeight;
let elementTop;
let elementLeft;
const tasks = document.querySelector('#tasks');

function DragAndDrop(event, element) {
  const closest = document.elementFromPoint(event.clientX, event.clientY);
  const { top } = closest.getBoundingClientRect();

  if (closest.classList.contains('item-task')) {
    if (event.pageY > window.scrollY + top + closest.offsetHeight / 2) {
      closest.closest('.item-tasks').insertBefore(element, closest.nextElementSibling);
    } else {
      closest.closest('.item-tasks').insertBefore(element, closest);
    }
  } else if (closest.classList.contains('item-tasks') && !closest.querySelector('.item-task')) {
    closest.append(element);
  }
}

function toObjTasks() {
  const todo = document.querySelectorAll('#todo .item-tasks .item-task');
  const inProgress = document.querySelectorAll('#in-progress .item-tasks .item-task');
  const done = document.querySelectorAll('#done .item-tasks .item-task');
  
  const objTasks = {
    todoObJ: [],
    inProgressObJ: [],
    doneObJ: [],
  };

  for (const item of todo) {
    objTasks.todoObJ.push(item.textContent.replace(' ✖', ''));
  }

  for (const item of inProgressTasks) {
    objTasks.inProgressObJ.push(item.textContent.replace(' ✖', ''));
  }

  for (const item of doneTasks) {
    objTasks.doneObJ.push(item.textContent.replace(' ✖', ''));
  }

  storage.save(objTasks);

}
