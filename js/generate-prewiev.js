'use strict';

(function () {

  var preview = document.querySelector('.big-picture');
  var socialComments = preview.querySelector('.social__comments');
  var socialComment = preview.querySelector('.social__comment');
  var commentsCount = preview.querySelector('.social__comment-count');
  var commentsLoader = preview.querySelector('.comments-loader');
  var closePreviewButton = preview.querySelector('#picture-cancel');

  // создание li с комментами для большой картинки
  var generatePreviewComment = function (comment) {
    var socialCommentElement = socialComment.cloneNode(true);

    socialCommentElement.querySelector('.social__picture').src = comment.avatar;
    socialCommentElement.querySelector('.social__picture').alt = comment.name;
    socialCommentElement.querySelector('.social__text').textContent = comment.message;

    return socialCommentElement;
  };

  // функция собирает li в ul больщой картинки
  var renderListOfComments = function (listOfComments) {
    socialComments.innerHTML = '';

    var commentsFragment = document.createDocumentFragment();

    for (var i = 0; i < listOfComments.length; i++) {
      commentsFragment.appendChild(generatePreviewComment(listOfComments[i]));
    }

    return commentsFragment;
  };

  // отрисовка большой картинки
  window.generatePreview = function (generateListItems) {
    preview.querySelector('.big-picture__img img').src = generateListItems.url;
    preview.querySelector('.likes-count').textContent = generateListItems.likes;
    preview.querySelector('.comments-count').textContent = String(generateListItems.comments.length);
    preview.querySelector('.social__caption').textContent = generateListItems.description;
    preview.querySelector('.social__comments').appendChild(renderListOfComments(generateListItems.comments));

    return preview;
  };

  var getPreviewDetails = function (evt) {
    if (evt.code === 'Enter') {
      var templateImgId = evt.target.children[0].id.slice(13);
    } else {
      templateImgId = evt.target.id.slice(13);
    }
    var previewDetails = {
      url: window.pictureItems[templateImgId].url,
      description: window.pictureItems[templateImgId].description,
      likes: window.pictureItems[templateImgId].likes,
      comments: window.pictureItems[templateImgId].comments
    };
    return previewDetails;
  };


  // открытие большой картинки
  var openPreview = function () {
    preview.classList.remove('hidden');
    commentsCount.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');
    closePreviewButton.addEventListener('click', onClosePrewievButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  // закрытие большой картинки
  var closePreview = function () {
    preview.classList.add('hidden');
    closePreviewButton.removeEventListener('click', onClosePrewievButtonClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  var onClosePrewievButtonClick = function () {
    closePreview();
  };

  var onDocumentKeydown = function (evt) {
    window.util.isEscEvent(evt, closePreview);
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
