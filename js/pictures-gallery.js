'use strict';

(function () {

  var commentsCount = window.preview.querySelector('.social__comment-count');
  var commentsLoader = window.preview.querySelector('.comments-loader');
  var closePrewievButton = window.preview.querySelector('#picture-cancel');

  var openPreview = function () {
    window.preview.classList.remove('hidden');
    commentsCount.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');
    closePrewievButton.addEventListener('click', onClosePrewievButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  var closePreview = function () {
    window.preview.classList.add('hidden');
    closePrewievButton.removeEventListener('click', onClosePrewievButtonClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  var onClosePrewievButtonClick = function () {
    closePreview();
  };

  var onDocumentKeydown = function (evt) {
    window.util.isEscEvent(evt, closePreview);
  };

  // функция сбора в объект данных большой картинки
  var getPreviewDetails = function (evt) {
    if (evt.code === 'Enter') {
      var m = evt.target.children[0].id.slice(1);
    } else {
      m = evt.target.id.slice(1);
    }
    var previewDetails = {
      url: window.picture[m].url,
      description: window.picture[m].description,
      likes: window.picture[m].likes,
      comments: window.picture[m].comments
    };
    return previewDetails;
  };

  var onPicturesListMouseup = function (evt) {
    window.generatePreview(getPreviewDetails(evt));
    openPreview();
  };

  var onPicturesListKeydown = function (evt) {
    if (evt.code === 'Enter') {
      window.generatePreview(getPreviewDetails(evt));
      openPreview();
    }
  };

  window.picturesList.addEventListener('mouseup', onPicturesListMouseup);
  window.picturesList.addEventListener('keydown', onPicturesListKeydown);
})();
