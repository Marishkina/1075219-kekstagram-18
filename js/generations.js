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
  var NAMES = ['Артем', 'Вася', 'Матрена', 'Катюша', 'Слава', 'Поля'];
  var AVATARS = ['1', '2', '3', '4', '5', '6'];
  var MIN_COMMENTS = 1;
  var MAX_COMMENTS = 120;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;

  window.generations = {

    comments: function (count) {
      var shuffledListComments = window.utils.shuffleList(COMMENTS);
      var listOfComments = [];
      for (var i = 0; i < count; i++) {

        var comment = {
          avatar: 'img/avatar-' + window.utils.getRandomItem(AVATARS) + '.svg',
          message: window.utils.getRandomItem(shuffledListComments),
          name: window.utils.getRandomItem(NAMES)
        };
        listOfComments.push(comment);
      }

      return listOfComments;
    },

    // генерация массива объектов для миниатюры
    pictures: function (count) {
      var shuffledListPhotos = window.utils.shuffleList(PHOTOS);
      var itemsOfListOfPhotos = [];

      for (var i = 0; i < count; i++) {
        itemsOfListOfPhotos[i] = {
          url: 'photos/' + shuffledListPhotos[i] + '.jpg',
          description: window.utils.getRandomItem(DESCRIPTIONS),
          likes: window.utils.getRandomNumber(MIN_LIKES, MAX_LIKES),
          comments: window.generations.comments(window.utils.getRandomNumber(MIN_COMMENTS, MAX_COMMENTS))
        };
      }

      return itemsOfListOfPhotos;
    }

  };
})();
