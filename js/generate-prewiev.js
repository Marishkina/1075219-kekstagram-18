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
    console.log(evt.target);
    // console.log(evt.target.indexOf(window.photo));
    // var target = evt.target.indexOf(evt.target);

    // arr.some(callback(element[, index[, array]])[, thisArg])

    //   var isEven = function isEven(currentElement, index, array) {
    //     if(currentElement % 2 === 0) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    var templateImgId;

    if (evt.code === 'Enter') {
      templateImgId = Number(evt.target.children[0].id.slice(13));
    } else {
      templateImgId = Number(evt.target.id.slice(13));
    }

    // Получили данные с сервера и записали их в переменную data
    // var previewM = window.photo.filter(function (el) {

    //   return window.photo.some(function (element, index) {

    //     return element.id === templateImgId;
    //   });
    // });

    // var previewM = window.photo.some(function (element, index) {
    //   console.log('index', index);
    //   var Marina = index;
    //   // console.log('element.id', element.id, '****', typeof element.id);
    //   // console.log('templateImgId', templateImgId, '****', typeof templateImgId);
    //   return element.id === templateImgId;
    // });

    var previewDetails = window.photo.find(function (element) {
      return element.id === templateImgId;
    });

    // console.log('Marina', Marina);
    console.log('previewDetails', previewDetails);

    // // TODO
    // var previewDetails = {
    //   url: window.photo[templateImgId].url,
    //   description: window.photo[templateImgId].description,
    //   likes: window.photo[templateImgId].likes,
    //   comments: window.photo[templateImgId].comments
    // };


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
      console.log('getPreviewDetails=', getPreviewDetails(evt));
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
