'use strict';

(function () {

  var uploadForm = document.querySelector('.img-upload__form');
  var effectLevel = uploadForm.querySelector('.img-upload__effect-level');
  var imageUploadPreview = uploadForm.querySelector('.img-upload__preview');
  var photoEffects = uploadForm.querySelector('.img-upload__effects');
  var chromePreview = photoEffects.querySelector('#effect-chrome');
  var sepiaPreview = photoEffects.querySelector('#effect-sepia');
  var marvinPreview = photoEffects.querySelector('#effect-marvin');
  var phobosPreview = photoEffects.querySelector('#effect-phobos');
  var heatPreview = photoEffects.querySelector('#effect-heat');
  var scaleControlValue = uploadForm.querySelector('.scale__control--value');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var effectLevelValue = uploadForm.querySelector('.effect-level__value');


  // установка мах значения для phobos эффекта
  var blurScale = function () {
    var value = window.slider.getEffectLevelValue() / 30;
    if (value > 3) {
      value = 3;
    }
    return value;
  };

  // установка мин и мах значений для heat эффекта
  var brightnessScale = function () {
    var value = window.slider.getEffectLevelValue() / 30;
    if (value > 3) {
      value = 3;
    } else if (value < 1) {
      value = 1;
    }
    return value;
  };

  // сброс уровня эффекта до начального состояния (100%)
  var setOriginFilter = function () {
    imageUploadPreview.classList.remove('effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
    imageUploadPreview.style.filter = 'none';
    imageUploadPreview.style.transform = 'scale(1)';
    effectLevelDepth.style.width = '100%';
    effectLevelPin.style.left = '100%';
    effectLevelValue.setAttribute('value', 100);
    scaleControlValue.value = '100%';
  };

  var changeEffects = function () {
    var effects = photoEffects.elements;

    setOriginFilter();

    for (var i = 0; i < effects.length; i++) {

      if (effects[i].checked) {
        switch (effects[i].value) {

          case ('chrome'):
            imageUploadPreview.classList.add('effects__preview--chrome');
            effectLevel.classList.remove('visually-hidden');
            imageUploadPreview.style.filter = 'grayscale' + '(' + window.slider.getEffectLevelValue() / 100 + ')';
            break;
          case ('sepia'):
            imageUploadPreview.classList.add('effects__preview--sepia');
            effectLevel.classList.remove('visually-hidden');
            imageUploadPreview.style.filter = 'sepia' + '(' + window.slider.getEffectLevelValue() / 100 + ')';
            break;
          case ('marvin'):
            imageUploadPreview.classList.add('effects__preview--marvin');
            effectLevel.classList.remove('visually-hidden');
            imageUploadPreview.style.filter = 'invert' + '(' + window.slider.getEffectLevelValue() + '%' + ')';
            break;
          case ('phobos'):
            imageUploadPreview.classList.add('effects__preview--phobos');
            effectLevel.classList.remove('visually-hidden');
            imageUploadPreview.style.filter = 'blur' + '(' + Math.round(window.slider.getEffectLevelValue() / 3 / 10) + 'px' + ')';
            break;
          case ('heat'):
            imageUploadPreview.classList.add('effects__preview--heat');
            effectLevel.classList.remove('visually-hidden');
            imageUploadPreview.style.filter = 'brightness' + '(' + Math.round(window.slider.getEffectLevelValue() / 3 / 10) + ')';
            break;
        }
      }
    }
  };

  window.effects = {
    change: changeEffects,
    setOriginFilter: setOriginFilter,

    getEffectLevel: function () {
      if (chromePreview.checked) {
        imageUploadPreview.style.filter = 'grayscale' + '(' + window.slider.getEffectLevelValue() / 100 + ')';
      } else if (sepiaPreview.checked) {
        imageUploadPreview.style.filter = 'sepia' + '(' + window.slider.getEffectLevelValue() / 100 + ')';
      } else if (marvinPreview.checked) {
        imageUploadPreview.style.filter = 'invert' + '(' + window.slider.getEffectLevelValue() + '%' + ')';
      } else if (phobosPreview.checked) {
        imageUploadPreview.style.filter = 'blur' + '(' + blurScale() + 'px' + ')';
      } else if (heatPreview.checked) {
        imageUploadPreview.style.filter = 'brightness' + '(' + brightnessScale() + ')';
      }
    }
  };
})();
