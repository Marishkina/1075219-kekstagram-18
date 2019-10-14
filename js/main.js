'use strict';

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Добавляет массив объектов - комментарии, добавляет iife
(function () {

  var PHOTOS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'];
  var DESCRIPTIONS = ['фото огонь', 'так себе настроение', 'позитивчик', 'отдыхаю'];
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у нее получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var MIN_COMMENTS = 1;
  var MAX_COMMENTS = 2;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var NAMES = ['Артем', 'Вася', 'Матрена', 'Катюша', 'Слава', 'Поля'];
  var AVATARS = ['avatar-1.svg', 'avatar-2.svg', 'avatar-3.svg', 'avatar-4.svg', 'avatar-5.svg', 'avatar-6.svg'];
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

      listOfComments = {
        avatar: getRandomItem(AVATARS),
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

  var init = function (generateListItems) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < PHOTO_ITEMS_COUNT; i++) {
      fragment.appendChild(generatePhoto(generateListItems[i]));
    }
    picturesList.appendChild(fragment);
  };

  init(generateListOfPhotos(PHOTO_ITEMS_COUNT));

  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFieldset = uploadForm.querySelector('.img-upload__start');
  var uploadButton = uploadFieldset.querySelector('#upload-file');
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var uploadOverlayForm = uploadForm.querySelector('.img-upload__overlay');
  var fileName = uploadFieldset.querySelector('input[name = filename]');

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
      if (evt.target === fileName) {
        evt.stopPropagation();
      } else {
        closeUploadFieldset();
      }
    }
  };

  var openOverlayForm = function (evt) {
    if (evt.target === fileName) {
      openUploadOverlayForm();
    } else {
      closeUploadFieldset();
    }
  };

  uploadFieldset.addEventListener('click', openUploadFieldset);
  uploadFieldset.addEventListener('keydown', onUploadFieldsetEnterDown);
  document.addEventListener('keydown', onUploadFieldsetEscDown);
  document.addEventListener('click', onUploadFieldsetEscDown);
  uploadFieldset.addEventListener('click', openOverlayForm);
  uploadFieldset.addEventListener('keydown', openOverlayForm);
})();
<<<<<<< HEAD
=======
var PHOTOS = ['photos/1.jpg', 'photos/2.jpg', 'photos/3.jpg', 'photos/4.jpg', 'photos/5.jpg', 'photos/6.jpg', 'photos/7.jpg', 'photos/8.jpg', 'photos/9.jpg', 'photos/10.jpg', 'photos/11.jpg', 'photos/12.jpg', 'photos/13.jpg', 'photos/14.jpg', 'photos/15.jpg', 'photos/16.jpg', 'photos/17.jpg', 'photos/18.jpg', 'photos/19.jpg', 'photos/20.jpg', 'photos/21.jpg', 'photos/22.jpg', 'photos/23.jpg', 'photos/24.jpg', 'photos/25.jpg'];
var DESCRIPTIONS = ['фото огонь', 'так себе настроение', 'позитивчик', 'отдыхаю'];
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у нее получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var MIN_COMMENTS = 1;
var MAX_COMMENTS = 2;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var NAMES = ['Артем', 'Вася', 'Матрена', 'Катюша', 'Слава', 'Поля'];
var AVATARS = ['avatar-1.svg', 'avatar-2.svg', 'avatar-3.svg', 'avatar-4.svg', 'avatar-5.svg', 'avatar-6.svg'];
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

var generateListOfPhotos = function (count) {
  var shuffledListPhotos = shuffleList(PHOTOS);
  var itemsOfListOfPhotos = [];

  for (var i = 0; i < count; i++) {
    var shuffledListComments = shuffleList(COMMENTS);
    var listOfComments = shuffledListComments.slice(0, getRandomNumber(MIN_COMMENTS, MAX_COMMENTS));

    itemsOfListOfPhotos[i] = {
      name: getRandomItem(NAMES),
      avatar: getRandomItem(AVATARS),
      message: getRandomItem(DESCRIPTIONS),
      url: shuffledListPhotos[i],
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      commentsCount: listOfComments.length,
      comments: listOfComments
    };
  }
  return itemsOfListOfPhotos;
};

var generatePhoto = function (itemsListPhoto) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = itemsListPhoto.url;
  pictureElement.querySelector('.picture__likes').textContent = itemsListPhoto.likes;
  pictureElement.querySelector('.picture__comments').textContent = itemsListPhoto.commentsCount;

  return pictureElement;
};

var init = function (generateListItems) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < PHOTO_ITEMS_COUNT; i++) {
    fragment.appendChild(generatePhoto(generateListItems[i]));
  }
  picturesList.appendChild(fragment);
<<<<<<< HEAD
}
init();
>>>>>>> Правит функцию renderComments
=======
};

init(generateListOfPhotos(PHOTO_ITEMS_COUNT));
>>>>>>> Делает функцию init - функциональным выражением, правит название переменных и меняет функцию init
=======
>>>>>>> Добавляет массив объектов - комментарии, добавляет iife
