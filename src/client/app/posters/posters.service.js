/**
 * Created by pzhoidz on 22.1.17.
 */
(function () {
  'use strict';

  angular
    .module('app.posters')
    .factory('postersService', PostersService);


  PostersService.$inject = ['logger', '$http', '$q'];
  /* @ngInject */
  function PostersService(logger, $http, $q) {
    return {
      getPosters: getPosters,
      createPoster: createPoster,
      updatePoster: updatePoster
    };


    function getPosters(url, page) {
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

    function createPoster(url, poster) {
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
      var deferred = $q.defer();
      var url = poster._links.self;

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
