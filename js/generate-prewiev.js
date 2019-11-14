'use strict';

(function () {

  var MAX_COMMENTS_TO_SHOW = 5;
  var preview = document.querySelector('.big-picture');
  var socialComments = preview.querySelector('.social__comments');
  var socialComment = preview.querySelector('.social__comment');
  var socialCommentsCount = preview.querySelector('.social__comment-count');
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

  // функция собирает li в ul большой картинки
  var renderListOfComments = function (listOfComments) {

    socialComments.innerHTML = '';

    var commentsFragment = document.createDocumentFragment();

    for (var i = 0; i < listOfComments.length; i++) {

      commentsFragment.appendChild(generatePreviewComment(listOfComments[i]));

    }

    return commentsFragment;
  };

  var loadComments = function (listOfComments) {
    var commentsForRender = [];

    if (listOfComments.length <= MAX_COMMENTS_TO_SHOW) {
      commentsForRender = renderListOfComments(listOfComments);

      commentsLoader.classList.add('visually-hidden');
      socialCommentsCount.textContent = listOfComments.length + ' из ' + listOfComments.length + ' комментариев';

    } else {
      var copyListOfComments = listOfComments.slice();
      var slicedListOfComments = copyListOfComments.slice(0, MAX_COMMENTS_TO_SHOW);

      commentsForRender = renderListOfComments(slicedListOfComments);

      commentsLoader.classList.remove('visually-hidden');
      socialCommentsCount.textContent = slicedListOfComments.length + ' из ' + listOfComments.length + ' комментариев';
    }

    window.onCommentsLoaderClick = function () {
      var totalCommentsCount = listOfComments.length;
      var countOfShowedComments = socialComments.querySelectorAll('.social__comment').length;
      var needToLoadCount = totalCommentsCount - countOfShowedComments;

      if (needToLoadCount > MAX_COMMENTS_TO_SHOW) {
        commentsForRender = copyListOfComments.slice(0, countOfShowedComments + MAX_COMMENTS_TO_SHOW);

      } else if (needToLoadCount < MAX_COMMENTS_TO_SHOW) {
        needToLoadCount = MAX_COMMENTS_TO_SHOW;
        commentsForRender = copyListOfComments;

        commentsLoader.classList.add('visually-hidden');
      }

      socialCommentsCount.textContent = commentsForRender.length + ' из ' + listOfComments.length + ' комментариев';
      preview.querySelector('.social__comments').appendChild(renderListOfComments(commentsForRender));
    };

    return commentsForRender;
  };

  // отрисовка большой картинки
  window.generatePreview = function (generateListItems) {

    preview.querySelector('.big-picture__img img').src = generateListItems.url;
    preview.querySelector('.likes-count').textContent = generateListItems.likes;
    preview.querySelector('.social__caption').textContent = generateListItems.description;
    preview.querySelector('.social__comments').appendChild(loadComments(generateListItems.comments));

    return preview;
  };

  var getPreviewDetails = function (evt) {
    var templateImgId;

    if (evt.code === 'Enter') {
      templateImgId = evt.target.children[0].id.slice(13);
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
    closePreviewButton.addEventListener('click', onClosePrewievButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
    document.querySelector('body').classList.add('modal-open');
    preview.focus();
    commentsLoader.addEventListener('click', window.onCommentsLoaderClick);
  };

  // закрытие большой картинки
  var closePreview = function () {
    preview.classList.add('hidden');
    closePreviewButton.removeEventListener('click', onClosePrewievButtonClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    document.querySelector('body').classList.remove('modal-open');
    commentsLoader.removeEventListener('click', window.onCommentsLoaderClick);
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
