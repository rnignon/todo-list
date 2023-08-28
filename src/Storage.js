import Task from './Task.js';

export default class Storage {
    constructor () {
        this._list = [];
        this._index = 0;
    }

    get list() {
        return this._list;
    }

    set list(list) {
        this._list = list;
    }

    saveList() {
        console.log(this._list);
        localStorage.setItem('list', JSON.stringify(this._list));
    }

    loadList() {
        // localStorage.clear();
        this._list = Object.assign([], JSON.parse(localStorage.getItem('list')));
    }

    getTask(index) {
        return this._list.find(t => t._index == index);
    }

    addTask(name, index) {
        this._list.push(new Task(name, index));
        this.saveList();
    }

    modifyTask (name, index) {
        this._list[this._list.indexOf(this.getTask(index))] = new Task(name, index);
        this.saveList();
    }

    deleteTask(index) {
        this._list = this._list.filter(t => t._index != index);
        this.saveList();
    }

    saveIndex(index) {
        localStorage.setItem('index', index);
    }
    
    loadIndex() {
        if (localStorage.getItem('index')) return this._index = localStorage.getItem('index');
        else return 0;
    }
}