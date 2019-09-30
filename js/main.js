'use strict';

var PHOTOS = ['photos/1.jpg', 'photos/2.jpg', 'photos/3.jpg', 'photos/4.jpg', 'photos/5.jpg', 'photos/6.jpg', 'photos/7.jpg', 'photos/8.jpg', 'photos/9.jpg', 'photos/10.jpg', 'photos/11.jpg', 'photos/12.jpg', 'photos/13.jpg', 'photos/14.jpg', 'photos/15.jpg', 'photos/16.jpg', 'photos/17.jpg', 'photos/18.jpg', 'photos/19.jpg', 'photos/20.jpg', 'photos/21.jpg', 'photos/22.jpg', 'photos/23.jpg', 'photos/24.jpg', 'photos/25.jpg'];
var DESCRIPTIONS = ['фото огонь', 'так себе настроение', 'позитивчик', 'отдыхаю'];
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у нее получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var MIN_COMMENTS = 1;
var MAX_COMMENTS = 2;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var NAMES = ['Артем', 'Вася', 'Матрена', 'Катюша', 'Слава', 'Поля'];
var AVATARS = ['avatar-1.svg', 'avatar-2.svg', 'avatar-3.svg', 'avatar-4.svg', 'avatar-5.svg', 'avatar-6.svg'];
var COUNT = 25;
var picturesList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var getRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var shuffleArray = function (a) {
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

var renderComments = function (array) {
  var commentsCount = array[getRandomNumber(MIN_COMMENTS, MAX_COMMENTS)];
  for (var i = 0; i < commentsCount; i++) {
    var newCommentsArray = commentsCount;
    newCommentsArray[i] = getRandomItem(array);
  }
  return newCommentsArray;
};

var getKekstagramArray = function (count) {
  var shuffledArrayPhotos = shuffleArray(PHOTOS);
  var array = [];

  for (var i = 0; i < count; i++) {
    array[i] = {
      name: getRandomItem(NAMES),
      avatar: getRandomItem(AVATARS),
      message: getRandomItem(DESCRIPTIONS),
      url: shuffledArrayPhotos[i],
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      commentsCount: getRandomNumber(MIN_COMMENTS, MAX_COMMENTS),
      comments: renderComments(COMMENTS)
    };
  }
  return array;
};

var renderKeksktagramArray = function (kekstagramArray) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = kekstagramArray.url;
  pictureElement.querySelector('.picture__likes').textContent = kekstagramArray.likes;
  pictureElement.querySelector('.picture__comments').textContent = kekstagramArray.commentsCount;

  return pictureElement;
};

function init() {
  var kekstagramArray = getKekstagramArray(COUNT);
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < kekstagramArray.length; i++) {
    fragment.appendChild(renderKeksktagramArray(kekstagramArray[i]));
  }
  picturesList.appendChild(fragment);
}
init();
