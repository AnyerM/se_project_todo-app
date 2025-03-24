class FormValidator {
    constructor(formEl, settings) {
        this._formEl = formEl;
        this._inputSelector = settings.inputSelector;
        this._formSelector = settings.formSelector;
        this._submitBtnSelector = settings.submitBtnSelector;
        this._errorClass = settings.errorClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._inactiveButtonClass = settings.inactiveButtonClass;
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            showInputError(
                inputElement,
                inputElement.validationMessage,
                settings,
            );
        } else {
            hideInputError(inputElement, settings);
        }
    }

    _setEventListeners() {
        this._inputList = Array.from(
            this._formEl.querySelectorAll(this._inputSelector),
          );
          this._buttonElement = formElement.querySelector(this._submitButtonSelector);
        
          toggleButtonState( buttonElement);
        
          this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
              this._checkInputValidity( inputElement);
              toggleButtonState(inputList, buttonElement, settings);
            });
          });
    }

    enableValidation() {
        this._formElement.addEventListener("submit", (evt) => {
          evt.preventDefault();
        });
        this._setEventListeners();
    }
}

export default FormValidator;