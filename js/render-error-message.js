'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorButtons = errorTemplate.querySelectorAll('.error__button');

  window.renderErrorMessage = function () {
    var errorMessageFragment = document.createDocumentFragment();

    var errorElement = errorTemplate.cloneNode(true);
    errorMessageFragment.appendChild(errorElement);
    document.querySelector('main').appendChild(errorMessageFragment);

    // слушатели для закрытия окна с ошибкой
    document.addEventListener('click', onErrorButtonsClick);
    document.addEventListener('keydown', onDocumentEscdown);
    errorButtons.forEach(function (element) {
      element.addEventListener('click', onErrorButtonsClick);
    });
    errorButtons.forEach(function (element) {
      element.addEventListener('keydown', onErrorButtonEnterdown);
    });
  };

  var closeErrorMessage = function () {
    document.querySelector('.error').remove();

    // убираем слушатели
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
    window.util.isEscEvent(evt, closeErrorMessage);
  };

  var onErrorButtonEnterdown = function (evt) {
    window.util.isEnterEvent(evt, closeErrorMessage);
  };
})();
