(function() {
  'use strict';

  angular
    .module('qrlite')
    .config(config);

  /** @ngInject */
  function config($compileProvider, $logProvider, $mdIconProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    //Set icons
    $mdIconProvider.defaultIconSet('assets/mdi.svg')

    //sanitize href
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|data):/);

    document.cancelFullScreen =
    document.mozCancelFullScreen || document.webkitExitFullscreen;
  }
})();
