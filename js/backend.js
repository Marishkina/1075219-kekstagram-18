'use strict';

(function () {

  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var SUCCESS_CODE = 200;

  var pictures;

  var load = function () {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      // console.log(xhr.response);

      if (xhr.status === SUCCESS_CODE) {
        var pictureItems = xhr.response;
        pictures = pictureItems.map(function (el, id) {
          el.id = id;
          // console.log(el);
          return el;
        });
        window.miniatures.render(pictures);
      } else {
        window.errorMessage.render();
      }
    });

    xhr.addEventListener('timeout', function () {
      window.errorMessage.render();
    });

    xhr.timeout = 10000;

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  try {
    load();
  } catch (err) {
    window.errorMessage.render();
  }

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess();
      } else {
        onError();
      }
    });

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  // TODO переименовали ! нужно ли экспортировать load и upload?
  window.backend = {
    picture: pictures,
    load: load,
    upload: upload
  };
})();
