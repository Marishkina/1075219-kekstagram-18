'use strict';

(function () {

  var Slider = {
    MIN_VALUE: 0,
    MAX_VALUE: 100
  };

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

  var coordinateSliderPin = function (evt) {
    var maxEffectScale = getWidthOfEffectLevelLine();
    var minEffectScale = Slider.MIN_VALUE;

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
      window.effects.getEffectLevel();

      getPinPosition();
      upEvt.preventDefault();

      effectLevelPin.removeEventListener('mousemove', onEffectLevelPinMousemove);
      effectLevelPin.removeEventListener('mouseup', onEffectLevelPinMouseup);
    };

    effectLevelPin.addEventListener('mousemove', onEffectLevelPinMousemove);
    effectLevelPin.addEventListener('mouseup', onEffectLevelPinMouseup);
  };

  // пропорция определяет % соотношение уровня эффекта
  window.slider = {
    coordinate: coordinateSliderPin,

    getEffectLevelValue: function () {
      var pinPosition = getPinPosition();
      var value;

      if (pinPosition === Slider.MAX_VALUE) {
        value = Slider.MAX_VALUE;
      } else {
        value = Math.round(pinPosition * 100 / getWidthOfEffectLevelLine());
        effectLevelValue.setAttribute('value', value);
      }
      return value;
    },
  };
})();
