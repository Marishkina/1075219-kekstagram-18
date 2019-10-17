'use strict';

(function () {

  var PHOTOS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'];
  var DESCRIPTIONS = ['фото огонь', 'так себе настроение', 'позитивчик', 'отдыхаю'];
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у нее получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var MIN_COMMENTS = 1;
  var MAX_COMMENTS = 2;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var NAMES = ['Артем', 'Вася', 'Матрена', 'Катюша', 'Слава', 'Поля'];
  var AVATARS = ['1', '2', '3', '4', '5', '6'];
  var PHOTO_ITEMS_COUNT = 25;

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

  var comments = function (count) {
    var listOfComments = [];

    for (var i = 0; i < count; i++) {
      var shuffledListComments = shuffleList(COMMENTS);
      var listOfMessage = shuffledListComments.slice(0, getRandomNumber(MIN_COMMENTS, MAX_COMMENTS));

      var name = getRandomItem(AVATARS);

      listOfComments = {
        avatar: 'img/avatar-' + name + '.svg',
        message: listOfMessage,
        name: getRandomItem(NAMES)
      };
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
        comments: comments(PHOTO_ITEMS_COUNT)
      };
    }
    return itemsOfListOfPhotos;
  };

  var generatePhoto = function (itemsListPhoto) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = itemsListPhoto.url;
    pictureElement.querySelector('.picture__likes').textContent = itemsListPhoto.likes;
    pictureElement.querySelector('.picture__comments').textContent = String(itemsListPhoto.comments.message.length);

    return pictureElement;
  };

  // задание - личный проект: больше деталей в module3-task3
  var bigPicture = document.querySelector('.big-picture');
  var socialComment = bigPicture.querySelector('.social__comment');
  var commentsCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var bigPictureCancel = bigPicture.querySelector('#picture-cancel');

  var openBigPicture = function () {
    bigPicture.classList.remove('hidden');
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
  };

  var onBigPictureEscDown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      bigPicture.classList.add('hidden');
    }
  };

  var closeBigPicturEnterDown = function () {
    if (bigPictureCancel.target === ENTER_KEYCODE) {
      bigPicture.classList.add('hidden');
    }
  };

  picturesList.addEventListener('click', openBigPicture);
  commentsCount.classList.add('visually-hidden');
  commentsLoader.classList.add('visually-hidden');
  bigPictureCancel.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onBigPictureEscDown);
  bigPictureCancel.addEventListener('keydown', closeBigPicturEnterDown);

  var generateBigPictureElements = function (generateListItems) {

    bigPicture.querySelector('.big-picture__img').src = generateListItems[0].url;
    bigPicture.querySelector('.likes-count').textContent = generateListItems[0].likes;
    bigPicture.querySelector('.comments-count').textContent = String(generateListItems[0].comments.message.length);
    bigPicture.querySelector('.social__comments .social__picture').src = generateListItems[0].comments.avatar;
    bigPicture.querySelector('.social__comments .social__picture').alt = generateListItems[0].comments.name;
    bigPicture.querySelector('.social__comments .social__text').textContent = generateListItems[0].comments.message;
    bigPicture.querySelector('.social__caption').textContent = generateListItems[0].description;

    return bigPicture;
  };
  // задание 3-3 финиш

  var init = function (generateListItems) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < PHOTO_ITEMS_COUNT; i++) {
      fragment.appendChild(generatePhoto(generateListItems[i]));
    }
    picturesList.appendChild(fragment);
    socialComment.appendChild(generateBigPictureElements(generateListItems));
  };

  init(generateListOfPhotos(PHOTO_ITEMS_COUNT));

  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFieldset = uploadForm.querySelector('.img-upload__start');
  var uploadButton = uploadFieldset.querySelector('#upload-file');
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var TAB_KEYCODE = 9;
  var fileName = uploadFieldset.querySelector('input[name = filename]');
  var uploadOverlayForm = uploadForm.querySelector('.img-upload__overlay');
  var closeButtonUploadOverlayForm = uploadOverlayForm.querySelector('#upload-cancel');
  var effectLevel = uploadForm.querySelector('.img-upload__effect-level');
  // var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var pinEffectLevel = effectLevel.querySelector('.effect-level__pin');
  // var effectLevelValue = effectLevel.querySelector('.effect-level__value');
  var effects = uploadForm.querySelector('.img-upload__effects');
  var effectsItems = effects.querySelector('.effects__item');
  var hashtagFieldset = uploadForm.querySelector('.img-upload__text');
  var hashtagInput = hashtagFieldset.querySelector('input[name=hashtags]');
  var MAX_HASHTAGS = 5;
  var MAX_HASHTAG_LENGTH = 20;

  var openUploadFieldset = function () {
    uploadButton.classList.remove('visually-hidden');
  };

  var closeUploadFieldset = function () {
    uploadButton.classList.add('visually-hidden');
  };

  var openUploadOverlayForm = function () {
    uploadOverlayForm.classList.remove('hidden');
  };

  var onUploadFieldsetEnterDown = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openUploadFieldset();
    }
  };

  var onUploadFieldsetEscDown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeUploadFieldset();
    }
  };

  var closeUploadFieldsetHandler = function (evt) {
    if (evt.target !== fileName) {
      closeUploadFieldset();
    }
  };

  var onUploadFieldsetTabDown = function (evt) {
    if (evt.keyCode === TAB_KEYCODE) {
      closeUploadFieldset();
    }
  };

  var photoSelection = function () {
    uploadForm.reset();
    openUploadOverlayForm();
  };

  var closeUploadOverlayForm = function () {
    uploadOverlayForm.classList.add('hidden');
  };

  var onUploadOverlayFormEscDown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (evt.target === hashtagInput) {
        evt.stopPropogation();
      } else {
        closeUploadOverlayForm();
      }
    }
  };

  // определение уровня насыщенности и нахождение положения пина относительно блока effectLevel
  var pinEffectLevelPosition = function (evt) {
    return evt.pageX - pinEffectLevel.offsetLeft;
  };

  var depthChange = function (maxFilter) {
    return (pinEffectLevelPosition() * maxFilter) / 100;
  };

  // сброс уровня эффекта до начального состояния
  var effectLevelReset = function () {
    effectLevel.reset();
  };

  // валидация хэш-тегов

  var validateHashtags = function () {
    var a = hashtagInput.toLowerCase();
    var hashtagList = a.split(' ');

    for (var i = 0; i < hashtagList.length; i++) {
      if (hashtagList[i].indexOf('#') !== 0) {
        hashtagInput.setCustomValidity('хэш-тег начинается с символа #');
      } else if (hashtagList[i] === 1 && hashtagList[i].indexOf('#') === 0) {
        hashtagInput.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      } else if (hashtagList.include(hashtagList[i])) {
        hashtagInput.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      } else if (hashtagList.length > MAX_HASHTAGS) {
        hashtagInput.setCustomValidity('максимум пять хэш-тегов');
      } else if (hashtagList[i].length > MAX_HASHTAG_LENGTH) {
        hashtagInput.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
      }
    }
  };

  uploadFieldset.addEventListener('click', openUploadFieldset);
  uploadFieldset.addEventListener('keydown', onUploadFieldsetEnterDown);
  document.addEventListener('keydown', onUploadFieldsetEscDown);
  document.addEventListener('click', closeUploadFieldsetHandler);
  document.addEventListener('keydown', onUploadFieldsetTabDown);
  fileName.addEventListener('change', photoSelection);
  closeButtonUploadOverlayForm.addEventListener('click', closeUploadOverlayForm);
  document.addEventListener('keydown', onUploadOverlayFormEscDown);
  effectLevel.addEventListener('mouseup', depthChange);
  effectsItems.addEventListener('change', effectLevelReset); // сброс уровня эффекта до начального состояния при переключении фильтра
  hashtagInput.addEventListener('input', validateHashtags);
})();
