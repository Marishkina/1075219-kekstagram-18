'use strict';

(function () {

  var RANDOM_PHOTO_NUMBER = 10;

  var filters = document.querySelector('.img-filters');
  var filterButtons = filters.querySelectorAll('.img-filters__button');

  filters.classList.remove('img-filters--inactive');

  var deletePictures = function () {
    [].forEach.call(window.utils.picturesList.querySelectorAll('.picture'), function (picture) {
      picture.parentNode.removeChild(picture);
    });
  };

  var getRandomPictures = function (arr) {
    var arrCopy = arr.slice();
    window.utils.shuffleList(arrCopy);
    var RandomPictures = arrCopy.slice(0, RANDOM_PHOTO_NUMBER);

    return RandomPictures;
  };

  var getDiscussedPictures = function (arr) {
    var copyPicturesList = arr.slice();
    var sortedDiscussedPictures = copyPicturesList.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    return sortedDiscussedPictures;
  };

  var filterPopular = function (arr) {
    window.miniatures.render(arr);
  };

  var filterRandom = function (arr) {
    deletePictures();
    window.miniatures.render(getRandomPictures(arr));
  };

  var filterDiscussed = function (arr) {
    deletePictures();
    window.miniatures.render(getDiscussedPictures(arr));
  };

  var Filter = {
    'filter-popular': filterPopular,
    'filter-random': filterRandom,
    'filter-discussed': filterDiscussed
  };

  var getFilter = function (key, arr) {
    window.utils.debounce(Filter[key](arr));
  };

  filters.addEventListener('click', function (evt) {

    filterButtons.forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });

    evt.target.classList.toggle('img-filters__button--active');
    getFilter(evt.target.id, window.pictures);
  });
})();
