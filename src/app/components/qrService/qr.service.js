(function() {
  'use strict';

  angular
      .module('qrlite')
      .service('qrService', qrService);

  /** @ngInject */
  function qrService() {
    var qr;

    this.setQr = setQr;
    this.getQr = getQr;

    function getQr() {
      return qr;
    }

    function setQr(QR) {
      qr = QR;
    }
  }

})();
