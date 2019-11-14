'use strict';

(function () {

  var MAX_HASHTAGS_COUNT = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var SCALE_STEP = 25;
  var MAX_COMMENT_LENGTH = 140;

  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var uploadOverlayForm = uploadForm.querySelector('.img-upload__overlay');
  var closeButtonUploadOverlayForm = uploadOverlayForm.querySelector('#upload-cancel');
  var hashtagFieldset = uploadForm.querySelector('.img-upload__text');
  var hashtagTextField = hashtagFieldset.querySelector('input[name=hashtags]');
  var effectLevel = uploadForm.querySelector('.img-upload__effect-level');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var effectLevelValue = uploadForm.querySelector('.effect-level__value');
  var imageUploadPreview = uploadForm.querySelector('.img-upload__preview');
  var scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
  var scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');
  var scaleControlValue = uploadForm.querySelector('.scale__control--value');
  var commentsField = uploadForm.querySelector('.text__description');
  var effectRadioButtons = uploadForm.querySelectorAll('.effects__radio');

  var openUploadOverlayForm = function () {
    uploadOverlayForm.classList.remove('hidden');
    effectLevel.classList.add('visually-hidden');
    document.addEventListener('keydown', onDocumentKeydown);
    closeButtonUploadOverlayForm.addEventListener('click', onCloseButtonUploadOverlayFormClick);
    closeButtonUploadOverlayForm.addEventListener('keydown', onCloseButtonUploadOverlayFormEnterdown);
    hashtagTextField.addEventListener('input', validateHashtag);
    effectLevelDepth.style.width = '100%';
    effectLevelPin.style.left = '100%';
    scaleControlSmaller.addEventListener('mouseup', onScaleControlSmallerMouseup);
    scaleControlBigger.addEventListener('mouseup', onScaleControlBiggerMouseup);
    scaleControlSmaller.addEventListener('keydown', onScaleControlSmallerEnterDown);
    scaleControlBigger.addEventListener('keydown', onScaleControlBiggerEnterDown);
    effectLevelValue.setAttribute('value', 100);
    scaleControlValue.setAttribute('value', '100%');
    commentsField.addEventListener('change', onCommentsFieldChange);
    closeButtonUploadOverlayForm.addEventListener('click', onCloseButtonUploadOverlayFormClick);
    effectLevelPin.addEventListener('mousedown', window.shiftEffectLevelPin);
    effectRadioButtons.forEach(function (element) {
      element.addEventListener('change', window.onEffectRadioButtonsChange);
    });
  };

  var closeUploadOverlayForm = function () {
    uploadFile.value = '';
    uploadOverlayForm.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
    closeButtonUploadOverlayForm.removeEventListener('click', onCloseButtonUploadOverlayFormClick);
    closeButtonUploadOverlayForm.removeEventListener('keydown', onCloseButtonUploadOverlayFormEnterdown);
    hashtagTextField.removeEventListener('input', validateHashtag);
    scaleControlSmaller.removeEventListener('mouseup', onScaleControlSmallerMouseup);
    scaleControlBigger.removeEventListener('mouseup', onScaleControlBiggerMouseup);
    scaleControlSmaller.removeEventListener('keydown', onScaleControlSmallerEnterDown);
    scaleControlBigger.removeEventListener('keydown', onScaleControlBiggerEnterDown);
    commentsField.removeEventListener('change', onCommentsFieldChange);
    effectLevelPin.removeEventListener('mousedown', window.shiftEffectLevelPin);
    effectRadioButtons.forEach(function (element) {
      element.removeEventListener('change', window.onEffectRadioButtonsChange);
    });
    window.setOriginFilter();
    uploadForm.reset();
    hashtagTextField.setCustomValidity('');
    commentsField.setCustomValidity('');
    hashtagTextField.classList.remove('error-field');
  };

  var onUploadFileChange = function () {
    openUploadOverlayForm();
  };

  uploadFile.addEventListener('change', onUploadFileChange);

  var onDocumentKeydown = function (evt) {
    if (evt.code === 'Escape') {
      if (document.activeElement === hashtagTextField || document.activeElement === commentsField) {
        evt.stopPropagation();
      } else {
        closeUploadOverlayForm();
      }
    }
  };

  // закрытие формы
  var onCloseButtonUploadOverlayFormClick = function () {
    closeUploadOverlayForm();
  };

  var onCloseButtonUploadOverlayFormEnterdown = function (evt) {
    if (evt.code === 'Enter' && document.activeElement === closeButtonUploadOverlayForm) {
      evt.stopPropagation();
    } else {
      closeUploadOverlayForm();
    }
  };

  // масштабирование картинки
  var zoomOutPhoto = function () {
    var currentImageSize = parseInt(scaleControlValue. value, 10);
    var setImageSize = currentImageSize - SCALE_STEP;
    if (setImageSize <= SCALE_STEP) {
      setImageSize = MIN_SCALE;
    }
    currentImageSize = setImageSize;
    changeImageSize(currentImageSize);
  };

  var zoomInPhoto = function () {
    var currentImageSize = parseInt(scaleControlValue. value, 10);
    var setImageSize = currentImageSize + SCALE_STEP;
    if (setImageSize >= MAX_SCALE) {
      setImageSize = MAX_SCALE;
    }
    currentImageSize = setImageSize;
    changeImageSize(setImageSize);
  };

  var changeImageSize = function (imageSize) {
    scaleControlValue.value = imageSize + '%';
    imageUploadPreview.style.transform = 'scale' + '(' + imageSize / 100 + ')';
  };

  var onScaleControlSmallerMouseup = function () {
    zoomOutPhoto();
  };

  var onScaleControlSmallerEnterDown = function (evt) {
    evt.stopPropagation();
    if (evt.code === 'Enter' && document.activeElement === scaleControlSmaller) {
      window.util.isEnterEvent(evt, zoomOutPhoto);
    } else {
      window.util.isEscEvent(evt, closeUploadOverlayForm);
    }
  };

  var onScaleControlBiggerMouseup = function () {
    zoomInPhoto();
  };

  var onScaleControlBiggerEnterDown = function (evt) {
    evt.stopPropagation();
    if (evt.code === 'Enter' && document.activeElement === scaleControlBigger) {
      window.util.isEnterEvent(evt, zoomInPhoto);
    } else {
      window.util.isEscEvent(evt, closeUploadOverlayForm);
    }
  };

  var onCommentsFieldChange = function () {
    if (commentsField.value.length > MAX_COMMENT_LENGTH) {
      commentsField.classList.add('error-field');
      commentsField.setCustomValidity('максимальная длина комментария 140 символов');
    } else {
      commentsField.classList.remove('error-field');
      commentsField.setCustomValidity('');
    }
  };

  var validateHashtag = function () {
    hashtagTextField.classList.remove('error-field');
    var hashtagTextFieldContent = hashtagTextField.value;
    var hashtagsList = hashtagTextFieldContent.toLowerCase().split(' ');

    hashtagTextField.setCustomValidity('');

    if (hashtagsList.length > MAX_HASHTAGS_COUNT) {
      hashtagTextField.classList.add('error-field');
      hashtagTextField.setCustomValidity('максимум 5 хэш-тегов');
    } else {
      for (var i = 0; i < hashtagsList.length; i++) {
        if (hashtagsList[i][0] !== '#') {
          hashtagTextField.classList.add('error-field');
          hashtagTextField.setCustomValidity('хэш-тег начинается с символа #');
        } else if (hashtagsList[i] === '#') {
          hashtagTextField.setCustomValidity('хеш-тег не может состоять только из одной решётки');
        } else if (hashtagsList.indexOf(hashtagsList[i]) !== i) {
          hashtagTextField.setCustomValidity('один и тот же хеш-тег не может быть использован дважды');
        } else if (hashtagsList[i].length > MAX_HASHTAG_LENGTH) {
          hashtagTextField.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
        } else {
          hashtagTextField.classList.remove('error-field');
          hashtagTextField.setCustomValidity('');
        }
      }
    }
  };
})();
