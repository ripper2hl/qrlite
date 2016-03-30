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
      //workaround https://github.com/angular/material/issues/5071
      if(angular.element(document).find('md-dialog').length === 0) {
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
  }

  function QrResultDialogController($scope, $mdDialog, scannerResult, sharingProvider){
    var vm = this;
    vm.scannerResult = scannerResult;
    vm.scannerResultModalClose = scannerResultModalClose;
    vm.openShareMenu = openShareMenu;
    vm.isUrl = validUrl(scannerResult.code);

    vm.providers = sharingProvider.getProviders();

    function scannerResultModalClose(){
      $mdDialog.hide();
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
