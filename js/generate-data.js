'use strict';

(function () {

  var PHOTOS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'];
  var DESCRIPTIONS = ['фото огонь', 'так себе настроение', 'позитивчик', 'отдыхаю'];
  var MIN_COMMENTS = 1;
  var MAX_COMMENTS = 120;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;

  // генерация массива объектов для миниатюры
  window.generateData = function (count) {
    var shuffledListPhotos = window.utils.shuffleList(PHOTOS);
    var itemsOfListOfPhotos = [];

    for (var i = 0; i < count; i++) {
      itemsOfListOfPhotos[i] = {
        url: 'photos/' + shuffledListPhotos[i] + '.jpg',
        description: window.utils.getRandomItem(DESCRIPTIONS),
        likes: window.utils.getRandomNumber(MIN_LIKES, MAX_LIKES),
        comments: window.getComments(window.utils.getRandomNumber(MIN_COMMENTS, MAX_COMMENTS))
      };
    }

    return itemsOfListOfPhotos;
  };
})();
