'use strict';

(function () {

  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var uploadOverlayForm = uploadForm.querySelector('.img-upload__overlay');
  var closeButtonUploadOverlayForm = uploadOverlayForm.querySelector('#upload-cancel');
  var scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
  var scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');
  var scaleControlValue = uploadForm.querySelector('.scale__control--value');
  var hashtagTextField = document.querySelector('input[name=hashtags]');
  var effectLevel = uploadForm.querySelector('.img-upload__effect-level');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var effectLevelValue = uploadForm.querySelector('.effect-level__value');
  var commentsField = uploadForm.querySelector('.text__description');
  var effectRadioButtons = uploadForm.querySelectorAll('.effects__radio');


  window.uploadOverlayForm = {

    openForm: function () {
      uploadOverlayForm.classList.remove('hidden');
      effectLevel.classList.add('visually-hidden');
      document.addEventListener('keydown', onDocumentKeydown);
      closeButtonUploadOverlayForm.addEventListener('click', onCloseButtonUploadOverlayFormClick);
      closeButtonUploadOverlayForm.addEventListener('keydown', onCloseButtonUploadOverlayFormEnterdown);
      hashtagTextField.addEventListener('input', window.validations.onHashtagTextFieldInput);
      effectLevelDepth.style.width = '100%';
      effectLevelPin.style.left = '100%';
      scaleControlSmaller.addEventListener('mouseup', window.zoom.onScaleControlSmallerMouseup);
      scaleControlBigger.addEventListener('mouseup', window.zoom.onScaleControlBiggerMouseup);
      scaleControlSmaller.addEventListener('keydown', window.zoom.onScaleControlSmallerEnterdown);
      scaleControlBigger.addEventListener('keydown', window.zoom.onScaleControlBiggerEnterdown);
      effectLevelValue.setAttribute('value', 100);
      scaleControlValue.setAttribute('value', '100%');
      commentsField.addEventListener('change', window.validations.onCommentsFieldChange);
      closeButtonUploadOverlayForm.addEventListener('click', onCloseButtonUploadOverlayFormClick);
      effectLevelPin.addEventListener('mousedown', window.slider.shiftEffectLevelPin);
      effectRadioButtons.forEach(function (element) {
        element.addEventListener('change', window.onEffectRadioButtonsChange);
      });
    },

    closeForm: function () {
      uploadFile.value = '';
      uploadOverlayForm.classList.add('hidden');
      document.removeEventListener('keydown', onDocumentKeydown);
      closeButtonUploadOverlayForm.removeEventListener('click', onCloseButtonUploadOverlayFormClick);
      closeButtonUploadOverlayForm.removeEventListener('keydown', onCloseButtonUploadOverlayFormEnterdown);
      hashtagTextField.removeEventListener('input', window.validations.onHashtagTextFieldInput);
      scaleControlSmaller.removeEventListener('mouseup', window.zoom.onScaleControlSmallerMouseup);
      scaleControlBigger.removeEventListener('mouseup', window.zoom.onScaleControlBiggerMouseup);
      scaleControlSmaller.removeEventListener('keydown', window.zoom.onScaleControlSmallerEnterdown);
      scaleControlBigger.removeEventListener('keydown', window.zoom.onScaleControlBiggerEnterdown);
      commentsField.removeEventListener('change', window.validations.onCommentsFieldChange);
      effectLevelPin.removeEventListener('mousedown', window.slider.shiftEffectLevelPin);
      effectRadioButtons.forEach(function (element) {
        element.removeEventListener('change', window.onEffectRadioButtonsChange);
      });
      window.effects.setOriginFilter();
      uploadForm.reset();
      hashtagTextField.setCustomValidity('');
      commentsField.setCustomValidity('');
      hashtagTextField.classList.remove('error-field');
    }
  };

  var onUploadFileChange = function () {
    window.uploadOverlayForm.openForm();
  };

  var onDocumentKeydown = function (evt) {
    if (evt.code === 'Escape') {
      if (document.activeElement === hashtagTextField || document.activeElement === commentsField) {
        evt.stopPropagation();
      } else {
        window.uploadOverlayForm.closeForm();
      }
    }
  };

  // закрытие формы
  var onCloseButtonUploadOverlayFormClick = function () {
    window.uploadOverlayForm.closeForm();
  };

  var onCloseButtonUploadOverlayFormEnterdown = function (evt) {
    if (evt.code === 'Enter' && document.activeElement === closeButtonUploadOverlayForm) {
      evt.stopPropagation();
    } else {
      window.uploadOverlayForm.closeForm();
    }
  };

  uploadFile.addEventListener('change', onUploadFileChange);
})();
