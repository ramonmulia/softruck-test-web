(function() {
  "use strict";

  angular.module('softruck-test')
    .factory('informationService', informationService);

  informationService.$inject = ['gatewayService', '$timeout', '$mdDialog'];

  function informationService(gatewayService, $timeout, $mdDialog) {
    return {
      getInformation: getInformation,
      showInformationDetail: showInformationDetail
    };

    function getInformation() {
      var url = 'https://bitbucket.org/softruck/node-test/raw/91c2d054c5682887cd1c446ebad9fbc89468fe5a/output.json';
      return gatewayService.get(url);
    }

    function showInformationDetail(item) {
      $mdDialog.show({
        parent: angular.element(document.body),
        escapeToClose: true,
        template: '<pre>' + JSON.stringify(item, null, 4) + '</pre>'
      });
    }
  }
})();
