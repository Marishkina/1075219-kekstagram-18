'use strict';

(function () {

  var URL = 'https://js.dump.academy/kekstagram/data';
  window.pictureItems = [];

  var load = function () {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      console.log(xhr.response);
      if (xhr.status === 200) {
        window.pictureItems = xhr.response;
        window.renderPicture(window.pictureItems);
      } else {
        window.renderErrorMessage();
      }
    });

    xhr.addEventListener('timeout', function () {
      window.renderErrorMessage();
    });

    xhr.timeout = 10000;

    xhr.open('GET', URL);
    xhr.send();
  };

  try {
    load();
  } catch (err) {
    window.renderErrorMessage();
  }
})();
