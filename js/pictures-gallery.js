'use strict';

(function () {

  var commentsCount = window.preview.querySelector('.social__comment-count');
  var commentsLoader = window.preview.querySelector('.comments-loader');
  var closePreviewButton = window.preview.querySelector('#picture-cancel');

  var openPreview = function () {
    window.preview.classList.remove('hidden');
    commentsCount.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');
    closePreviewButton.addEventListener('click', onClosePreviewButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
    document.querySelector('body').classList.add('modal-open');
    window.preview.focus();
  };

  var closePreview = function () {
    window.preview.classList.add('hidden');
    closePreviewButton.removeEventListener('click', onClosePreviewButtonClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  var onClosePreviewButtonClick = function () {
    closePreview();
  };

  var onDocumentKeydown = function (evt) {
    window.util.isEscEvent(evt, closePreview);
  };

  // функция сбора в объект данных большой картинки
  var getPreviewDetails = function (evt) {
    var templateImgId;

    if (evt.code === 'Enter') {
      templateImgId = evt.target.children[0].id.slice(13);
    } else {
      templateImgId = evt.target.id.slice(13);
    }

    var bigPictureDetails = {
      url: window.picture[templateImgId].url,
      description: window.picture[templateImgId].description,
      likes: window.picture[templateImgId].likes,
      comments: window.picture[templateImgId].comments
    };

    return bigPictureDetails;
  };

  var onPicturesListCLick = function (evt) {
    if (evt.target.className === 'picture__img') {
      window.generatePreview(getPreviewDetails(evt));
      openPreview();
    }
  };

  var onPicturesListKeydown = function (evt) {
    if (evt.code === 'Enter' && evt.target.className === 'picture') {
      window.generatePreview(getPreviewDetails(evt));
      openPreview();
    }
  };

  window.picturesList.addEventListener('click', onPicturesListCLick);
  window.picturesList.addEventListener('keydown', onPicturesListKeydown);
})();
