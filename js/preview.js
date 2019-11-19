'use strict';

(function () {

  var closePreviewButton = window.utils.preview.querySelector('#picture-cancel');
  var body = document.querySelector('body');
  var commentsLoader = window.utils.preview.querySelector('.comments-loader');

  // получаем id активной миниатюры, сравниваем с id элемента массива с сервера, получаем данные
  var getPreviewDetails = function (evt) {
    var templateImgId;

    if (evt.code === 'Enter') {
      templateImgId = Number(evt.target.children[0].id.slice(13));
    } else {
      templateImgId = Number(evt.target.id.slice(13));
    }

    var previewDetails = window.pictures.find(function (element) {
      return element.id === templateImgId;
    });

    return previewDetails;
  };

  // открытие большой картинки
  var openPreview = function () {
    window.utils.preview.classList.remove('hidden');
    closePreviewButton.addEventListener('click', onClosePreviewButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
    body.classList.add('modal-open');
    window.utils.preview.focus();
    commentsLoader.addEventListener('click', window.onCommentsLoaderClick);
  };

  // закрытие большой картинки
  var closePreview = function () {
    window.utils.preview.classList.add('hidden');
    closePreviewButton.removeEventListener('click', onClosePreviewButtonClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    body.classList.remove('modal-open');
    commentsLoader.removeEventListener('click', window.onCommentsLoaderClick);

  };

  var onClosePreviewButtonClick = function () {
    closePreview();
  };

  var onDocumentKeydown = function (evt) {
    window.utils.isEscEvent(evt, closePreview);
  };

  var onPicturesListCLick = function (evt) {
    if (evt.target.className === 'picture__img') {
      generatePreview(getPreviewDetails(evt));
      openPreview();
    }
  };

  var onPicturesListKeydown = function (evt) {
    if (evt.code === window.utils.keyCode.ENTER_CODE && evt.target.className === 'picture') {
      generatePreview(getPreviewDetails(evt));
      openPreview();
    }
  };

  // отрисовка большой картинки
  var generatePreview = function (generateListItems) {

    window.utils.preview.querySelector('.big-picture__img img').src = generateListItems.url;
    window.utils.preview.querySelector('.likes-count').textContent = generateListItems.likes;
    window.utils.preview.querySelector('.social__caption').textContent = generateListItems.description;

    window.utils.preview.querySelector('.social__comments')
      .appendChild(window.commentsList.render(generateListItems.comments));

    return window.utils.preview;
  };

  window.utils.picturesList.addEventListener('click', onPicturesListCLick);
  window.utils.picturesList.addEventListener('keydown', onPicturesListKeydown);
})();
