'use strict';

(function () {

  window.picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  // вставка данных в миниатюру
  var generatePictureElement = function (itemsListPhoto, i) {
    var pictureElement = pictureTemplate.cloneNode(true);

    // pictureElement.href = itemsListPhoto.url;
    pictureElement.querySelector('.picture__img').id = 'templateImgId' + i;
    pictureElement.querySelector('.picture__img').src = itemsListPhoto.url;
    pictureElement.querySelector('.picture__likes').textContent = itemsListPhoto.likes;
    pictureElement.querySelector('.picture__comments').textContent = String(itemsListPhoto.comments.length);

    return pictureElement;
  };

  // отрисовка миниатюры
  window.renderPicture = function (generateListItems) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < generateListItems.length; i++) {
      fragment.appendChild(generatePictureElement(generateListItems[i], i));
    }
    window.picturesList.appendChild(fragment);
  };
})();
