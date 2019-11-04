'use strict';

(function () {
  var ESC_CODE = 'Escape';

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.code === ESC_CODE) {
        action();
      }
    }
  };
})();
