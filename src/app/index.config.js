(function() {
  'use strict';

  angular
    .module('qrlite')
    .config(config);

  /** @ngInject */
  function config($logProvider, $mdIconProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    $mdIconProvider.defaultIconSet('assets/mdi.svg')    

    document.cancelFullScreen =
    document.mozCancelFullScreen || document.webkitExitFullscreen;
  }
})();
