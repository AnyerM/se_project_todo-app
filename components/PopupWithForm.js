import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputList = this._form ? this._form.querySelectorAll('.popup__input') : [];
    this._submitButton = this._form ? this._form.querySelector('.popup__save-btn') : null;
    this._defaultText = this._submitButton ? this._submitButton.textContent : '';
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach(input => values[input.name] = input.value);
    return values;
  }

  setEventListeners() {
    
    
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        super.setEventListeners();
      });
    
  }

getForm() {
    return this._popupForm;
  }

}
