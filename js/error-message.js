'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorButtons = errorTemplate.querySelectorAll('.error__button');


  window.errorMessage = {
    renderErrorMessage: function () {
      var errorMessageFragment = document.createDocumentFragment();

      var errorElement = errorTemplate.cloneNode(true);
      errorMessageFragment.appendChild(errorElement);
      document.querySelector('main').appendChild(errorMessageFragment);

      document.addEventListener('click', onErrorButtonsClick);
      document.addEventListener('keydown', onDocumentEscdown);
      errorButtons.forEach(function (element) {
        element.addEventListener('click', onErrorButtonsClick);
      });
      errorButtons.forEach(function (element) {
        element.addEventListener('keydown', onErrorButtonEnterdown);
      });
    }
  };

  var closeErrorMessage = function () {
    document.querySelector('.error').remove();

    document.removeEventListener('click', onErrorButtonsClick);
    document.removeEventListener('keydown', onDocumentEscdown);
    errorButtons.forEach(function (element) {
      element.addEventListener('click', onErrorButtonsClick);
    });
    errorButtons.forEach(function (element) {
      element.removeEventListener('keydown', onErrorButtonEnterdown);
    });
  };

  var onErrorButtonsClick = function () {
    closeErrorMessage();
  };

  var onDocumentEscdown = function (evt) {
    window.utils.isEscEvent(evt, closeErrorMessage);
  };

  var onErrorButtonEnterdown = function (evt) {
    window.utils.isEnterEvent(evt, closeErrorMessage);
  };
})();
