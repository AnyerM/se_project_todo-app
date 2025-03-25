class FormValidator {
    constructor(formEl, settings) {
        this._formEl = formEl;
        this._inputSelector = settings.inputSelector;
        this._formSelector = settings.formSelector;
        this._submitBtnSelector = settings.submitButtonSelector;
        this._errorClass = settings.errorClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._inactiveButtonClass = settings.inactiveButtonClass;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formEl.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formEl.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(
                inputElement,
                inputElement.validationMessage,
                
            );
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => 
           !inputElement.validity.valid);
      }
      

      _toggleButtonState() {
        const submitButton = this._formEl.querySelector(this._submitBtnSelector);
        if (this._hasInvalidInput()) {
          submitButton.classList.add(this._inactiveButtonClass);
          submitButton.disabled = true;
         } else {
           submitButton.classList.remove(this._inactiveButtonClass);
           submitButton.disabled = false;
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
              this._toggleButtonState();
            });
          });
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