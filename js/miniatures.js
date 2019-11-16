'use strict';

(function () {

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  // вставка данных в миниатюру
  var generatePictureElement = function (itemsListPhoto) {

    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').id = 'templateImgId' + itemsListPhoto.id;
    pictureElement.querySelector('.picture__img').src = itemsListPhoto.url;
    pictureElement.querySelector('.picture__likes').textContent = itemsListPhoto.likes;
    pictureElement.querySelector('.picture__comments').textContent = String(itemsListPhoto.comments.length);

    return pictureElement;
  };

  // отрисовка миниатюры
  window.miniatures = {

    render: function (generateListItems) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < generateListItems.length; i++) {
        fragment.appendChild(generatePictureElement(generateListItems[i]));
      }
      window.utils.picturesList.appendChild(fragment);
    }
  };
})();
