'use strict';

(function () {

  var MAX_COMMENTS_TO_SHOW = 5;

  var socialComments = window.utils.preview.querySelector('.social__comments');
  var socialComment = socialComments.querySelector('.social__comment');
  var socialCommentsCount = window.utils.preview.querySelector('.social__comment-count');
  var commentsLoader = window.utils.preview.querySelector('.comments-loader');


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

  window.commentsList = {

    loadMore: function (arr) {
      var commentsForRender = [];

      if (arr.length <= MAX_COMMENTS_TO_SHOW) {
        commentsForRender = renderListOfComments(arr);

        commentsLoader.classList.add('visually-hidden');
        socialCommentsCount.textContent = arr.length + ' из ' + arr.length + ' комментариев';

      } else {
        var arrCopy = arr.slice();
        var slicedArr = arrCopy.slice(0, MAX_COMMENTS_TO_SHOW);

        commentsForRender = renderListOfComments(slicedArr);

        commentsLoader.classList.remove('visually-hidden');
        socialCommentsCount.textContent = slicedArr.length + ' из ' + arr.length + ' комментариев';
      }
      return commentsForRender;
    },

    // TODO переделать, удалить слушатель и название
    // onCommentsLoaderClick
    // onCommentsLoaderClick:

    //   commentsLoader.addEventListener('click', function () {
    //     // renderCommentsOnClick
    //     var totalCommentsCount = arr.length;
    //     var countOfShowedComments = socialComments.querySelectorAll('.social__comment').length;

    //     var needToLoadCommentsCount = totalCommentsCount - countOfShowedComments;

    //     if (needToLoadCommentsCount > MAX_COMMENTS_TO_SHOW) {
    //       commentsForRender = arrCopy.slice(0, countOfShowedComments + MAX_COMMENTS_TO_SHOW);

    //     } else if (needToLoadCommentsCount < MAX_COMMENTS_TO_SHOW) {
    //       needToLoadCommentsCount = MAX_COMMENTS_TO_SHOW;
    //       commentsForRender = arrCopy;

    //       commentsLoader.classList.add('visually-hidden');
    //     }

    //     socialCommentsCount.textContent = commentsForRender.length + ' из ' + arr.length + ' комментариев';
    //     window.utils.preview.querySelector('.social__comments').appendChild(renderListOfComments(commentsForRender));
    //   });

    //   return commentsForRender;
    // }
  };
})();
