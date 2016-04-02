(function() {
  "use strict";

  angular.module('softruck-test').controller('InformationController', informationController);

  informationController.$index = ['$http', '$timeout', '$mdDialog', 'informationService'];

  function informationController($http, $timeout, $mdDialog, informationService) {
    var vm = this;
    vm.data = [];
    vm.getFuelTypeName = getFuelTypeName;
    vm.getInformation = getInformation;
    vm.showDetail = showDetail;

    function getFuelTypeName(statics) {
      console.log(statics);
      var fuelTypes = statics.reduce(function(prev, current) {
        return (prev === '' ? '' : prev + ', ') + current.type;
      }, '');

      return fuelTypes;
    }

    function getInformation() {

      vm.data = [];
      vm.loadingData = true;

      informationService.getInformation()
        .then(function(data) {
          vm.data = data;
        })
        .catch(function() {

        })
        .finally(function() {
          vm.loadingData = false;
        });
    }

    function showDetail(item) {
      informationService.showInformationDetail(item);
    }
  }
})();
