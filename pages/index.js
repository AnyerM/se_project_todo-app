import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from '../components/TodoCounter.js';


const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
const todosListSelector = ".todos__list";

const todoCounter = new TodoCounter(initialTodos, '.counter__text');


function handleCheck(completed)  {
    todoCounter.updateCompleted( completed);
}

function handleDelete(completed)  {
  todoCounter.updateTotal(false); // decrement total count
  if (completed) {
    // Decrement completed count only if todo was completed
    todoCounter.updateCompleted(false);
  }
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView(); return todoElement;
  
};


const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  },
  containerSelector: todosListSelector,
});

section.renderItems();


const addTodoPopup = new PopupWithForm(
  "#add-todo-popup",
  (data) => {
    const name = data.name.trim();
    const dateInput = data.date;
    if (!name) return;

    const date = dateInput ? new Date(dateInput) : null;
    if (date) {
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    }
    const newTodoData = { name, date, id: uuidv4() };
    const todoElement = generateTodo(newTodoData);
    section.addItem(todoElement);

    todoCounter.updateTotal(true); 
    
    addTodoForm.reset();

    addTodoPopup.close();
  }
);


addTodoPopup.setEventListeners();


addTodoButton.addEventListener("click", () => addTodoPopup.open());


const newTodoValidator = new FormValidator(addTodoForm, validationConfig);
newTodoValidator.enableValidation();
