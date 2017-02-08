/**
 * Created by pzhoidz on 22.1.17.
 */
(function () {
  'use strict';

  angular
    .module('app.task')
    .factory('taskService', TaskService);


  TaskService.$inject = ['logger', '$http', '$q'];
  /* @ngInject */
  function TaskService(logger, $http, $q) {
    return {
      getTaskEntries: getTaskEntries,
      getTask: getTask,
      createTaskEntry: createTaskEntry,
      updateTaskEntry: updateTaskEntry
    };


    function getTaskEntries(url) {
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

    function getTask(url) {
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


    function createTaskEntry(taskEntry) {
      var deferred = $q.defer();

      $http.post("http://127.0.1.1:8080/api/task-entries", taskEntry).then(
        function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function updateTaskEntry(taskEntry) {
      var deferred = $q.defer();

      $http.put("http://127.0.1.1:8080/api/task-entries", taskEntry).then(
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
