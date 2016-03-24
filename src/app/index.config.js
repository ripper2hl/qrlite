(function() {
  'use strict';

  angular
    .module('qrlite')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    document.cancelFullScreen =
    document.mozCancelFullScreen || document.webkitExitFullscreen;
  }
})();
