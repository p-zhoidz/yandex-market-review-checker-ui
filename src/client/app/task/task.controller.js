(function () {
  'use strict';

  angular
    .module('app.task')
    .controller('TaskController', TaskController);


  TaskController.$inject = ['logger', 'taskService', '$stateParams', 'FileUploader', 'config'];
  /* @ngInject */
  function TaskController(logger, taskService, $stateParams, FileUploader, config) {
    var $ctrl = this;
    $ctrl.title = 'Таск';
    var apiUrl = config.apiUrl;

    activate();

    $ctrl.uploader = new FileUploader({
      url: apiUrl + "/tasks/" + $ctrl.taskId + "/upload_report"
    });

    function activate() {

      if ($stateParams.task) {
        var selected = $stateParams.task;
        $ctrl.taskId = selected.id;
        $ctrl.copy = angular.copy(selected);
        loadTask();
      }
    }

    function loadTask() {
      var res = taskService.getTask($ctrl.taskId);

      res.then(function (response) {
        logger.info("Got Task");
        $ctrl.task = response.data;
      }, function (error) {
        logger.error(error);
      })
    }

    $ctrl.loadTaskEntries = function () {
      var res = taskService.getTaskEntries($ctrl.taskId);
      res.then(function (response) {
        logger.info("Got Task");
        $ctrl.taskEntries = response.data;
      }, function (error) {
        logger.error(error);
      })
    };

    $ctrl.loadStores = function () {
      $ctrl.stores = [{
        url: "sqmpl1"
      }, {
        url: "sqmpl2"
      }];
    };


    ///////////////////////

    $ctrl.addTaskEntry = function addTaskEntry() {
      logger.info("Adding new task entry");
      $ctrl.inserted = {
        number: null,
        store: null,
        status: null
      };
      $ctrl.taskEntries.push($ctrl.inserted);
    };


    $ctrl.saveTaskEntry = function (taskEntry) {
      $ctrl.selected = taskEntry;
      if (taskEntry.number) {
        updateTaskEntry(taskEntry);
      } else {
        createTaskEntry(taskEntry);
      }
    };

    $ctrl.validateNotEmpty = function (data) {
      if (!data) {
        return "Поле обязательно для заполнения";
      }
    };

    $ctrl.uploadReport = function () {

    };


    var createTaskEntry = function (taskEntry) {
      var res = taskService.createTaskEntry(taskEntry);
      res.then(function (response) {
        angular.extend($ctrl.selected, response.data);
      }, function (error) {
        logger.error(error);
      });
    };

    var updateTaskEntry = function (taskEntry) {
      var res = taskService.updateTaskEntry(taskEntry);
      res.then(function (response) {
        logger.info("Updated");
        angular.extend($ctrl.selected, response.data);
      }, function (error) {
        logger.error(error);
      });
    };


  }
})();
