(function() {
  "use strict";

  angular.module("softruck-test").component("contentWrapper", {
    template: "<ng-transclude></ng-transclude>",
    transclude: true
  });

  angular.module('softruck-test').controller('InformationController', informationController);

  informationController.$inject = ['$http', '$timeout', '$mdDialog', 'informationService'];

  function informationController($http, $timeout, $mdDialog, informationService) {
    var vm = this;
    vm.data = [];
    vm.jsonData = [];
    vm.getInformation = getInformation;
    vm.showDetail = showDetail;
    vm.getAllData = getAllData;
    vm.unselectTabJson = unselectTabJson;

    loadStates();

    function unselectTabJson() {
      vm.jsonData = [];
    }

    function getAllData() {
      vm.loadingJson = true;
      informationService.getAllData()
        .then(function(data) {
          vm.jsonData = data;
        })
        .catch(function(err) {
          informationService.showAlert('Error at getting information, please try again later. ' + err.data);
        })
        .finally(function() {
          vm.loadingJson = false;
        });
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
      if (state) {
        vm.jsonData = [];
        vm.loadingData = true;
        informationService.getInformation(state)
          .then(function(data) {
            var citiesMapped = data.cities.map(function(item) {
              return {
                name: item.name,
                stations: item.stations.length
              };
            });
            vm.data = [{
              name: data.name,
              cities: citiesMapped
            }];
          })
          .catch(function() {
            informationService.showAlert('Error at getting information, please try again later.');
          })
          .finally(function() {
            vm.loadingData = false;
          });
      }
    }

    function showDetail(state, city) {
      informationService.getCityDetails(state, city)
        .then(function(data) {
          informationService.showInformationDetail(state, data);
        });
    }
  }
})();
