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
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectRadioButtons = uploadForm.querySelector('input[name=effect]');
  var effectLevelValue = uploadForm.querySelector('.effect-level__value');
  var imageUploadPreview = uploadForm.querySelector('.img-upload__preview');
  var photoEffects = uploadForm.querySelector('.img-upload__effects');
  var scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
  var scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');
  var scaleControlValue = uploadForm.querySelector('.scale__control--value');
  var commentsField = uploadForm.querySelector('.text__description');

  var openUploadOverlayForm = function () {
    uploadOverlayForm.classList.remove('hidden');
    effectLevel.classList.add('visually-hidden');
    document.addEventListener('keydown', onDocumentKeydown);
    closeButtonUploadOverlayForm.addEventListener('click', onCloseButtonUploadOverlayFormClick);
    hashtagTextField.addEventListener('input', onHashtagTextFieldInput);
    uploadForm.addEventListener('submit', onUploadFormSubmit);
    effectLevelPin.addEventListener('mouseup', onEffectLevelPinMouseup);
    effectRadioButtons.addEventListener('change', onEffectRadioButtonsChange);
    photoEffects.addEventListener('change', onPhotoEffectsChange);
    effectLevelDepth.style.width = '100%';
    effectLevelPin.style.left = '100%';
    scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
    scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
    scaleControlValue.setAttribute('value', '100%');
    commentsField.addEventListener('change', onCommentsFieldChange);
  };

  var closeUploadOverlayForm = function () {
    uploadFile.value = '';
    uploadOverlayForm.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
    closeButtonUploadOverlayForm.removeEventListener('click', onCloseButtonUploadOverlayFormClick);
    hashtagTextField.removeEventListener('input', onHashtagTextFieldInput);
    uploadForm.removeEventListener('submit', onUploadFormSubmit);
    effectLevelPin.removeEventListener('mouseup', onEffectLevelPinMouseup);
    effectRadioButtons.removeEventListener('change', onEffectRadioButtonsChange);
    photoEffects.removeEventListener('change', onPhotoEffectsChange);
    scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
    scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);
    commentsField.removeEventListener('change', onCommentsFieldChange);
    uploadForm.reset();
    hashtagTextField.setCustomValidity('');
    commentsField.setCustomValidity('');
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

  // пропорция для определения уровня эффекта
  var onEffectLevelPinMouseup = function () {
    var widthOfEffectLevelLine = effectLevelLine.getBoundingClientRect().width;
    var pinPosition = effectLevelPin.offsetLeft;
    effectLevelValue.value = (pinPosition * 100) / widthOfEffectLevelLine + '%';
  };

  // сброс уровня эффекта до начального состояния (100%)
  var onEffectRadioButtonsChange = function () {
    var maxPinPosition = effectLevelLine.getBoundingClientRect().right;
    effectLevelValue.value = (maxPinPosition * 100) / maxPinPosition + '%';
  };

  // добавление класса на картинку
  var onPhotoEffectsChange = function () {
    var effects = photoEffects.elements;
    imageUploadPreview.classList.remove('effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');

    for (var i = 0; i < effects.length; i++) {
      if (effects[i].checked) {
        switch (effects[i].value) {
          case ('none'):
            imageUploadPreview.classList.add('effects__preview--none');
            effectLevel.classList.add('visually-hidden');
            break;
          case ('chrome'):
            imageUploadPreview.classList.add('effects__preview--chrome');
            effectLevel.classList.remove('visually-hidden');
            break;
          case ('sepia'):
            imageUploadPreview.classList.add('effects__preview--sepia');
            effectLevel.classList.remove('visually-hidden');
            break;
          case ('marvin'):
            imageUploadPreview.classList.add('effects__preview--marvin');
            effectLevel.classList.remove('visually-hidden');
            break;
          case ('phobos'):
            imageUploadPreview.classList.add('effects__preview--phobos');
            effectLevel.classList.remove('visually-hidden');
            break;
          case ('heat'):
            imageUploadPreview.classList.add('effects__preview--heat');
            effectLevel.classList.remove('visually-hidden');
            break;
        }
      }
    }
  };

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

  var onCommentsFieldChange = function () {
    if (commentsField.value.length > MAX_COMMENT_LENGTH) {
      commentsField.setCustomValidity('максимальная длина комментария 140 символов');
    } else {
      commentsField.setCustomValidity('');
    }
  };

  // валидация хеш-тегов
  var onHashtagTextFieldInput = function () {
    var hashtagTextFieldContent = hashtagTextField.value;
    var hashtagsList = hashtagTextFieldContent.toLowerCase().split(' ');

    hashtagTextField.setCustomValidity('');

    if (hashtagsList.length > MAX_HASHTAGS_COUNT) {
      hashtagTextField.setCustomValidity('максимум 5 хэш-тегов');
    } else {
      for (var i = 0; i < hashtagsList.length; i++) {
        if (hashtagsList[i][0] !== '#') {
          hashtagTextField.setCustomValidity('хэш-тег начинается с символа #');
        } else if (hashtagsList[i] === '#') {
          hashtagTextField.setCustomValidity('хеш-тег не может состоять только из одной решётки');
        } else if (hashtagsList.indexOf(hashtagsList[i]) !== i) {
          hashtagTextField.setCustomValidity('один и тот же хеш-тег не может быть использован дважды');
        } else if (hashtagsList[i].length > MAX_HASHTAG_LENGTH) {
          hashtagTextField.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
        }
      }
    }
  };

  var onUploadFormSubmit = function (evt) {
    evt.preventDefault();
    uploadForm.submit();
  };

  uploadFile.addEventListener('change', onUploadFileChange);
})();
