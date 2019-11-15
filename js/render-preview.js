'use strict';

(function () {

  var commentsCount = window.utils.preview.querySelector('.social__comment-count');
  var commentsLoader = window.utils.preview.querySelector('.comments-loader');
  var closePreviewButton = window.utils.preview.querySelector('#picture-cancel');

  // функция сбора в объект данных большой картинки
  var getPreviewDetails = function (evt) {
    var templateImgId;

    if (evt.code === 'Enter') {
      templateImgId = evt.target.children[0].id.slice(13);
    } else {
      templateImgId = evt.target.id.slice(13);
    }

    var bigPictureDetails = {
      url: window.generatedPictures[templateImgId].url,
      description: window.generatedPictures[templateImgId].description,
      likes: window.generatedPictures[templateImgId].likes,
      comments: window.generatedPictures[templateImgId].comments
    };

    return bigPictureDetails;
  };

  // отрисовка большой картинки
  var renderPreview = function (generateListItems) {
    window.utils.preview.querySelector('.big-picture__img img').src = generateListItems.url;
    window.utils.preview.querySelector('.likes-count').textContent = generateListItems.likes;
    window.utils.preview.querySelector('.comments-count').textContent = String(generateListItems.comments.length);
    window.utils.preview.querySelector('.social__caption').textContent = generateListItems.description;
    window.utils.preview.querySelector('.social__comments').appendChild(window.renderListOfComments(generateListItems.comments));

    return window.utils.preview;
  };

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

  var onPicturesListCLick = function (evt) {
    if (evt.target.className === 'picture__img') {
      renderPreview(getPreviewDetails(evt));
      openPreview();
    }
  };

  var onPicturesListKeydown = function (evt) {
    if (evt.code === 'Enter' && evt.target.className === 'picture') {
      renderPreview(getPreviewDetails(evt));
      openPreview();
    }
  };

  window.utils.picturesList.addEventListener('click', onPicturesListCLick);
  window.utils.picturesList.addEventListener('keydown', onPicturesListKeydown);
})();
