'use strict';

(function () {

  var Scale = {
    MIN: 25,
    MAX: 100,
    STEP: 25,
  };

  var uploadForm = document.querySelector('.img-upload__form');
  var imageUploadPreview = uploadForm.querySelector('.img-upload__preview');
  var scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
  var scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');
  var scaleControlValue = uploadForm.querySelector('.scale__control--value');


  // масштабирование картинки
  var zoomOutPhoto = function () {
    var currentImageSize = parseInt(scaleControlValue. value, 10);
    var setImageSize = currentImageSize - Scale.STEP;
    if (setImageSize <= Scale.STEP) {
      setImageSize = Scale.MIN;
    }
    currentImageSize = setImageSize;
    changeImageSize(currentImageSize);
  };

  var zoomInPhoto = function () {
    var currentImageSize = parseInt(scaleControlValue. value, 10);
    var setImageSize = currentImageSize + Scale.STEP;
    if (setImageSize >= Scale.MAX) {
      setImageSize = Scale.MAX;
    }
    currentImageSize = setImageSize;
    changeImageSize(setImageSize);
  };

  var changeImageSize = function (imageSize) {
    scaleControlValue.value = imageSize + '%';
    imageUploadPreview.style.transform = 'scale' + '(' + imageSize / 100 + ')';
  };

  window.zoom = {

    onScaleControlSmallerMouseup: function () {
      zoomOutPhoto();
    },

    onScaleControlSmallerEnterdown: function (evt) {
      evt.stopPropagation();
      if (evt.code === 'Enter' && document.activeElement === scaleControlSmaller) {
        window.utils.isEnterEvent(evt, zoomOutPhoto);
      } else {
        window.utils.isEscEvent(evt, window.uploadOverlayForm.closeForm);
      }
    },

    onScaleControlBiggerMouseup: function () {
      zoomInPhoto();
    },

    onScaleControlBiggerEnterdown: function (evt) {
      evt.stopPropagation();
      if (evt.code === 'Enter' && document.activeElement === scaleControlBigger) {
        window.utils.isEnterEvent(evt, zoomInPhoto);
      } else {
        window.utils.isEscEvent(evt, window.uploadOverlayForm.closeForm);
      }
    }
  };
})();
