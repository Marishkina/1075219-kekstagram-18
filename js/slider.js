'use strict';

(function () {

  var uploadForm = document.querySelector('.img-upload__form');
  var effectLevel = uploadForm.querySelector('.img-upload__effect-level');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var effectLevelValue = uploadForm.querySelector('.effect-level__value');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');

  // определяем ширину дива для ползунка
  var getWidthOfEffectLevelLine = function () {
    var widthOfEffectLevelLine = effectLevelLine.getBoundingClientRect().width;

    return widthOfEffectLevelLine;
  };

  var effectLevelDepthMousemove = function () {
    effectLevelDepth.style.width = effectLevelPin.offsetLeft + 'px';
    window.slider.getEffectLevelValue();
  };

  // определение положения пина в px
  var getPinPosition = function () {
    var pinPosition = parseInt(effectLevelPin.style.left, 10);

    return pinPosition;
  };

  // пропорция определяет % соотношение уровня эффекта
  window.slider = {

    getEffectLevelValue: function () {
      var pinPosition = getPinPosition();

      if (pinPosition === 100) {
        var value = 100;
      } else {
        value = Math.round(pinPosition * 100 / getWidthOfEffectLevelLine());
        effectLevelValue.setAttribute('value', value);
      }
      return value;
    },

    shiftEffectLevelPin: function (evt) {
      var maxEffectScale = getWidthOfEffectLevelLine();
      var minEffectScale = 0;

      evt.preventDefault();

      var startCoords = {
        x: evt.clientX
      };

      var onEffectLevelPinMousemove = function (moveEvt) {
        window.effects.getEffectLevel();

        effectLevelDepthMousemove();
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX
        };

<<<<<<< HEAD
        startCoords = {
          x: moveEvt.clientX
        };

<<<<<<< HEAD
        if (effectLevelPin.offsetLeft - shift.x < minEffectScale) {
          effectLevelPin.style.left = minEffectScale + 'px';
        } else if (effectLevelPin.offsetLeft - shift.x > maxEffectScale) {
          effectLevelPin.style.left = maxEffectScale + 'px';
        } else {
          effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
        }
      };
=======
  var setOriginFilter = function () {
    imageUploadPreview.classList.remove('effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
    effectLevel.classList.add('visually-hidden');
    imageUploadPreview.style.filter = 'none';
=======
  // сброс уровня эффекта до начального состояния (100%)
  window.setOriginFilter = function () {
    imageUploadPreview.classList.remove('effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
    imageUploadPreview.style.filter = 'none';
    imageUploadPreview.style.transform = 'scale(1)';
    effectLevelDepth.style.width = '100%';
    effectLevelPin.style.left = '100%';
    effectLevelValue.setAttribute('value', 100);
    scaleControlValue.value = '100%';
>>>>>>> Задание 6-3: без хэштега
  };
>>>>>>> Задание 6-2: нужно подкачаться, также правит открытие картинок по ентеру

      var onEffectLevelPinMouseup = function (upEvt) {
        window.effects.getEffectLevel();

        getPinPosition();
        upEvt.preventDefault();

        effectLevelPin.removeEventListener('mousemove', onEffectLevelPinMousemove);
        effectLevelPin.removeEventListener('mouseup', onEffectLevelPinMouseup);
      };

<<<<<<< HEAD
      effectLevelPin.addEventListener('mousemove', onEffectLevelPinMousemove);
      effectLevelPin.addEventListener('mouseup', onEffectLevelPinMouseup);
    },
=======
  var onEffectRadioButtonsChange = function () {
    var effects = photoEffects.elements;

    window.setOriginFilter();

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
>>>>>>> Задание 6-3: без хэштега
  };
})();
