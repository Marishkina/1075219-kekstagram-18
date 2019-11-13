'use strict';

(function () {

  var PHOTO_ITEMS_COUNT = 25;

  window.picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  // вставка данных маленькой картинки
  var generatePictureElement = function (itemsListPhoto, i) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').id = 'templateImgId' + i;
    pictureElement.querySelector('.picture__img').src = itemsListPhoto.url;
    pictureElement.querySelector('.picture__likes').textContent = itemsListPhoto.likes;
    pictureElement.querySelector('.picture__comments').textContent = String(itemsListPhoto.comments.length);

    return pictureElement;
  };

  // отрисовка миниатюры
  var renderPicture = function (generateListItems) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < PHOTO_ITEMS_COUNT; i++) {
      fragment.appendChild(generatePictureElement(generateListItems[i], i));
    }
    window.picturesList.appendChild(fragment);
  };

  window.picture = window.generateData(PHOTO_ITEMS_COUNT);
  renderPicture(window.picture);
})();
