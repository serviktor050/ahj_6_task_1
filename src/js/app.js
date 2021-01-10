import initData from './initData.js';
import WorkDislay from './classes/WorkDisplay.js';
import Storage from './classes/Storage.js';

const workDisplay = new WorkDislay();
const storage = new Storage();

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

  for (const item of inProgress) {
    objTasks.inProgressObJ.push(item.textContent.replace(' ✖', ''));
  }

  for (const item of done) {
    objTasks.doneObJ.push(item.textContent.replace(' ✖', ''));
  }

  storage.save(objTasks);
}

document.addEventListener('DOMContentLoaded', () => {
  const localStorageData = JSON.parse(storage.load());
  if (localStorageData.todoObJ.length === 0 && localStorageData.inProgressObJ.length === 0
    && localStorageData.doneObJ.length === 0) {
    workDisplay.initTasks(initData());
  } else {
    workDisplay.initTasks(localStorageData);
  }
});

tasks.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('add-task')) {
    event.target.parentNode.querySelector('.input-task').classList.remove('hidden');
    event.target.classList.add('hidden');
  } else if (event.target.classList.contains('button-cancel-task')) {
    event.target.closest('.column-tasks').querySelector('.add-task').classList.remove('hidden');
    event.target.parentNode.classList.add('hidden');
  } else if (event.target.classList.contains('button-add-task')) {
    const ElementAddTask = event.target.closest('.column-tasks').querySelector('.item-tasks');
    const ElementInput = event.target.closest('.input-task').querySelector('#text-task');
    workDisplay.addTask(ElementAddTask, ElementInput.value);
    ElementInput.value = '';
    event.target.closest('.column-tasks').querySelector('.add-task').classList.remove('hidden');
    event.target.parentNode.classList.add('hidden');
    toObjTasks();
  } else if (event.target.classList.contains('delete-task')) {
    const deleteElement = event.target.parentNode;
    deleteElement.parentNode.removeChild(deleteElement);
    toObjTasks();
  } else if (event.target.classList.contains('item-task')) {
    event.preventDefault();
    event.target.querySelector('.delete-task').classList.add('hidden');
    const { top, left } = event.target.getBoundingClientRect();
    draggedElement = event.target;
    elementWidth = draggedElement.offsetWidth;
    elementHeight = draggedElement.offsetHeight;
    elementLeft = event.pageX - left;
    elementTop = event.pageY - top;

    ghostOfElement = event.target.cloneNode(true);
    ghostOfElement.innerHTML = '';
    ghostOfElement.style.backgroundColor = 'blue';
    ghostOfElement.style.width = `${elementWidth}px`;
    ghostOfElement.style.height = `${elementHeight}px`;

    draggedElement.classList.add('dragged');
    event.target.parentNode.insertBefore(ghostOfElement, event.target.nextElementSibling);

    draggedElement.style.left = `${event.pageX - elementLeft}px`;
    draggedElement.style.top = `${event.pageY - elementTop}px`;
    draggedElement.style.width = `${elementWidth}px`;
    draggedElement.style.height = `${elementHeight}px`;
  }
});

tasks.addEventListener('mouseleave', (event) => {
  if (draggedElement) {
    event.preventDefault();
    ghostOfElement.parentNode.removeChild(ghostOfElement);
    draggedElement.classList.remove('dragged');
    draggedElement.style = '';
    ghostOfElement = null;
    draggedElement = null;
  }
});

tasks.addEventListener('mousemove', (event) => {
  if (draggedElement) {
    event.preventDefault();
    DragAndDrop(event, ghostOfElement);
    draggedElement.style.left = `${event.pageX - elementLeft}px`;
    draggedElement.style.top = `${event.pageY - elementTop}px`;
  }
});

tasks.addEventListener('mouseup', (event) => {
  if (draggedElement) {
    DragAndDrop(event, draggedElement);
    ghostOfElement.parentNode.removeChild(ghostOfElement);
    draggedElement.classList.remove('dragged');
    draggedElement.style = '';
    ghostOfElement = null;
    draggedElement = null;
    toObjTasks();
  }
});
