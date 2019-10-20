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
  var MAX_COMMENTS = 12;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var NAMES = ['Артем', 'Вася', 'Матрена', 'Катюша', 'Слава', 'Поля'];
  var AVATARS = ['1', '2', '3', '4', '5', '6'];
  var PHOTO_ITEMS_COUNT = 25;
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

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
    for (var i = 0; i < count; i++) {
      var shuffledListComments = shuffleList(COMMENTS);
      var listOfMessage = shuffledListComments.slice(0, getRandomNumber(MIN_COMMENTS, MAX_COMMENTS));

      var listOfComments = [];

      for (var j = 0; j < listOfMessage.length; j++) {

        listOfComments [j] = {
          avatar: 'img/avatar-' + getRandomItem(AVATARS) + '.svg',
          message: listOfMessage[j],
          name: getRandomItem(NAMES)
        };
      }
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
    pictureElement.querySelector('.picture__comments').textContent = String(itemsListPhoto.comments.length);

    return pictureElement;
  };

  var bigPicture = document.querySelector('.big-picture');
  var main = document.querySelector('main');
  var socialComments = bigPicture.querySelector('.social__comments');
  var socialComment = socialComments.querySelector('.social__comment');
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

  var closeBigPictureEnterDown = function () {
    if (bigPictureCancel.target === ENTER_KEYCODE) {
      bigPicture.classList.add('hidden');
    }
  };

  picturesList.addEventListener('click', openBigPicture);
  commentsCount.classList.add('visually-hidden');
  commentsLoader.classList.add('visually-hidden');
  bigPictureCancel.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onBigPictureEscDown);
  bigPictureCancel.addEventListener('keydown', closeBigPictureEnterDown);

  // Второй способ вывода li с комментом

  // var renderBigPictureComment = function (comment) {
  //   var commentsFragment = document.createDocumentFragment();

  //   var newListElement = document.createElement('li');
  //   newListElement.className = 'social__comment';

  //   var newImageElement = document.createElement('img');
  //   newImageElement.className = 'social__picture';
  //   newImageElement.src = comment.avatar;
  //   newImageElement.alt = comment.name;

  //   var newCommentElement = document.createElement('p');
  //   newCommentElement.className = 'social__text';
  //   newCommentElement.textContent = comment.message;

  //   newListElement.appendChild(newImageElement);
  //   newListElement.appendChild(newCommentElement);

  //   return commentsFragment.appendChild(newListElement);
  // };

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

  var init = function (generateListItems) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < PHOTO_ITEMS_COUNT; i++) {
      fragment.appendChild(generatePhoto(generateListItems[i]));
    }

    picturesList.appendChild(fragment);
    main.appendChild(generateBigPictureElements(generateListItems));
  };

  init(generateListOfPhotos(PHOTO_ITEMS_COUNT));
})();
