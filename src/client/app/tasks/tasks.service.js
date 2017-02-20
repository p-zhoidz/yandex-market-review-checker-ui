/**
 * Created by pzhoidz on 22.1.17.
 */
(function () {
  'use strict';

  angular
    .module('app.tasks')
    .factory('tasksService', TasksService);


  TasksService.$inject = ['logger', '$http', '$q', 'config'];
  /* @ngInject */
  function TasksService(logger, $http, $q, config) {
    var apiUrl = config.apiUrl;
    return {
      getTasks: getTasks,
      getPosters: getPosters,
      createTask: createTask,
      generate: generate
    };

    function getTasks(page) {
      var url = apiUrl + "/tasks";
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

    function getPosters() {
      var deferred = $q.defer();
      var url = apiUrl + "/posters";

      var params = {
        page: 0,
        size: 10000
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

    function createTask(task) {
      var deferred = $q.defer();
      var url = apiUrl + "/tasks";

      $http.post(url, task).then(
        function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
          deferred.reject(error);
        }
      );

      return deferred.promise;

    }

    function generate() {
      var deferred = $q.defer();
      var url = apiUrl + "/tasks/distribute";

      $http.post(url).then(
        function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
          deferred.reject(error);
        }
      );

      return deferred.promise;
    }


    /*    function getPosters(url, page) {
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
     }*/

    /*    function createPoster(url, poster) {
     var deferred = $q.defer();

     $http.post(url, poster)
     .then(function (response) {
     deferred.resolve(response);
     }, function (error) {
     deferred.reject(error);
     });
     return deferred.promise;
     }*/

    /*    function updatePoster(poster) {
     var deferred = $q.defer();
     var url = poster._links.self;

     $http.put(url, poster)
     .then(function (response) {
     deferred.resolve(response);
     }, function (error) {
     deferred.reject(error);
     });
     return deferred.promise;
     }*/

  }
})
();
