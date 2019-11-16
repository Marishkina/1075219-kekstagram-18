'use strict';

(function () {
  var ESC_CODE = 'Escape';
  var ENTER_CODE = 'Enter';
  var DEBOUNCE_TIME = 500;

  window.utils = {

    preview: document.querySelector('.big-picture'),
    picturesList: document.querySelector('.pictures'),


    isEscEvent: function (evt, action) {
      if (evt.code === ESC_CODE) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.code === ENTER_CODE) {
        action();
      }
    },

    shuffleList: function (arr) {
      for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
      }
      return arr;
    },

    debounce: function (f) {
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
    }
  };
})();
