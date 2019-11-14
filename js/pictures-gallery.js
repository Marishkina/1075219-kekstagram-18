'use strict';

(function () {

  var commentsCount = window.utils.preview.querySelector('.social__comment-count');
  var commentsLoader = window.utils.preview.querySelector('.comments-loader');
  var closePreviewButton = window.utils.preview.querySelector('#picture-cancel');

  var openPreview = function () {
    window.utils.preview.classList.remove('hidden');
    commentsCount.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');
    closePreviewButton.addEventListener('click', onClosePreviewButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
    document.querySelector('body').classList.add('modal-open');
    window.utils.preview.focus();
  };

  var closePreview = function () {
    window.utils.preview.classList.add('hidden');
    closePreviewButton.removeEventListener('click', onClosePreviewButtonClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  var onClosePreviewButtonClick = function () {
    closePreview();
  };

  var onDocumentKeydown = function (evt) {
    window.utils.isEscEvent(evt, closePreview);
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
      url: window.generatedData[templateImgId].url,
      description: window.generatedData[templateImgId].description,
      likes: window.generatedData[templateImgId].likes,
      comments: window.generatedData[templateImgId].comments
    };

    return bigPictureDetails;
  };

  var onPicturesListCLick = function (evt) {
    if (evt.target.className === 'picture__img') {
      window.renderPreview(getPreviewDetails(evt));
      openPreview();
    }
  };

  var onPicturesListKeydown = function (evt) {
    if (evt.code === 'Enter' && evt.target.className === 'picture') {
      window.renderPreview(getPreviewDetails(evt));
      openPreview();
    }
  };

  window.utils.picturesList.addEventListener('click', onPicturesListCLick);
  window.utils.picturesList.addEventListener('keydown', onPicturesListKeydown);
})();
