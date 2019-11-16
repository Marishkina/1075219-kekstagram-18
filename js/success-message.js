'use strict';

(function () {

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successButton = successTemplate.querySelector('.success__button');

  var closeSuccessMessage = function () {
    document.querySelector('.success').remove();

    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    successButton.removeEventListener('keydown', onSuccessButtonKeydown);
  };

  var onDocumentKeydown = function (evt) {
    window.utils.isEscEvent(evt, closeSuccessMessage);
  };

  var onDocumentClick = function () {
    closeSuccessMessage();
  };

  var onSuccessButtonKeydown = function (evt) {
    window.utils.isEnterEvent(evt, closeSuccessMessage);
  };

  window.successMessage = {

    render: function () {
      var successMessageFragment = document.createDocumentFragment();

      var successElement = successTemplate.cloneNode(true);
      successMessageFragment.appendChild(successElement);
      document.querySelector('main').appendChild(successMessageFragment);

      document.addEventListener('click', onDocumentClick);
      document.addEventListener('keydown', onDocumentKeydown);
      successButton.addEventListener('keydown', onSuccessButtonKeydown);
    }
  };
})();
