export default class FormValidator {
  constructor(formElement, config) {
    this._form = formElement;
    this._config = config;
  }

  _showInputError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    if (error) error.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass);
    if (error) error.textContent = '';
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) this._showInputError(input);
    else this._hideInputError(input);
  }

  _toggleButtonState() {
    const button = this._form.querySelector(this._config.submitButtonSelector);
    const inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    const hasInvalid = inputs.some(i => !i.validity.valid);
    if (button) {
      button.disabled = hasInvalid;
      button.classList.toggle(this._config.inactiveButtonClass, hasInvalid);
    }
  }

   resetValidation() {
    
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });

    
    this._toggleButtonState();
  }


  _setEventListeners() {
    const inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }

  enableValidation() {
    this._form.addEventListener('submit', e => e.preventDefault());
    this._setEventListeners();
  }
}
