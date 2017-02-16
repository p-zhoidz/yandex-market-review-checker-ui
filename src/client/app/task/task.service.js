/**
 * Created by pzhoidz on 22.1.17.
 */
(function () {
  'use strict';

  angular
    .module('app.task')
    .factory('taskService', TaskService);


  TaskService.$inject = ['logger', '$http', '$q', 'config'];
  /* @ngInject */
  function TaskService(logger, $http, $q, config) {
    var apiUrl = config.apiUrl;
    return {
      getTaskEntries: getTaskEntries,
      getTask: getTask,
      createTaskEntry: createTaskEntry,
      updateTaskEntry: updateTaskEntry
    };


    function getTaskEntries(taskId) {
      var url = apiUrl + "/tasks/" + taskId +"/entries";
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

    function getTask(taskId) {
      var url = apiUrl + "/tasks/" + taskId;

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
      var url = apiUrl + "/task-entries";
      var deferred = $q.defer();

      $http.post(url, taskEntry).then(
        function (response) {
          deferred.resolve(response);
        }).catch(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function updateTaskEntry(taskEntry) {
      var url = apiUrl + "/task-entries/" + taskEntry.id;
      var deferred = $q.defer();

      $http.put(url, taskEntry).then(
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
