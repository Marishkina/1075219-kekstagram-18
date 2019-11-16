'use strict';

(function () {

  var Hashtag = {
    MAX_COUNT: 5,
    MAX_LENGTH: 20
  };
  var MAX_COMMENT_LENGTH = 140;

  var uploadForm = document.querySelector('.img-upload__form');
  var commentsField = uploadForm.querySelector('.text__description');
  var hashtagTextField = document.querySelector('input[name=hashtags]');


  window.validations = {

    onCommentsFieldChange: function () {
      if (commentsField.value.length > MAX_COMMENT_LENGTH) {
        commentsField.classList.add('error-field');
        commentsField.setCustomValidity('максимальная длина комментария 140 символов');
      } else {
        commentsField.classList.remove('error-field');
        commentsField.setCustomValidity('');
      }
    },

    onHashtagTextFieldInput: function () {
      hashtagTextField.setCustomValidity('');
      var hashtagTextFieldContent = hashtagTextField.value;
      var hashtagsList = hashtagTextFieldContent.toLowerCase().split(' ');

      if (hashtagTextField.value.length === 0) {
        hashtagTextField.classList.remove('error-field');
        hashtagTextField.setCustomValidity('');
      } else if (hashtagsList.length > Hashtag.MAX_COUNT) {
        hashtagTextField.classList.add('error-field');
        hashtagTextField.setCustomValidity('максимум 5 хэш-тегов');
      } else {
        for (var i = 0; i < hashtagsList.length; i++) {
          if (hashtagsList[i].indexOf(0) !== '#') {
            hashtagTextField.classList.add('error-field');
            hashtagTextField.setCustomValidity('хэш-тег начинается с символа #');
          } else if (hashtagsList[i] === '#') {
            hashtagTextField.classList.add('error-field');
            hashtagTextField.setCustomValidity('хеш-тег не может состоять только из одной решётки');
          } else if (hashtagsList.indexOf(hashtagsList[i]) !== i) {
            hashtagTextField.classList.add('error-field');
            hashtagTextField.setCustomValidity('один и тот же хеш-тег не может быть использован дважды');
          } else if (hashtagsList[i].length > Hashtag.MAX_LENGTH) {
            hashtagTextField.classList.add('error-field');
            hashtagTextField.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
          } else {
            hashtagTextField.classList.remove('error-field');
            hashtagTextField.setCustomValidity('');
          }
        }
      }
    }
  };
})();
