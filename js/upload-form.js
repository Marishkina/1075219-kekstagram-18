'use strict';

(function () {

  var uploadForm = document.querySelector('.img-upload__form');
  var uploadOverlayForm = uploadForm.querySelector('.img-upload__overlay');
  var submitButton = uploadForm.querySelector('.img-upload__submit');

  var onUploadFormSubmit = function (evt) {
    window.backend.upload(new FormData(uploadForm), onSuccessResponse, onErrorResponse);
    evt.preventDefault();
  };

  var onSubmitButtonClick = function (evt) {
    if (evt.code === 'Enter' && evt.target === submitButton) {
      onUploadFormSubmit();
    }
  };

  // действия на отправку формы
  var onSuccessResponse = function () {
    uploadOverlayForm.classList.add('hidden');
    window.effects.setOriginFilter();
    uploadForm.reset();
    window.successMessage.render();
  };

  // действия при ошибке отправки  формы
  var onErrorResponse = function () {
    uploadOverlayForm.classList.add('hidden');
    window.effects.setOriginFilter();
    uploadForm.reset();
    window.errorMessage.render();
  };

  uploadForm.addEventListener('submit', onUploadFormSubmit);
  submitButton.addEventListener('click', onSubmitButtonClick);
})();
