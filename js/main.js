'use strict';

(function () {

  var PHOTOS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'];
  var DESCRIPTIONS = ['фото огонь', 'так себе настроение', 'позитивчик', 'отдыхаю'];
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у нее получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var MIN_COMMENTS = 1;
  var MAX_COMMENTS = 120;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var NAMES = ['Артем', 'Вася', 'Матрена', 'Катюша', 'Слава', 'Поля'];
  var AVATARS = ['1', '2', '3', '4', '5', '6'];
  var PHOTO_ITEMS_COUNT = 25;
  var MAX_HASHTAGS = 5;
  var MAX_HASHTAG_LENGTH = 20;

  var picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var getRandomItem = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var shuffleList = function (a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  };

  var getComments = function (count) {
    var shuffledListComments = shuffleList(COMMENTS);
    var listOfComments = [];
    for (var i = 0; i < count; i++) {

      var comment = {
        avatar: 'img/avatar-' + getRandomItem(AVATARS) + '.svg',
        message: getRandomItem(shuffledListComments),
        name: getRandomItem(NAMES)
      };
      listOfComments.push(comment);
    }
    return listOfComments;
  };

  var generateListOfPhotos = function (count) {
    var shuffledListPhotos = shuffleList(PHOTOS);
    var itemsOfListOfPhotos = [];

    for (var i = 0; i < count; i++) {
      itemsOfListOfPhotos[i] = {
        url: 'photos/' + shuffledListPhotos[i] + '.jpg',
        description: getRandomItem(DESCRIPTIONS),
        likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
        comments: getComments(getRandomNumber(MIN_COMMENTS, MAX_COMMENTS))
      };
    }
    return itemsOfListOfPhotos;
  };

  var generatePhoto = function (itemsListPhoto) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = itemsListPhoto.url;
    pictureElement.querySelector('.picture__likes').textContent = itemsListPhoto.likes;
    pictureElement.querySelector('.picture__comments').textContent = String(itemsListPhoto.comments.length);

    return pictureElement;
  };

  var bigPicture = document.querySelector('.big-picture');
  var socialComments = bigPicture.querySelector('.social__comments');
  var socialComment = socialComments.querySelector('.social__comment');
  var commentsCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  // bigPicture.classList.remove('hidden');

  commentsCount.classList.add('visually-hidden');
  commentsLoader.classList.add('visually-hidden');

  // функция собирает li
  var renderBigPictureComment = function (comment) {
    var socialCommentElement = socialComment.cloneNode(true);

    socialCommentElement.querySelector('.social__picture').src = comment.avatar;
    socialCommentElement.querySelector('.social__picture').alt = comment.name;
    socialCommentElement.querySelector('.social__text').textContent = comment.message;

    return socialCommentElement;
  };

  // функция собирает li в ul
  var renderListOfComments = function (listOfComments) {
    socialComments.innerHTML = '';

    var commentsFragment = document.createDocumentFragment();

    for (var i = 0; i < listOfComments.length; i++) {
      commentsFragment.appendChild(renderBigPictureComment(listOfComments[i]));
    }

    return commentsFragment;
  };

  var generateBigPictureElements = function (generateListItems) {
    bigPicture.querySelector('.big-picture__img').src = generateListItems[0].url;
    bigPicture.querySelector('.likes-count').textContent = generateListItems[0].likes;
    bigPicture.querySelector('.comments-count').textContent = String(generateListItems[0].comments.length);
    bigPicture.querySelector('.social__caption').textContent = generateListItems[0].description;
    bigPicture.querySelector('.social__comments').appendChild(renderListOfComments(generateListItems[0].comments));

    return bigPicture;
  };

  var generatePhotoPage = function (generateListItems) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < PHOTO_ITEMS_COUNT; i++) {
      fragment.appendChild(generatePhoto(generateListItems[i]));
    }

    picturesList.appendChild(fragment);

    generateBigPictureElements(generateListItems);
  };

  generatePhotoPage(generateListOfPhotos(PHOTO_ITEMS_COUNT));

  // задание 4-2

  // загрузка изображения и показ формы редактирования
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFieldset = uploadForm.querySelector('.img-upload__start');
  var uploadButton = uploadFieldset.querySelector('#upload-file');
  var fileName = uploadFieldset.querySelector('input[name = filename]');
  var uploadOverlayForm = uploadForm.querySelector('.img-upload__overlay');
  var closeButtonUploadOverlayForm = uploadOverlayForm.querySelector('#upload-cancel');
  var hashtagFieldset = uploadForm.querySelector('.img-upload__text');
  var hashtagTextField = hashtagFieldset.querySelector('input[name=hashtags]');
  var effectLevel = uploadForm.querySelector('.img-upload__effect-level');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effects = uploadForm.querySelector('.img-upload__effects');
  var effectsItems = effects.querySelector('.effects__item');

  var onUploadFieldsetClick = function () {
    uploadButton.classList.remove('visually-hidden');
  };

  var closeUploadFieldset = function () {
    uploadButton.classList.add('visually-hidden');
  };

  var openUploadOverlayForm = function () {
    uploadOverlayForm.classList.remove('hidden');
  };

  var onUploadFieldsetEnterDown = function (evt) {
    if (evt.code === 'Enter') {
      onUploadFieldsetClick();
    }
  };

  var onUploadFieldsetEscDown = function (evt) {
    if (evt.code === 'Escape') {
      closeUploadFieldset();
    }
  };

  var onDocumentClick = function (evt) {
    if (evt.target !== fileName) {
      closeUploadFieldset();
    }
  };

  var onUploadFieldsetTabDown = function (evt) {
    if (evt.code === 'Tab') {
      closeUploadFieldset();
    }
  };

  var onPhotoPickerClick = function () {
    uploadForm.reset();
    openUploadOverlayForm();
  };

  var closeUploadOverlayForm = function () {
    uploadOverlayForm.classList.add('hidden');
  };

  var onUploadOverlayFormEscDown = function (evt) {
    if (evt.code === 'Escape') {
      if (evt.target === hashtagTextField) {
        evt.stopPropogation();
      } else {
        closeUploadOverlayForm();
      }
    }
  };

  uploadFieldset.addEventListener('click', onUploadFieldsetClick);
  uploadFieldset.addEventListener('keydown', onUploadFieldsetEnterDown);
  document.addEventListener('keydown', onUploadFieldsetEscDown);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onUploadFieldsetTabDown);
  fileName.addEventListener('change', onPhotoPickerClick);
  closeButtonUploadOverlayForm.addEventListener('click', closeUploadOverlayForm);
  document.addEventListener('keydown', onUploadOverlayFormEscDown);

  var effectLevelPinPosition = function (evt) {
    return evt.pageX - effectLevelPin.offsetLeft;
  };

  var depthChange = function (maxFilter) {
    return (effectLevelPinPosition() * maxFilter) / 100;
  };

  var effectLevelReset = function () {
    effectLevel.reset();
  };

  effectLevelPin.addEventListener('mouseup', depthChange);
  effectsItems.addEventListener('change', effectLevelReset);

  // валидация хеш-тегов

  var validateHashtags = function () {
    var a = hashtagTextField.toLowerCase();
    var hashtagList = a.split(' ');

    for (var i = 0; i < hashtagList.length; i++) {
      switch (hashtagList) {
        case (hashtagList[i].indexOf('#') !== 0):
          console.log('хэш-тег начинается с символа #');
          break;
        case (hashtagList[i] === 1 && hashtagList[i].indexOf('#') === 0):
            console.log('хеш-тег не может состоять только из одной решётки');
          break;
        case (hashtagList.include(hashtagList[i])):
            console.log('один и тот же хэш-тег не может быть использован дважды');
          break;
        case (hashtagList.length > MAX_HASHTAGS):
            console.log('максимум пять хэш-тегов');
          break;
        case (hashtagList[i].length > MAX_HASHTAG_LENGTH):
            console.log('максимальная длина одного хэш-тега 20 символов, включая решётку');
          break;
      }
    }
  };

  hashtagTextField.addEventListener('input', validateHashtags);
})();
