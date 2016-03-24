(function() {
  'use strict';

  angular
    .module('qrlite')
    .controller('MainController', ['$scope', '$mdDialog','$mdToast', MainController]);

  /** @ngInject */
  function MainController( $scope, $mdDialog, $mdToast ) {
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
          qrResult : data
        }
      }).finally(function() {
          alert = undefined;
      });
    }
  }

  function QrResultDialogController($scope, $mdDialog, qrResult){
    var vm = this;

    vm.qrResult = qrResult;
    vm.closeQrResult = closeQrResult;

    function closeQrResult(){
      $mdDialog.hide();
    }
  }
})();
