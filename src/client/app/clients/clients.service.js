(function () {
  'use strict';

  angular
    .module('app.clients')
    .factory('clientsService', ClientsService);


  ClientsService.$inject = ['logger', '$http', '$q'];
  /* @ngInject */
  function ClientsService(logger, $http, $q) {
    return {
      getClients: getClients,
      updateClient: updateClient,
      getClient: getClient,
      saveClient: saveClient
    };

    function getClient(url) {
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

    function saveClient(client, url) {
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
      var deferred = $q.defer();
      var params = {
        page: page,
        size: 20
      };

      $http.get("http://127.0.1.1:8080/api/clients", {params: params}).then(
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
