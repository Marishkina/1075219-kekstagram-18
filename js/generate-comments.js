'use strict';

(function () {

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

  window.getComments = function (count) {
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
  };
})();
