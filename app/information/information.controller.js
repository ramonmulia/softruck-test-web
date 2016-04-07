(function() {
  "use strict";

  angular.module('softruck-test').controller('InformationController', informationController);

  informationController.$inject = ['$http', '$timeout', '$mdDialog', 'informationService'];

  function informationController($http, $timeout, $mdDialog, informationService) {
    var vm = this;
    vm.data = [];
    vm.getInformation = getInformation;
    vm.showDetail = showDetail;
    vm.getAllData = getAllData;

    loadStates();

    function getAllData() {
      informationService.getAllData()
        .then(function(data) {
          vm.jsonData = data;
        })
        .catch(function(err) {
          informationService.showAlert('Error at getting information, please try again later. ' + err.data);
        });
    }

    function loadStates() {
      informationService.getStates()
        .then(function(data) {
          vm.states = data;
        })
        .catch(function(err) {
          informationService.showAlert('Error at getting information, please try again later. ' + err.data);
        });
    }

    function getInformation(state) {

      if (state) {
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
          .catch(function(err) {
            informationService.showAlert('Error at getting information, please try again later.');
          })
          .finally(function() {
            vm.loadingData = false;
          });
      }
    }

    function showDetail(state, city) {
      informationService.getCityDetails(city)
        .then(function(data) {
          console.log(data);
          informationService.showInformationDetail(state, data);
        });

    }
  }
})();
