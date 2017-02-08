(function () {
  'use strict';

  angular
    .module('app.client')
    .factory('clientService', ClientService);


  ClientService.$inject = ['logger', '$http', '$q', 'apiUrl'];
  /* @ngInject */
  function ClientService(logger, $http, $q, apiUrl) {
    return {
      getClient: getClient,
      getStores: getStores,
      updateClient: updateClient,
      createStore: createStore,
      updateStore: updateStore
    };

    function getStores(page, clientId) {
      var url = apiUrl + "/clients/" + clientId + "/stores";

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
      });

      return deferred.promise;
    }

    function getClient(clientId) {
      var url = apiUrl + "/clients/" + clientId;

      var deferred = $q.defer();

      $http.get(url).then(
        function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }

    function updateClient(client) {
      var url = apiUrl + "/clients/" + client.id;

      var deferred = $q.defer();

      $http.put(url, client).then(
        function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function createStore(store, clientId) {
      var url = apiUrl + "/clients/" + clientId + "/stores";
      var deferred = $q.defer();

      $http.post(url, store).then(
        function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function updateStore(store, clientId) {
      var deferred = $q.defer();

      var url = apiUrl + "/clients/" +clientId + "/stores/" + store.id;
      $http.put(url, store).then(
        function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }


  }
})
();
