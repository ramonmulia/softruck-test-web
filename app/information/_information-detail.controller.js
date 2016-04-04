(function() {
  "use strict";

  angular.module('softruck-test').controller('InformationDetailController', informationDetailController);

  function informationDetailController($scope, state, item, $mdDialog) {
    $scope.state = state;
    $scope.data = item;

    $scope.close = close;

    function close(){
      $mdDialog.hide();
    }
  }
})();
