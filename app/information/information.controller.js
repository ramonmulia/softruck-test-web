(function() {
  "use strict";

  angular.module('softruck-test').controller('InformationController', informationController);

  informationController.$inject = ['$http', '$timeout', '$mdDialog', 'informationService'];

  function informationController($http, $timeout, $mdDialog, informationService) {
    var vm = this;
    vm.data = [];
    vm.state = {};
    vm.getFuelTypeName = getFuelTypeName;
    vm.getInformation = getInformation;
    vm.showDetail = showDetail;

    loadStates();

    function getFuelTypeName(statics) {
      var fuelTypes = statics.reduce(function(prev, current) {
        return (prev === '' ? '' : prev + ', ') + current.type;
      }, '');

      return fuelTypes;
    }

    function loadStates() {
      informationService.getStates()
        .then(function(data) {
          vm.states = data;
        })
        .catch(function() {
          informationService.showAlert('Error at getting information, please try again later.');
        });
    }

    function getInformation(state) {

      vm.data = [];
      vm.loadingData = true;

      informationService.getInformation(state)
        .then(function(data) {
          vm.data = data;
        })
        .catch(function() {
          informationService.showAlert('Error at getting information, please try again later.');
        })
        .finally(function() {
          vm.loadingData = false;
        });
    }

    function showDetail(state, item) {
      informationService.showInformationDetail(state, item);
    }
  }
})();
