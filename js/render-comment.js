'use strict';

(function () {

  var socialComments = window.utils.preview.querySelector('.social__comments');
  var socialComment = socialComments.querySelector('.social__comment');

  // создание li с комментами для большой картинки
  var generatePreviewComment = function (comment) {
    var socialCommentElement = socialComment.cloneNode(true);

    socialCommentElement.querySelector('.social__picture').src = comment.avatar;
    socialCommentElement.querySelector('.social__picture').alt = comment.name;
    socialCommentElement.querySelector('.social__text').textContent = comment.message;

    return socialCommentElement;
  };

  // функция собирает li с комментами в ul большой картинки
<<<<<<< HEAD:js/comments-list.js
  window.commentsList = {
=======
  window.renderListOfComments = function (listOfComments) {
    socialComments.innerHTML = '';
>>>>>>> Правки в render-preview:js/render-comment.js

    render: function (listOfComments) {
      socialComments.innerHTML = '';

      var commentsFragment = document.createDocumentFragment();

      for (var i = 0; i < listOfComments.length; i++) {
        commentsFragment.appendChild(generatePreviewComment(listOfComments[i]));
      }

      return commentsFragment;
    }
  };
})();
