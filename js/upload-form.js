'use strict';

(function () {

  var URL = 'https://js.dump.academy/kekstagram';
  var SUCCESS_CODE = 200;

  var uploadForm = document.querySelector('.img-upload__form');
  var uploadOverlayForm = uploadForm.querySelector('.img-upload__overlay');
  var submitButton = uploadForm.querySelector('.img-upload__submit');

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess();
      } else {
        onError();
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  var onUploadFormSubmit = function (evt) {
    upload(new FormData(uploadForm), onSuccessResponse, onErrorResponse);
    evt.preventDefault();
  };

  var onSubmitButtonMouseup = function (evt) {
    if (evt.code === 'Enter' && evt.target === submitButton) {
      onUploadFormSubmit();
    }
  };

  // действия на отправку формы
  var onSuccessResponse = function () {
    uploadOverlayForm.classList.add('hidden');
    window.effects.setOriginFilter();
    uploadForm.reset();
    window.successMessage.renderSuccessMessage();
  };

  // действия при ошибке отправки  формы
  var onErrorResponse = function () {
    uploadOverlayForm.classList.add('hidden');
    window.effects.setOriginFilter();
    uploadForm.reset();
    window.errorMessage.renderErrorMessage();
  };

  uploadForm.addEventListener('submit', onUploadFormSubmit);
  submitButton.addEventListener('mouseup', onSubmitButtonMouseup);
})();
