'use strict';

(function () {

  var MAX_COMMENTS = 5;
  var preview = document.querySelector('.big-picture');
  var socialComments = preview.querySelector('.social__comments');
  var socialComment = preview.querySelector('.social__comment');
  var socialCommentsCount = preview.querySelector('.social__comment-count');
  var commentsCount = preview.querySelector('.comment-count');
  var commentsLoader = preview.querySelector('.comments-loader');
  var closePreviewButton = preview.querySelector('#picture-cancel');

  // создание li с комментами для большой картинки
  var generatePreviewComment = function (comment) {
    var socialCommentElement = socialComment.cloneNode(true);
    // console.log(comment);
    // console.log(comment.name);
    // console.log(comment.avatar);
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

    if (listOfComments.length <= MAX_COMMENTS) {
      commentsForRender = renderListOfComments(listOfComments);

      commentsLoader.classList.add('visually-hidden');
      socialCommentsCount.textContent = listOfComments.length + ' из ' + listOfComments.length + ' комментариев';
    } else {

      var copyListOfComments = listOfComments.slice();

      commentsForRender = renderListOfComments(loadMoreComments(copyListOfComments));
    }

    return commentsForRender;
  };

  var loadMoreComments = function (listOfComments) {
    var commentsForRender = [];

    var slicedListOfComments = listOfComments.slice(0, 5);

    for (var i = 0; i < slicedListOfComments.length; i++) {

      commentsForRender = slicedListOfComments;

      commentsLoader.classList.remove('visually-hidden');
      socialCommentsCount.textContent = commentsForRender.length + ' из ' + listOfComments.length + ' комментариев';
    }

    return commentsForRender;
  };

  commentsLoader.addEventListener('click', loadMoreComments);

  // var loadComments = function (listOfComments) {
  //   var commentsForRender = [];

  //   if (listOfComments.length <= MAX_COMMENTS) {
  //     commentsForRender = renderListOfComments(listOfComments);

  //     commentsLoader.classList.add('visually-hidden');
  //     socialCommentsCount.textContent = listOfComments.length + ' из ' + listOfComments.length + ' комментариев';
  //   } else {

  //     var copyListOfComments = listOfComments.slice();
  //     var slicedListOfComments = copyListOfComments.slice(0, 5);
  //     console.log(slicedListOfComments);

  //     // for (var i = 0; i < slicedListOfComments; i++) {

  //       commentsForRender = renderListOfComments(slicedListOfComments);
  //     // }
  //   }
  //   console.log(commentsForRender);
  //   return commentsForRender;
  // };

  // var loadMoreComments = function (listOfComments) {
  //   var commentsForRender = [];

  //   var v = listOfComments.slice();
  //   var slicedListOfComments = v.slice(0, 5);

  //   for (var i = 0; i < slicedListOfComments.length; i++) {
  //     commentsForRender = renderListOfComments(slicedListOfComments);

  //     commentsForRender = slicedListOfComments;

  //     commentsLoader.classList.remove('visually-hidden');
  //     socialCommentsCount.textContent = commentsForRender.length + ' из ' + listOfComments.length + ' комментариев';
  //   }

  //   return commentsForRender;
  // };

  // отрисовка большой картинки
  window.generatePreview = function (generateListItems) {

    preview.querySelector('.big-picture__img img').src = generateListItems.url;
    preview.querySelector('.likes-count').textContent = generateListItems.likes;
    // preview.querySelector('.comments-count').textContent = String(generateListItems.comments.length);
    preview.querySelector('.social__caption').textContent = generateListItems.description;
    console.log(loadComments(generateListItems.comments));
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
    // commentsCount.classList.add('visually-hidden');
    // commentsLoader.classList.add('visually-hidden');
    closePreviewButton.addEventListener('click', onClosePrewievButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
    document.querySelector('body').classList.add('modal-open');
    preview.focus();
  };

  // закрытие большой картинки
  var closePreview = function () {
    preview.classList.add('hidden');
    closePreviewButton.removeEventListener('click', onClosePrewievButtonClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    document.querySelector('body').classList.remove('modal-open');

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
