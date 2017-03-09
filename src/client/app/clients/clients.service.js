(function () {
  'use strict';

  angular
    .module('app.clients')
    .factory('clientsService', ClientsService);


  ClientsService.$inject = ['logger', '$http', '$q', 'config'];
  /* @ngInject */
  function ClientsService(logger, $http, $q, config) {
    var apiUrl = config.apiUrl;
    return {
      getClients: getClients,
      updateClient: updateClient,
      getClient: getClient,
      saveClient: saveClient,
      generateReport: generateReport
    };

    function getClient(clientId) {
      var url = apiUrl + "/clients/" + clientId;
      var deferred = $q.defer();

      $http.get(url).then(
        function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
          deferred.reject(error);
        }
      );
      return deferred.promise;
    }

    function saveClient(client) {
      var url = apiUrl + "/clients";
      var deferred = $q.defer();

      $http.post(url, client).then(
        function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function getClients(page) {
      var url = apiUrl + "/clients";
      var deferred = $q.defer();
      var params = {
        page: page,
        size: 20
      };

      $http.get(url, {params: params}).then(
        function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
          deferred.reject(error);
        }
      );

      return deferred.promise;
    }

    function generateReport(clientId) {
      var url = apiUrl + "/tasks/" + clientId + "/report";
      var deferred = $q.defer();

      $http.get(url, {responseType: "arraybuffer"}).then(
        function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
          deferred.reject(error);
        }
      );

      return deferred.promise;

    }

    function updateClient() {

    }
  }
})
();
