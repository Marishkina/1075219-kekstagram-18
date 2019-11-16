'use strict';

(function () {

  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var uploadOverlayForm = uploadForm.querySelector('.img-upload__overlay');
  var closeButtonUploadOverlayForm = uploadOverlayForm.querySelector('#upload-cancel');
  var hashtagTextField = document.querySelector('input[name=hashtags]');
  var commentField = uploadForm.querySelector('.text__description');
  var scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
  var scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');
  var scaleControlValue = uploadForm.querySelector('.scale__control--value');
  var effectLevel = uploadForm.querySelector('.img-upload__effect-level');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var effectLevelValue = uploadForm.querySelector('.effect-level__value');
  var effectRadioButtons = uploadForm.querySelectorAll('.effects__radio');

  var openForm = function () {
    uploadOverlayForm.classList.remove('hidden');

    scaleControlValue.setAttribute('value', '100%');

    effectLevel.classList.add('visually-hidden');
    effectLevelValue.setAttribute('value', 100);
    effectLevelDepth.style.width = '100%';
    effectLevelPin.style.left = '100%';

    document.addEventListener('keydown', onDocumentKeydown);

    closeButtonUploadOverlayForm.addEventListener('click', onCloseButtonUploadOverlayFormClick);
    closeButtonUploadOverlayForm.addEventListener('keydown', onCloseButtonUploadOverlayFormKeydown);

    hashtagTextField.addEventListener('input', onHashtagTextFieldInput);
    commentField.addEventListener('change', onCommentFieldChange);

    scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
    scaleControlSmaller.addEventListener('keydown', onScaleControlSmallerKeydown);
    scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
    scaleControlBigger.addEventListener('keydown', onScaleControlBiggerKeydown);

    effectLevelPin.addEventListener('mousedown', onEffectLevelPinMousedown);
    effectRadioButtons.forEach(function (element) {
      element.addEventListener('change', onEffectRadioButtonsChange);
    });
  };

  var closeForm = function () {
    uploadOverlayForm.classList.add('hidden');

    uploadFile.value = '';

    window.effects.setOriginFilter();
    hashtagTextField.setCustomValidity('');
    commentField.setCustomValidity('');
    hashtagTextField.classList.remove('error-field');
    uploadForm.reset();

    document.removeEventListener('keydown', onDocumentKeydown);

    closeButtonUploadOverlayForm.removeEventListener('click', onCloseButtonUploadOverlayFormClick);
    closeButtonUploadOverlayForm.removeEventListener('keydown', onCloseButtonUploadOverlayFormKeydown);

    hashtagTextField.removeEventListener('input', onHashtagTextFieldInput);
    commentField.removeEventListener('change', onCommentFieldChange);

    scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
    scaleControlSmaller.removeEventListener('keydown', onScaleControlSmallerKeydown);
    scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);
    scaleControlBigger.removeEventListener('keydown', onScaleControlBiggerKeydown);

    effectLevelPin.removeEventListener('mousedown', onEffectLevelPinMousedown);
    effectRadioButtons.forEach(function (element) {
      element.removeEventListener('change', onEffectRadioButtonsChange);
    });
  };

  // закрытие формы

  var onDocumentKeydown = function (evt) {
    if (evt.code === 'Escape') {
      if (document.activeElement === hashtagTextField || document.activeElement === commentField) {
        evt.stopPropagation();
      } else {
        closeForm();
      }
    }
  };

  var onCloseButtonUploadOverlayFormClick = function () {
    closeForm();
  };

  var onCloseButtonUploadOverlayFormKeydown = function (evt) {
    if (evt.code === 'Enter' && document.activeElement === closeButtonUploadOverlayForm) {
      evt.stopPropagation();
    } else {
      closeForm();
    }
  };

  var onHashtagTextFieldInput = function () {
    window.validation.hashtag();
  };

  var onCommentFieldChange = function () {
    window.validation.commentField();
  };

  var onScaleControlSmallerClick = function () {
    window.zoom.out();
  };

  var onScaleControlSmallerKeydown = function (evt) {
    evt.stopPropagation();
    if (evt.code === 'Enter' && document.activeElement === scaleControlSmaller) {
      window.utils.isEnterEvent(evt, window.zoom.out);
    } else {
      window.utils.isEscEvent(evt, closeForm);
    }
  };

  var onScaleControlBiggerClick = function () {
    window.zoom.in();
  };

  var onScaleControlBiggerKeydown = function (evt) {
    evt.stopPropagation();
    if (evt.code === 'Enter' && document.activeElement === scaleControlBigger) {
      window.utils.isEnterEvent(evt, window.zoom.in);
    } else {
      window.utils.isEscEvent(evt, closeForm);
    }
  };

  var onEffectLevelPinMousedown = function (evt) {
    window.slider.coordinate(evt);
  };

  var onEffectRadioButtonsChange = function () {
    window.effects.change();
  };

  var onUploadFileChange = function () {
    openForm();
  };

  uploadFile.addEventListener('change', onUploadFileChange);
})();
