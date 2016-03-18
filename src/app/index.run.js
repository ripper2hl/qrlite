(function() {
  'use strict';

  angular
    .module('qrlite')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
