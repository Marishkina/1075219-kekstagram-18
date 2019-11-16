'use strict';

(function () {

  var Scale = {
    MIN: 25,
    MAX: 100,
    STEP: 25,
  };

  var uploadForm = document.querySelector('.img-upload__form');
  var imageUploadPreview = uploadForm.querySelector('.img-upload__preview');
  var scaleControlValue = uploadForm.querySelector('.scale__control--value');

  var changeImageSize = function (imageSize) {
    scaleControlValue.value = imageSize + '%';
    imageUploadPreview.style.transform = 'scale' + '(' + imageSize / 100 + ')';
  };

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

  window.zoom = {
    out: zoomOutPhoto,
    in: zoomInPhoto
  };
})();
