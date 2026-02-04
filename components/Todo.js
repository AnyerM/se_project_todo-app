export default class Todo {
  constructor(data, templateSelector, handleCheck, handleDelete) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
    this._element = null;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content.firstElementChild.cloneNode(true);
    return template;
  }

  _setupListeners() {
    const checkbox = this._element.querySelector('.todo__completed');
    const deleteBtn = this._element.querySelector('.todo__delete-btn');
    checkbox.checked = !!this._data.completed;
    checkbox.addEventListener('change', () => {
      this._data.completed = checkbox.checked;
      if (this._handleCheck) this._handleCheck(checkbox.checked);
    });
    deleteBtn.addEventListener('click', () => {
      if (this._handleDelete) this._handleDelete(this._data.completed, this._element);
      this._element.remove();
    });
  }

  getView() {
   this._element = this._getTemplate();
    const nameEl = this._element.querySelector('.todo__name');
    const dateEl = this._element.querySelector('.todo__date');
    nameEl.textContent = this._data.name || '';
    dateEl.textContent = this._data.date ? new Date(this._data.date).toLocaleDateString() : '';
    this._setupListeners();
    return this._element;
  }
}
