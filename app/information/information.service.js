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
      var url = 'https://bitbucket.org/softruck/node-test/raw/91c2d054c5682887cd1c446ebad9fbc89468fe5a/output.json';
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
        .targetEvent(ev)
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
