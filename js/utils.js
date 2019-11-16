'use strict';

(function () {
  var ESC_CODE = 'Escape';
  var ENTER_CODE = 'Enter';

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

    shuffleList: function (a) {
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    }
  };
})();
