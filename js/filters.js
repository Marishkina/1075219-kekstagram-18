'use strict';

(function () {

  var RANDOM_PHOTO_NUMBER = 10;
  var DEBOUNCE_TIME = 500;

  var debounce = function (f) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        f.apply(null, parameters);
      }, DEBOUNCE_TIME);
    };
  };

  var deletePictures = function () {
    [].forEach.call(window.picturesList.querySelectorAll('.picture'), function (picture) {
      picture.parentNode.removeChild(picture);
    });
  };

  var filterPopular = function (arr) {
    debounce(window.renderPicture(arr));
  };

  var filterRandom = function (arr) {
    deletePictures();
    debounce(window.renderPicture(getRandomPictures(arr)));
  };

  var filterDiscussed = function (arr) {
    deletePictures();
    debounce(window.renderPicture(getDiscussedPictures(arr)));
  };

  var getRandomPictures = function (a) {
    var aCopy = a.slice();
    for (var i = aCopy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var x = aCopy[i];
      aCopy[i] = aCopy[j];
      aCopy[j] = x;
    }
    var RandomPictures = aCopy.slice(0, RANDOM_PHOTO_NUMBER);

    return RandomPictures;
  };

  var getDiscussedPictures = function (arr) {
    var copyPicturesList = arr.slice();
    var sortedDiscussedPictures = copyPicturesList.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    return sortedDiscussedPictures;
  };

  var filter = {
    'filter-popular': filterPopular,
    'filter-random': filterRandom,
    'filter-discussed': filterDiscussed
  };

  var getFilter = function (key, arr) {
    filter[key](arr);
  };

  window.filteredPictures = {
    set: getFilter
  };
})();
