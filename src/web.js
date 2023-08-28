import Storage from "./Storage.js";
import Task from "./Task.js";

const storage = new Storage();
const contents = document.querySelector('.contents');
let index = 0;

/*---------- Load ----------*/
/*---------- Load ----------*/
/*---------- Load ----------*/

loadWeb();

function loadWeb() {
    storage.loadList();
    index = storage.loadIndex();
    loadTasks();
}

function loadTasks() {
    deleteTasks();
    for (let task of storage.list) {
        console.log(task);
        contents.appendChild(createTasks(task));
    }
}

function createTasks(task) {
    let content = document.createElement('div');
    content.classList.add('content');
    content.id = `content__${task._index}`;

    let checkbox = document.createElement('input');
    checkbox.classList.add('content-check');
    checkbox.type = 'checkbox';


    checkbox.addEventListener('change', (e) => {
        if (checkbox.checked) {
            checked(e, task._index)
        }
    });

    let content_info = document.createElement('div');
    content_info.classList.add('content-info');

    let content_name = document.createElement('p');
    content_name.classList.add('content-name');
    content_name.innerText = task._name;

    let content_icon_container = document.createElement('div');
    content_icon_container.classList.add('content-icon-container');

    let content_modify_icon = document.createElement('img');
    let content_delete_icon = document.createElement('img');
    content_modify_icon.classList.add('icon', 'icon-button', 'content-modify-icon');
    content_delete_icon.classList.add('icon', 'icon-button', 'content-delete-icon');
    content_modify_icon.src = 'assets/icons/pencil.svg';
    content_delete_icon.src = 'assets/icons/backspace.svg';

    content_modify_icon.addEventListener('click', () => modifyTask(task._index));
    content_delete_icon.addEventListener('click', () => deleteTask(task._index));

    content_info.appendChild(content_name);
    content_icon_container.append(content_modify_icon, content_delete_icon);
    content.append(checkbox, content_info, content_icon_container);

    return content;
}

/*---------- Create ----------*/
/*---------- Create ----------*/
/*---------- Create ----------*/

let create_button = document.querySelector('.header__add');
create_button.addEventListener('click', (e) => addTask());

/* 콘텐츠 : 새 콘텐츠 생성하기 */
function addTask(name = null) {
    let content = document.createElement('div');
    content.classList.add('content', 'content-create');

    createForm(content, name);

    contents.appendChild(content);

}

function createForm (div, name) {
    let checkbox = document.createElement('input');
    checkbox.classList.add('content-check');
    checkbox.type = 'checkbox';

    let form = document.createElement('form');
    let content_info = document.createElement('input');
    
    content_info.classList.add('content-info');
    content_info.name = 'name';
    content_info.value = name;
    
    let buttons = document.createElement('div');
    buttons.classList.add('content-createButtons');

    let create = document.createElement('button');
    let cancle = document.createElement('button');
    create.type = 'submit';
    cancle.type = 'reset';
    create.innerText = '생성';
    cancle.innerText = '취소';

    create.addEventListener('click', (e) => addTaskSubmit(e, form));
    cancle.addEventListener('click', (e) => {
        e.preventDefault();
        contents.removeChild(contents.lastChild);
    });

    buttons.append(create, cancle);
    form.append(content_info, buttons);
    div.append(checkbox, form, buttons);
}

function addTaskSubmit(e, form) {
    e.preventDefault();
    storage.addTask(form.name.value, index++);
    storage.saveIndex(index);
    loadWeb();
}

function checked(e, index) {
    e.preventDefault();
    storage.deleteTask(index);

    setTimeout(() => loadWeb(), 1000);
}

/*---------- Delete and Modify ----------*/
/*---------- Delete and Modify ----------*/
/*---------- Delete and Modify ----------*/

function deleteTask(index) {
    if (warningTask(true)) {
        console.log(index);
        storage.deleteTask(index);
        loadWeb();
    }
}

function modifyTask(index) {
    // if (warningTask(false)) {
        let modifyTask = document.querySelector(`#content__${index}`);
        modifyTasks(modifyTask);
        modifyForm(modifyTask, storage.getTask(index)._name, index);
    // }
}

function modifyForm (div, name, index) {
    let checkbox = document.createElement('input');
    checkbox.classList.add('content-check');
    checkbox.type = 'checkbox';

    let form = document.createElement('form');
    let content_info = document.createElement('input');
    
    content_info.classList.add('content-info');
    content_info.name = 'name';
    content_info.value = name;
    
    let buttons = document.createElement('div');
    buttons.classList.add('content-createButtons');

    let create = document.createElement('button');
    let cancle = document.createElement('button');
    create.type = 'submit';
    cancle.type = 'reset';
    create.innerText = '완료';
    cancle.innerText = '취소';

    create.addEventListener('click', (e) => {
        storage.modifyTask(form.name.value, index);
        loadWeb();
    });
    cancle.addEventListener('click', (e) => {
        e.preventDefault();
        loadWeb();
    });

    buttons.append(create, cancle);
    form.append(content_info, buttons);
    div.append(checkbox, form, buttons);
}

function warningTask(isDelete) {
    let type = isDelete ? '삭제' : '수정';
    return confirm(`${type}하시겠습니까?`);
}

function deleteTasks() {
    while (contents.firstChild) {
        contents.removeChild(contents.firstChild);
    }
}

function modifyTasks(div) {
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}
