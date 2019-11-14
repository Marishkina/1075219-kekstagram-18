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
    scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
    scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
    scaleControlSmaller.addEventListener('keydown', onScaleControlSmallerEnterDown);
    scaleControlBigger.addEventListener('keydown', onScaleControlBiggerEnterDown);
    effectLevelValue.setAttribute('value', 100);
    scaleControlValue.setAttribute('value', '100%');
    commentsField.addEventListener('change', validateComment);
  };

  var closeUploadOverlayForm = function () {
    uploadFile.value = '';
    uploadOverlayForm.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
    closeButtonUploadOverlayForm.removeEventListener('click', onCloseButtonUploadOverlayFormClick);
    closeButtonUploadOverlayForm.removeEventListener('keydown', onCloseButtonUploadOverlayFormEnterdown);
    hashtagTextField.removeEventListener('input', validateHashtag);
    scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
    scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);
    scaleControlSmaller.removeEventListener('keydown', onScaleControlSmallerEnterDown);
    scaleControlBigger.removeEventListener('keydown', onScaleControlBiggerEnterDown);
<<<<<<< HEAD
    commentsField.removeEventListener('change', validateComment);
=======
    commentsField.removeEventListener('change', onCommentsFieldChange);
    effectLevelPin.removeEventListener('mousedown', window.shiftEffectLevelPin);
    effectRadioButtons.forEach(function (element) {
      element.removeEventListener('change', window.onEffectRadioButtonsChange);
    });
    window.setOriginFilter();
    uploadForm.reset();
    hashtagTextField.setCustomValidity('');
    commentsField.setCustomValidity('');
<<<<<<< HEAD
>>>>>>> Убирает повторяющиеся функции, правит функцию валидации хеш-тегов
=======
    hashtagTextField.classList.remove('error-field');
>>>>>>> Задание 7-3: v1.0
  };

  var onUploadFileChange = function () {
    openUploadOverlayForm();
  };

  uploadFile.addEventListener('change', onUploadFileChange);

  var onDocumentKeydown = function (evt) {
    if (document.activeElement === hashtagTextField) {
      evt.stopPropagation();
    } else if (document.activeElement === commentsField) {
      evt.stopPropagation();
    } else {
      window.util.isEscEvent(evt, closeUploadOverlayForm);
    }
  };

  // закрытие формы
  var onCloseButtonUploadOverlayFormClick = function () {
    closeUploadOverlayForm();
  };

  var onCloseButtonUploadOverlayFormEnterdown = function (evt) {
    evt.stopPropagation();
    if (document.activeElement === closeButtonUploadOverlayForm) {
      window.util.isEnterEvent(evt, closeUploadOverlayForm);
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

  var onScaleControlSmallerClick = function () {
    zoomOutPhoto();
  };

  var onScaleControlSmallerEnterDown = function (evt) {
    evt.stopPropagation();
    if (document.activeElement === scaleControlSmaller) {
      window.util.isEnterEvent(evt, zoomOutPhoto);
<<<<<<< HEAD
=======
    } else {
      window.util.isEscEvent(evt, closeUploadOverlayForm);
>>>>>>> Убирает повторяющиеся функции, правит функцию валидации хеш-тегов
    }
  };

  var onScaleControlBiggerClick = function () {
    zoomInPhoto();
  };

  var onScaleControlBiggerEnterDown = function (evt) {
    evt.stopPropagation();
    if (document.activeElement === scaleControlBigger) {
      window.util.isEnterEvent(evt, zoomInPhoto);
<<<<<<< HEAD
=======
    } else {
      window.util.isEscEvent(evt, closeUploadOverlayForm);
>>>>>>> Убирает повторяющиеся функции, правит функцию валидации хеш-тегов
    }
  };

  var validateComment = function () {
    if (commentsField.value.length > MAX_COMMENT_LENGTH) {
      commentsField.classList.add('error-field');
      commentsField.setCustomValidity('максимальная длина комментария 140 символов');
    } else {
      commentsField.classList.remove('error-field');
      commentsField.setCustomValidity('');
    }
  };

  // валидация хеш-тегов
  var validateHashtag = function () {
    hashtagTextField.classList.remove('error-field');
    var hashtagTextFieldContent = hashtagTextField.value;
    var hashtagsList = hashtagTextFieldContent.toLowerCase().split(' ');

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
<<<<<<< HEAD
=======
          hashtagTextField.classList.remove('error-field');
>>>>>>> Задание 7-3: v1.0
          hashtagTextField.setCustomValidity('');
        }
      }
    }
  };
})();
