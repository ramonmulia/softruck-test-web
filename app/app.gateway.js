(function() {
  "use strict";

  angular.module('softruck-test')
    .factory('gatewayService', gatewayService);

  gatewayService.$inject = ['$http', '$q'];

  function gatewayService($http, $q) {
    return {
      get: get
    };

    function get(url) {
      var deferred = $q.defer();

      $http.get(url)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response, status) {
          deferred.reject({
            data: response.data,
            statusCode: status
          });
        });

      return deferred.promise;
    }
  }
})();
