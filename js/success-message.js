'use strict';

(function () {

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successButton = successTemplate.querySelector('.success__button');


  window.successMessage = {

    renderSuccessMessage: function () {
      var successMessageFragment = document.createDocumentFragment();

      var successElement = successTemplate.cloneNode(true);
      successMessageFragment.appendChild(successElement);
      document.querySelector('main').appendChild(successMessageFragment);

      document.addEventListener('click', onSuccessButtonsClick);
      document.addEventListener('keydown', onDocumentEscdown);
      successButton.addEventListener('keydown', onSuccessButtonEnterdown);
    }
  };

  var onDocumentEscdown = function (evt) {
    window.utils.isEscEvent(evt, closeSuccessMessage);
  };

  var closeSuccessMessage = function () {
    document.querySelector('.success').remove();

    document.removeEventListener('click', onSuccessButtonsClick);
    document.removeEventListener('keydown', onDocumentEscdown);
    successButton.removeEventListener('keydown', onSuccessButtonEnterdown);
  };

  var onSuccessButtonsClick = function () {
    closeSuccessMessage();
  };

  var onSuccessButtonEnterdown = function (evt) {
    window.utils.isEnterEvent(evt, closeSuccessMessage);
  };
})();
