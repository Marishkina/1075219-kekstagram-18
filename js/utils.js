'use strict';

(function () {

  var DEBOUNCE_TIME = 500;

  window.utils = {

    keyCode: {
      ESC_CODE: 'Escape',
      ENTER_CODE: 'Enter'
    },

    preview: document.querySelector('.big-picture'),
    picturesList: document.querySelector('.pictures'),

    isEscEvent: function (evt, action) {
      if (evt.code === window.utils.keyCode.ESC_CODE) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.code === window.utils.keyCode.ENTER_CODE) {
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
