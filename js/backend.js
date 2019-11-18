'use strict';

(function () {

  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var SUCCESS_CODE = 200;
  var TIMEOUT = 10000;

  var request = function (method, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);

    xhr.send(data);
  };

  var load = function (onSuccess, onError) {
    request('GET', URL_LOAD, onSuccess, onError);
  };

  var upload = function (data, onSuccess, onError) {
    request('POST', URL_UPLOAD, onSuccess, onError, data);
  };

  window.backend = {
    upload: upload,
    load: load
  };
})();
