'use strict';

(function () {

  var socialComments = window.util.preview.querySelector('.social__comments');
  var socialComment = socialComments.querySelector('.social__comment');

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
  window.renderPreview = function (generateListItems) {
    window.util.preview.querySelector('.big-picture__img img').src = generateListItems.url;
    window.util.preview.querySelector('.likes-count').textContent = generateListItems.likes;
    window.util.preview.querySelector('.comments-count').textContent = String(generateListItems.comments.length);
    window.util.preview.querySelector('.social__caption').textContent = generateListItems.description;
    window.util.preview.querySelector('.social__comments').appendChild(renderListOfComments(generateListItems.comments));

    return window.util.preview;
  };
})();
