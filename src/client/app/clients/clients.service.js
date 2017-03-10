(function () {
  'use strict';

  angular
    .module('app.clients')
    .factory('clientsService', ClientsService);


  ClientsService.$inject = ['logger', '$http', '$q', 'config', '$filter'];
  /* @ngInject */
  function ClientsService(logger, $http, $q, config, $filter) {
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

    function generateReport(clientId, startDate, endDate) {
      var startDate = $filter('date')(startDate, 'yyyy-MM-dd');
      var endDate = $filter('date')(endDate, 'yyyy-MM-dd');

      var url = apiUrl + "/tasks/" + clientId + "/report?startDate="+startDate+"&endDate="+endDate;
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
