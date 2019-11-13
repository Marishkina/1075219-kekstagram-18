'use strict';

(function () {
  var ESC_CODE = 'Escape';
  var ENTER_CODE = 'Enter';
  window.SUCCESS_CODE = 200;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.code === ESC_CODE) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.code === ENTER_CODE) {
        action();
      }
    }
  };
})();
