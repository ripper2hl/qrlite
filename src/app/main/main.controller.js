(function() {
  'use strict';

  angular
    .module('qrlite')
    .controller('MainController', ['$scope', '$mdDialog','$mdToast',
    'ngAudio', 'sharingProvider','qrService', MainController]);

  /** @ngInject */
  function MainController( $scope, $mdDialog, $mdToast, ngAudio, sharingProvider, qrService) {
    var vm = this;

    vm.sound = ngAudio.load('assets/webcodecamjs/audio/beep.mp3');

    $scope.$on('scannerSuccess', scannerSuccess);

    function scannerSuccess(event, data){
      //workaround https://github.com/angular/material/issues/5071
      if(angular.element(document).find('md-dialog').length === 0) {
        qrService.getQr().pause();
        vm.sound.play();
        $mdDialog.show({
          bindToController: true,
          controller: QrResultDialogController,
          controllerAs: 'vm',
          templateUrl: 'app/components/qrShowPanel/qrShowPanel.html',
          parent: angular.element(document.body),
          locals : {
            scannerResult : data,
            sharingProvider: sharingProvider,
            qrService : qrService
          }
        }).finally(function() {
            alert = undefined;
        });
      }
    }
  }

  function QrResultDialogController($scope, $mdDialog, scannerResult,
    sharingProvider, qrService){
    var vm = this;
    vm.scannerResult = scannerResult;
    vm.scannerResultModalClose = scannerResultModalClose;
    vm.openShareMenu = openShareMenu;
    vm.isUrl = validUrl(scannerResult.code);

    vm.providers = sharingProvider.getProviders();

    function scannerResultModalClose(){
      $mdDialog.hide();
      qrService.getQr().play();
    }

    function openShareMenu($mdOpenMenu, $event){
      $mdOpenMenu($event);
    }

    function validUrl(value){
      var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      var regex = new RegExp(expression);
      if(value.match(regex)){
        return true;
      }else{
        return false;
      }
    }
  }
})();
