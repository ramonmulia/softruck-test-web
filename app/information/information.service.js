(function() {
  "use strict";

  angular.module('softruck-test')
    .factory('informationService', informationService);

  informationService.$inject = ['gatewayService', '$mdDialog'];

  function informationService(gatewayService, $mdDialog) {
    var url = "http://localhost:8008/api/v1/informations/";
    return {
      getInformation: getInformation,
      getStates: getStates,
      showInformationDetail: showInformationDetail,
      showAlert: showAlert,
      getCityDetails: getCityDetails,
      getAllData: getAllData
    };

    function getAllData(){
        return gatewayService.get(url);
    }

    function getCityDetails(city) {
      return gatewayService.get(url + 'city/' + city);
    }

    function getInformation(state) {
      return gatewayService.get(url + 'state/' + state);
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
