export default class LocalStorage {
    save(data) {
        localStorage.setItem('tasks', JSON.stringify(data))
    };

    load() {
        return localStorage.getItem('tasks')
    };
}