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
                
            );
        } else {
            hideInputError(inputElement);
        }
    }

    _setEventListeners() {
        this._inputList = Array.from(
            this._formEl.querySelectorAll(this._inputSelector),
          );
          
        
          this._toggleButtonState();
        
          this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
              this._checkInputValidity( inputElement);
              toggleButtonState();
            });
          });
    }

    _toggleButtonState() {
         const submitButton = this._formEl.querySelector(this._submitBtnSelector);
         if (this._hasInvalidInput()) {
           submitButton.disabled = true;
          } else {
            submitButton.disabled = false;
          }
    }


    enableValidation() {
        this._formEl.addEventListener("submit", (evt) => {
          evt.preventDefault();
        });
        this._setEventListeners();
    }

    resetValidation() {
        this._inputList.forEach((inputElement) => {
            hideInputError(inputElement);
        });
    }
}

export default FormValidator;