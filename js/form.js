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
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var effectRadioButtons = uploadForm.querySelectorAll('.effects__radio');
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
    hashtagTextField.addEventListener('input', validateHashtag);
    uploadForm.addEventListener('submit', onUploadFormSubmit);
    effectLevelPin.addEventListener('mouseup', onEffectLevelPinMouseup);
    effectLevelPin.addEventListener('mousedown', shiftEffectLevelPin);
    effectRadioButtons.forEach(function (element) {
      element.addEventListener('change', onEffectRadioButtonsChange);
    });
    photoEffects.addEventListener('change', onPhotoEffectsChange);
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
    effectLevelPin.removeEventListener('mouseup', onEffectLevelPinMouseup);
    effectLevelPin.removeEventListener('mousedown', shiftEffectLevelPin);
    effectRadioButtons.forEach(function (element) {
      element.removeEventListener('change', onEffectRadioButtonsChange);
    });
    photoEffects.removeEventListener('change', onPhotoEffectsChange);
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
      setOriginFilter();
    }
  };

  var onUploadFileChange = function () {
    openUploadOverlayForm();
  };

  var onCloseButtonUploadOverlayFormClick = function () {
    closeUploadOverlayForm();
    setOriginFilter();
  };

  uploadFile.addEventListener('change', onUploadFileChange);

  // задание 5-3 Максимум подвижности

  // определяем ширину дива для ползунка
  var getWidthOfEffectLevelLine = function () {
    var widthOfEffectLevelLine = effectLevelLine.getBoundingClientRect().width;
    return widthOfEffectLevelLine;
  };

  var effectLevelDepthMousemove = function () {
    effectLevelDepth.style.width = effectLevelPin.offsetLeft + 'px';
  };

  var shiftEffectLevelPin = function (evt) {
    window.maxEffectScale = getWidthOfEffectLevelLine();
    var minEffectScale = 0;

    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onEffectLevelPinMousemove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      if (effectLevelPin.offsetLeft - shift.x < minEffectScale) {
        effectLevelPin.style.left = minEffectScale + 'px';
      } else if (effectLevelPin.offsetLeft - shift.x > window.maxEffectScale) {
        effectLevelPin.style.left = window.maxEffectScale + 'px';
      } else {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
      }
    };

    var onEffectLevelPinMouseup = function (upEvt) {
      upEvt.preventDefault();

      effectLevelPin.removeEventListener('mousemove', onEffectLevelPinMousemove);
      effectLevelPin.removeEventListener('mouseup', onEffectLevelPinMouseup);
      effectLevelPin.removeEventListener('mousemove', effectLevelDepthMousemove);
    };

    effectLevelPin.addEventListener('mousemove', onEffectLevelPinMousemove);
    effectLevelPin.addEventListener('mouseup', onEffectLevelPinMouseup);
    effectLevelPin.addEventListener('mousemove', effectLevelDepthMousemove);
  };

  // определение уровня эффекта и установка значения в валью
  var onEffectLevelPinMouseup = function () {
    effectLevelValue.value = parseInt(effectLevelPin.style.left, 10);
    // если так, то нет смысла делать пропорцию перевода в % соотношение
    // при движении ползунка (событии mouseup) не меняется уровень эффекта

    effectLevelValue.setAttribute('value', effectLevelValue.value);
    return effectLevelValue.value;
  };

  // сброс уровня эффекта до начального состояния (100%)
  var onEffectRadioButtonsChange = function () {
    effectLevelDepth.style.width = '100%';
    effectLevelPin.style.left = '100%';
    effectLevelValue.setAttribute('value', 100);
    setOriginFilter();
  };

  var setOriginFilter = function () {
    imageUploadPreview.classList.remove('effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
    effectLevel.classList.add('visually-hidden');
    imageUploadPreview.style.filter = 'none';
    // не могу добавить желтую рамочку как default
  };

  // добавление класса на картинку
  var onPhotoEffectsChange = function () {
    var effects = photoEffects.elements;

    onEffectRadioButtonsChange();

    for (var i = 0; i < effects.length; i++) {
      if (effects[i].checked) {
        switch (effects[i].value) {
          // case ('none'):
          //   // imageUploadPreview.classList.add('effects__preview--none');
          //   break;
          case ('chrome'):
            imageUploadPreview.classList.add('effects__preview--chrome');
            effectLevel.classList.remove('visually-hidden');
            imageUploadPreview.style.filter = 'grayscale' + '(' + Math.round((onEffectLevelPinMouseup() * 100 / window.maxEffectScale)) + ')';
            // тут я перевожу в % соотношение
            break;
          case ('sepia'):
            imageUploadPreview.classList.add('effects__preview--sepia');
            effectLevel.classList.remove('visually-hidden');
            imageUploadPreview.style.filter = 'sepia' + '(' + Math.round((onEffectLevelPinMouseup() * 100 / window.maxEffectScale)) + ')';
            // аналогично с chrome
            break;
          case ('marvin'):
            imageUploadPreview.classList.add('effects__preview--marvin');
            effectLevel.classList.remove('visually-hidden');
            imageUploadPreview.style.filter = 'invert' + '(' + onEffectLevelPinMouseup() + '%' + ')';
            break;
          case ('phobos'):
            imageUploadPreview.classList.add('effects__preview--phobos');
            effectLevel.classList.remove('visually-hidden');
            imageUploadPreview.style.filter = 'blur' + '(' + Math.round(onEffectLevelPinMouseup() / 3 / 10) + 'px' + ')';
            // тут не понимаю как сделать, чтобы мах было 3px, а минимальное 1px
            break;
          case ('heat'):
            imageUploadPreview.classList.add('effects__preview--heat');
            effectLevel.classList.remove('visually-hidden');
            imageUploadPreview.style.filter = 'brightness' + '(' + Math.round(onEffectLevelPinMouseup() / 3 / 10) + ')';
            // аналогично с phobos
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
