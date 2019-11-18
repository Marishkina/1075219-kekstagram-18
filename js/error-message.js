'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorButtons = errorTemplate.querySelectorAll('.error__button');

  var closeErrorMessage = function () {
    document.querySelector('.error').remove();

    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    errorButtons.forEach(function (element) {
      element.addEventListener('click', onErrorButtonsClick);
    });
    errorButtons.forEach(function (element) {
      element.removeEventListener('keydown', onErrorButtonsKeydown);
    });
  };

  var onErrorButtonsClick = function () {
    closeErrorMessage();
  };

  var onDocumentKeydown = function (evt) {
    window.utils.isEscEvent(evt, closeErrorMessage);
  };

  var onErrorButtonsKeydown = function (evt) {
    window.utils.isEnterEvent(evt, closeErrorMessage);
  };

  var onDocumentClick = function () {
    closeErrorMessage();
  };

  window.errorMessage = {
    render: function () {
      var errorMessageFragment = document.createDocumentFragment();

      var errorElement = errorTemplate.cloneNode(true);
      errorMessageFragment.appendChild(errorElement);
      document.querySelector('main').appendChild(errorMessageFragment);

      document.addEventListener('click', onDocumentClick);
      document.addEventListener('keydown', onDocumentKeydown);
      errorButtons.forEach(function (element) {
        element.addEventListener('click', onErrorButtonsClick);
      });
      errorButtons.forEach(function (element) {
        element.addEventListener('keydown', onErrorButtonsKeydown);
      });
    }
  };
})();
