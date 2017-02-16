/**
 * Created by pzhoidz on 22.1.17.
 */
(function () {
  'use strict';

  angular
    .module('app.posters')
    .factory('postersService', PostersService);


  PostersService.$inject = ['logger', '$http', '$q', 'config'];
  /* @ngInject */
  function PostersService(logger, $http, $q, config) {
    var apiUrl = config.apiUrl;
    return {
      getPosters: getPosters,
      createPoster: createPoster,
      updatePoster: updatePoster
    };


    function getPosters(page) {
      var url = apiUrl  + "/posters";
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

    function createPoster(poster) {
      var url = apiUrl + "/posters";
      var deferred = $q.defer();

      $http.post(url, poster)
        .then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function updatePoster(poster) {
      var url = apiUrl + "/posters/" + poster.id;
      var deferred = $q.defer();

      $http.put(url, poster)
        .then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

  }
})
();
