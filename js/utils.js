'use strict';

(function () {
  var ESC_CODE = 'Escape';

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.code === ESC_CODE) {
        action();
      }
    },

    getRandomItem: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    shuffleList: function (a) {
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    },

    preview: document.querySelector('.big-picture'),

    picturesList: document.querySelector('.pictures')
  };

})();
