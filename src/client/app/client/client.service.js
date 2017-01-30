(function () {
  'use strict';

  angular
    .module('app.client')
    .factory('clientService', ClientService);


  ClientService.$inject = ['logger', '$http', '$q'];
  /* @ngInject */
  function ClientService(logger, $http, $q) {
    return {
      getClient: getClient,
      getStores: getStores,
      updateClient: updateClient,
      createStore: createStore,
      updateStore: updateStore
    };

    function getStores(page, url) {
      var deferred = $q.defer();
      var params = {
        page: page,
        size: 20
      };

      $http.get(url, {params: params}).then(
        function (response) {
          deferred.resolve(response);
          //  return response.data;
        }).catch(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function getClient(url) {
      var deferred = $q.defer();

      $http.get(url).then(
        function (response) {
          deferred.resolve(response);
          //  return response.data;
        }).catch(function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }

    function updateClient(url, client) {
      var deferred = $q.defer();

      $http.put(url, client).then(
        function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function createStore(store, url) {
      var deferred = $q.defer();

      $http.post(url, store).then(
        function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function updateStore(store) {
      var deferred = $q.defer();

      var url = store._links.self;
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
