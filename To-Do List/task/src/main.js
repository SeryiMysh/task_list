let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

function createButton() {
    let button = document.createElement("button");



    button.innerHTML = "&times;";
    button.classList.add("delete-btn");
    button.addEventListener("click", () => {
        let arrayElement = button.previousSibling.innerText;
        let newArray = taskList.filter(element => element.text !== arrayElement);

        console.log(arrayElement);
        button.parentElement.remove();
        localStorage.setItem("tasks", JSON.stringify(newArray));
    });

    return button;
}

function createSpanElement(element) {
    let span = document.createElement("span");

    span.classList.add("task");

    if (element.checked) span.classList.add("complete");

    span.innerText = element.text;

    return span;
}

function createCheckboxElement(element) {
    let inputCheckbox = document.createElement("input");

    inputCheckbox.setAttribute("type", "checkbox");
    if (element.checked) {
        inputCheckbox.checked = element.checked;
    }

    inputCheckbox.addEventListener("click", () => {
        let span = inputCheckbox.nextSibling;
        let arrayItem = taskList.find( ({ text }, index) => text === span.innerText);

        console.log(arrayItem);
        arrayItem.checked = inputCheckbox.checked;

        if (inputCheckbox.checked) {
            span.classList.add("complete");
        } else {
            span.classList.remove("complete");
        }

        localStorage.setItem("tasks", JSON.stringify(taskList));
    }, false);

    return inputCheckbox;
}

function makeListItem(item) {
    let list = document.getElementById("task-list");
    let listItem = document.createElement("li");

    listItem.appendChild(createCheckboxElement(item));
    listItem.appendChild(createSpanElement(item));
    listItem.appendChild(createButton());

    console.log(item);

    list.appendChild(listItem);
}

function getFormData() {
    let questionItem = document.getElementById("input-task");
    let question = questionItem.value;

    questionItem.value = "";

    return question !== "" ? question : undefined;
}

function addItemToList() {
    let element = {}
    element.text = getFormData();
    if (element.text) {
        taskList.push(element);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        makeListItem(element);
    }
}

let buttonAdd = document.getElementById("add-task-button");
buttonAdd.addEventListener("click", addItemToList, false);

console.log(taskList);

document.addEventListener('DOMContentLoaded', () => {
    taskList.forEach(element => makeListItem(element));
}, false);