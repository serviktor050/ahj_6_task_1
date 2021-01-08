export default class WorkDisplay {
    constructor() {
        this.todo = document.querySelector('#todo .item-tasks');
        this.inProgress = document.querySelector('#in-progress .item-tasks');
        this.done = document.querySelector('#done .item-tasks');
    }

    addTask (parentElement, value) {
        const itemTask = document.createElement('div');
        itemTask.className = 'item-task';
        itemTask.innerHTML = `
        ${value}
        <div class="delete-tas hidden">&#x2716;</div>
        `;
        parentElement.append(itemTask);
    }

    addArrayTasks(parentElement, array) {
        for (let i = 0; i < array.length; i += 1) {
          this.addTask(parentElement, array[i]);
        }
    }
    
    initTasks(data) {
    this.addArrayTasks(this.todo, data.todo);
    this.addArrayTasks(this.inProgress, data.inProgress);
    this.addArrayTasks(this.done, data.done);
  }
}