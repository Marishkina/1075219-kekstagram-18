'use strict';

(function () {

  var URL = 'https://js.dump.academy/kekstagram/data';
<<<<<<< HEAD
  var SUCCESS_CODE = 200;
=======
  window.pictureItems = [];
>>>>>>> Задание 6-2: нужно подкачаться, также правит открытие картинок по ентеру

  var load = function () {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      // console.log(xhr.response);

      if (xhr.status === SUCCESS_CODE) {
        var pictureItems = xhr.response;
        window.photo = pictureItems.map(function (photo, id) {
          photo.id = id;
          return photo;
        });
        window.miniatures.renderPicture(window.photo);
      } else {
        window.errorMessage.renderErrorMessage();
      }
    });

    xhr.addEventListener('timeout', function () {
      window.errorMessage.renderErrorMessage();
    });

    xhr.timeout = 10000;

    xhr.open('GET', URL);
    xhr.send();
  };

  try {
    load();
  } catch (err) {
    window.errorMessage.renderErrorMessage();
  }
})();
