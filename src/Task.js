export default class Task {  
  constructor (name, index) {
    this._name = name;
    this._index = index;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get index() {
    return this._index;
  }

  set index(value) {
    this._index = value;
  }
}