'use strict';

(function () {

  var URL = 'https://js.dump.academy/kekstagram';

  var uploadForm = document.querySelector('.img-upload__form');
  var uploadOverlayForm = uploadForm.querySelector('.img-upload__overlay');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successButton = successTemplate.querySelector('.success__button');
  var submitButton = uploadForm.querySelector('.img-upload__submit');

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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

  uploadForm.addEventListener('submit', onUploadFormSubmit);
  submitButton.addEventListener('mouseup', onSubmitButtonMouseup);

  // действия на отправку формы
  var onSuccessResponse = function () {
    uploadOverlayForm.classList.add('hidden');
    window.setOriginFilter();
    uploadForm.reset();
    renderSuccessMessage();
  };

  // действия при ошибке отправки  формы
  var onErrorResponse = function () {
    uploadOverlayForm.classList.add('hidden');
    window.setOriginFilter();
    uploadForm.reset();
    window.renderErrorMessage();
  };

  var renderSuccessMessage = function () {
    var successMessageFragment = document.createDocumentFragment();

    var successElement = successTemplate.cloneNode(true);
    successMessageFragment.appendChild(successElement);
    document.querySelector('main').appendChild(successMessageFragment);

    document.addEventListener('click', onSuccessButtonsClick);
    document.addEventListener('keydown', onDocumentEscdown);
    successButton.addEventListener('keydown', onSuccessButtonEnterdown);
  };

  var closeSuccessMessage = function () {
    document.querySelector('.success').remove();

    // убираем слушатели
    document.removeEventListener('click', onSuccessButtonsClick);
    document.removeEventListener('keydown', onDocumentEscdown);
    successButton.removeEventListener('keydown', onSuccessButtonEnterdown);
  };

  var onSuccessButtonsClick = function () {
    closeSuccessMessage();
  };

  var onDocumentEscdown = function (evt) {
    window.util.isEscEvent(evt, closeSuccessMessage);
  };

  var onSuccessButtonEnterdown = function (evt) {
    window.util.isEnterEvent(evt, closeSuccessMessage);
  };
})();
