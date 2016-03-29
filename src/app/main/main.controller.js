(function() {
  'use strict';

  angular
    .module('qrlite')
    .controller('MainController', ['$scope', '$mdDialog','$mdToast','sharingProvider', MainController]);

  /** @ngInject */
  function MainController( $scope, $mdDialog, $mdToast, sharingProvider ) {
    var vm = this;

    $scope.$on('scannerSuccess', scannerSuccess);

    function scannerSuccess(event, data){
      $mdDialog.show({
        bindToController: true,
        controller: QrResultDialogController,
        controllerAs: 'vm',
        templateUrl: 'app/components/qrShowPanel/qrShowPanel.html',
        parent: angular.element(document.body),
        locals : {
          scannerResult : data,
          sharingProvider: sharingProvider
        }
      }).finally(function() {
          alert = undefined;
      });
    }
  }

  function QrResultDialogController($scope, $mdDialog, scannerResult, sharingProvider){
    var vm = this;

    vm.scannerResult = scannerResult;
    vm.scannerResultModalClose = scannerResultModalClose;
    vm.openShareMenu = openShareMenu;

    vm.providers = sharingProvider.getProviders();

    function scannerResultModalClose(){
      $mdDialog.hide();
    }

    function openShareMenu($mdOpenMenu, $event){
      $mdOpenMenu($event);
    }
  }
})();
