'use strict';

(function () {
  var ENTER_CODE = 'Enter';
  var ESC_CODE = 'Escape';

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
