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

  var openUploadOverlayForm = function () {
    uploadOverlayForm.classList.remove('hidden');
    effectLevel.classList.add('visually-hidden');
    document.addEventListener('keydown', onDocumentKeydown);
    closeButtonUploadOverlayForm.addEventListener('click', onCloseButtonUploadOverlayFormClick);
    hashtagTextField.addEventListener('input', validateHashtag);
    uploadForm.addEventListener('submit', onUploadFormSubmit);
    effectLevelDepth.style.width = '100%';
    effectLevelPin.style.left = '100%';
    scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
    scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
    effectLevelValue.setAttribute('value', 100);
    scaleControlValue.setAttribute('value', '100%');
    commentsField.addEventListener('change', validateComment);
  };

  var closeUploadOverlayForm = function () {
    uploadFile.value = '';
    uploadOverlayForm.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
    closeButtonUploadOverlayForm.removeEventListener('click', onCloseButtonUploadOverlayFormClick);
    hashtagTextField.removeEventListener('input', validateHashtag);
    uploadForm.removeEventListener('submit', onUploadFormSubmit);
    scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
    scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);
    commentsField.removeEventListener('change', validateComment);
  };

  var onDocumentKeydown = function (evt) {
    if (evt.target === hashtagTextField) {
      evt.stopPropagation();
    } else if (evt.target === commentsField) {
      evt.stopPropagation();
    } else {
      window.util.isEscEvent(evt, closeUploadOverlayForm);
    }
  };

  var onUploadFileChange = function () {
    openUploadOverlayForm();
  };

  var onCloseButtonUploadOverlayFormClick = function () {
    closeUploadOverlayForm();
  };

  uploadFile.addEventListener('change', onUploadFileChange);

  // масштабирование картинки
  var onScaleControlSmallerClick = function () {
    var currentImageSize = parseInt(scaleControlValue. value, 10);
    var setImageSize = currentImageSize - SCALE_STEP;
    if (setImageSize <= SCALE_STEP) {
      setImageSize = MIN_SCALE;
    }
    currentImageSize = setImageSize;
    changeImageSize(currentImageSize);
  };

  var onScaleControlBiggerClick = function () {
    var currentImageSize = parseInt(scaleControlValue. value, 10);
    var setImageSize = currentImageSize + SCALE_STEP;
    if (setImageSize >= MAX_SCALE) {
      setImageSize = MAX_SCALE;
    }
    currentImageSize = setImageSize;
    changeImageSize(setImageSize);
  };

  var changeImageSize = function (imageSize) {
    imageUploadPreview.classList.remove('transform:scale(0.25)', 'transform:scale(0.5)', 'transform:scale(0.75)', 'transform:scale(1)');
    imageUploadPreview.classList.add('transform' + ':' + 'scale' + '(' + imageSize / 100 + ')');
    scaleControlValue.value = imageSize + '%';
  };

  var validateComment = function () {
    if (commentsField.value.length > MAX_COMMENT_LENGTH) {
      commentsField.setCustomValidity('максимальная длина комментария 140 символов');
    } else {
      commentsField.setCustomValidity('');
    }
  };

  // валидация хеш-тегов
  var validateHashtag = function () {
    var hashtagTextFieldContent = hashtagTextField.value;
    var hashtagsList = hashtagTextFieldContent.toLowerCase().split(' ');

    if (hashtagsList.length > MAX_HASHTAGS_COUNT) {
      hashtagTextField.setCustomValidity('максимум 5 хэш-тегов');
    } else {
      for (var i = 0; i < hashtagsList.length; i++) {
        if ((hashtagsList[i][0] !== '#' || hashtagsList[0][0] !== '#')) {
          hashtagTextField.setCustomValidity('хэш-тег начинается с символа #');
        } else if (hashtagsList[i] === '#') {
          hashtagTextField.setCustomValidity('хеш-тег не может состоять только из одной решётки');
        } else if (hashtagsList.indexOf(hashtagsList[i]) !== i) {
          hashtagTextField.setCustomValidity('один и тот же хеш-тег не может быть использован дважды');
        } else if (hashtagsList[i].length > MAX_HASHTAG_LENGTH) {
          hashtagTextField.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
        } else {
          hashtagTextField.setCustomValidity('');
        }
      }
    }
  };

  var onUploadFormSubmit = function (evt) {
    evt.preventDefault();
    validateHashtag();
    uploadForm.submit();
  };
})();