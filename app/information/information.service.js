(function() {
  "use strict";

  angular.module('softruck-test')
    .factory('informationService', informationService);

  informationService.$inject = ['gatewayService', '$mdDialog'];

  function informationService(gatewayService, $mdDialog) {
    return {
      getInformation: getInformation,
      getStates: getStates,
      showInformationDetail: showInformationDetail,
      showAlert: showAlert
    };

    function getInformation(state) {
      var url = 'http://localhost:8008/api/v1/information/state/'+state;
      return gatewayService.get(url);
    }

    function showAlert(message) {
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.body))
        .clickOutsideToClose(true)
        .title('Atention')
        .textContent(message)
        .ok('OK')
      );
    }

    function showInformationDetail(state, item) {

      $mdDialog.show({
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        templateUrl: 'app/information/_information-detail.view.html',
        controller: 'InformationDetailController',
        locals: {
          state: state,
          item: item
        }
      });
    }

    function getStates() {
      var url = '/assets/files/states.json';
      return gatewayService.get(url);
    }
  }
})();
