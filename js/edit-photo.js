'use strict';

(function () {

  // задание 5-3 Максимум подвижности
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var SCALE_STEP = 25;

  var uploadForm = document.querySelector('.img-upload__form');
  var scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
  var scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');
  var scaleControlValue = uploadForm.querySelector('.scale__control--value');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var uploadOverlayForm = uploadForm.querySelector('.img-upload__overlay');
  var closeButtonUploadOverlayForm = uploadOverlayForm.querySelector('#upload-cancel');
  var effectLevel = uploadForm.querySelector('.img-upload__effect-level');
  var imageUploadPreview = uploadForm.querySelector('.img-upload__preview');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var effectLevelValue = uploadForm.querySelector('.effect-level__value');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectRadioButtons = uploadForm.querySelectorAll('.effects__radio');
  var photoEffects = uploadForm.querySelector('.img-upload__effects');
  var chromePreview = photoEffects.querySelector('#effect-chrome');
  var sepiaPreview = photoEffects.querySelector('#effect-sepia');
  var marvinPreview = photoEffects.querySelector('#effect-marvin');
  var phobosPreview = photoEffects.querySelector('#effect-phobos');
  var heatPreview = photoEffects.querySelector('#effect-heat');

  var openUploadOverlayForm = function () {
    document.addEventListener('keydown', onDocumentKeydown);
    closeButtonUploadOverlayForm.addEventListener('click', onCloseButtonUploadOverlayFormClick);
    effectLevelPin.addEventListener('mousedown', shiftEffectLevelPin);
    effectRadioButtons.forEach(function (element) {
      element.addEventListener('change', onEffectRadioButtonsChange);
    });
    photoEffects.addEventListener('change', onPhotoEffectsChange);
    scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
    scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
    scaleControlValue.setAttribute('value', '100%');
  };

  var closeUploadOverlayForm = function () {
    effectLevelPin.removeEventListener('mousedown', shiftEffectLevelPin);
    effectRadioButtons.forEach(function (element) {
      element.removeEventListener('change', onEffectRadioButtonsChange);
    });
    photoEffects.removeEventListener('change', onPhotoEffectsChange);
    scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
    scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);
  };

  var onDocumentKeydown = function (evt) {
    window.util.isEscEvent(evt, closeUploadOverlayForm);
    setOriginFilter();
    uploadForm.reset();
  };

  var onUploadFileChange = function () {
    openUploadOverlayForm();
  };

  var onCloseButtonUploadOverlayFormClick = function () {
    setOriginFilter();
    uploadForm.reset();
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
    scaleControlValue.value = imageSize + '%';
    imageUploadPreview.style.transform = 'scale' + '(' + imageSize / 100 + ')';
  };

  // определяем ширину дива для ползунка
  var getWidthOfEffectLevelLine = function () {
    var widthOfEffectLevelLine = effectLevelLine.getBoundingClientRect().width;

    return widthOfEffectLevelLine;
  };

  var effectLevelDepthMousemove = function () {
    effectLevelDepth.style.width = effectLevelPin.offsetLeft + 'px';
    getEffectLevelValue();
  };

  var shiftEffectLevelPin = function (evt) {
    var maxEffectScale = getWidthOfEffectLevelLine();
    var minEffectScale = 0;

    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onEffectLevelPinMousemove = function (moveEvt) {
      getEffectLevel();

      effectLevelDepthMousemove();
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      if (effectLevelPin.offsetLeft - shift.x < minEffectScale) {
        effectLevelPin.style.left = minEffectScale + 'px';
      } else if (effectLevelPin.offsetLeft - shift.x > maxEffectScale) {
        effectLevelPin.style.left = maxEffectScale + 'px';
      } else {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
      }
    };

    var onEffectLevelPinMouseup = function (upEvt) {
      getEffectLevel();

      getPinPosition();
      upEvt.preventDefault();

      effectLevelPin.removeEventListener('mousemove', onEffectLevelPinMousemove);
      effectLevelPin.removeEventListener('mouseup', onEffectLevelPinMouseup);
    };

    effectLevelPin.addEventListener('mousemove', onEffectLevelPinMousemove);
    effectLevelPin.addEventListener('mouseup', onEffectLevelPinMouseup);
  };

  // определение положения пина в px
  var getPinPosition = function () {
    var pinPosition = parseInt(effectLevelPin.style.left, 10);

    return pinPosition;
  };

  // пропорция определяет % соотношение уровня эффекта
  var getEffectLevelValue = function () {
    var pinPosition = getPinPosition();

    if (pinPosition === 100) {
      var value = 100;
    } else {
      value = Math.round(pinPosition * 100 / getWidthOfEffectLevelLine());
      effectLevelValue.setAttribute('value', value);
    }
    return value;
  };

  // сброс уровня эффекта до начального состояния (100%)
  var onEffectRadioButtonsChange = function () {
    setOriginFilter();
  };

  var setOriginFilter = function () {
    imageUploadPreview.classList.remove('effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
    effectLevel.classList.add('visually-hidden');
    effectLevelDepth.style.width = '100%';
    effectLevelPin.style.left = '100%';
    effectLevelValue.setAttribute('value', 100);
    imageUploadPreview.style.filter = 'none';
    imageUploadPreview.style.transform = 'scale(1)';
    scaleControlValue.value = '100%';
  };

  var getEffectLevel = function () {
    if (chromePreview.checked) {
      imageUploadPreview.style.filter = 'grayscale' + '(' + getEffectLevelValue() / 100 + ')';
    } else if (sepiaPreview.checked) {
      imageUploadPreview.style.filter = 'sepia' + '(' + getEffectLevelValue() / 100 + ')';
    } else if (marvinPreview.checked) {
      imageUploadPreview.style.filter = 'invert' + '(' + getEffectLevelValue() + '%' + ')';
    } else if (phobosPreview.checked) {
      imageUploadPreview.style.filter = 'blur' + '(' + blurScale() + 'px' + ')';
    } else if (heatPreview.checked) {
      imageUploadPreview.style.filter = 'brightness' + '(' + brightnessScale() + ')';
    }
  };

  // установка мах значения для phobos эффекта
  var blurScale = function () {
    var value = getEffectLevelValue() / 30;
    if (value > 3) {
      value = 3;
    }
    return value;
  };

  // установка мин и мах значений для heat эффекта
  var brightnessScale = function () {
    var value = getEffectLevelValue() / 30;
    if (value > 3) {
      value = 3;
    } else if (value < 1) {
      value = 1;
    }
    return value;
  };

  var onPhotoEffectsChange = function () {
    var effects = photoEffects.elements;

    onEffectRadioButtonsChange();

    for (var i = 0; i < effects.length; i++) {

      if (effects[i].checked) {
        switch (effects[i].value) {

          case ('chrome'):
            imageUploadPreview.classList.add('effects__preview--chrome');
            effectLevel.classList.remove('visually-hidden');
            imageUploadPreview.style.filter = 'grayscale' + '(' + getEffectLevelValue() / 100 + ')';
            break;
          case ('sepia'):
            imageUploadPreview.classList.add('effects__preview--sepia');
            effectLevel.classList.remove('visually-hidden');
            imageUploadPreview.style.filter = 'sepia' + '(' + getEffectLevelValue() / 100 + ')';
            break;
          case ('marvin'):
            imageUploadPreview.classList.add('effects__preview--marvin');
            effectLevel.classList.remove('visually-hidden');
            imageUploadPreview.style.filter = 'invert' + '(' + getEffectLevelValue() + '%' + ')';
            break;
          case ('phobos'):
            imageUploadPreview.classList.add('effects__preview--phobos');
            effectLevel.classList.remove('visually-hidden');
            imageUploadPreview.style.filter = 'blur' + '(' + Math.round(getEffectLevelValue() / 3 / 10) + 'px' + ')';
            break;
          case ('heat'):
            imageUploadPreview.classList.add('effects__preview--heat');
            effectLevel.classList.remove('visually-hidden');
            imageUploadPreview.style.filter = 'brightness' + '(' + Math.round(getEffectLevelValue() / 3 / 10) + ')';
            break;
        }
      }
    }
  };

  uploadFile.addEventListener('change', onUploadFileChange)
})();
