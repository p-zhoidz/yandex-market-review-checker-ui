(function () {
  'use strict';

  angular
    .module('app.tasks')
    .controller('TasksController', TasksController);


  TasksController.$inject = ['logger', 'tasksService', '$state'];
  /* @ngInject */
  function TasksController(logger, tasksService, $state) {
    var $ctrl = this;
    $ctrl.title = 'Таски';
    $ctrl.startDateOpened = false;
    $ctrl.endDateOpened = false;

    activate();

    function activate() {
      getTasks(0);
    }


    function getTasks(page) {
      var res = tasksService.getTasks(page);
      res.then(function (response) {
        logger.info("Got Tasks");
        $ctrl.tasks = response.data.content ? response.data.content : [];
      }, function (error) {
        logger.error(error);
      })
    }

    $ctrl.generate = function generate() {
      logger.info("Generating tasks");
      var res = tasksService.generate();
      res.then(function (response) {
        logger.info("Generated tasks");
        activate();
      }, function (error) {
        logger.error(error);
      });
    };

    $ctrl.download = function download(id) {
      logger.info("Download task");
      var res = tasksService.download(id);
      res.then(function (response) {
        logger.info("Downloading tasks");
        if (response.data != null && navigator.msSaveBlob)
          return navigator.msSaveBlob(new Blob([response.data], {type: "data:attachment/text"}), 'myFile.csv');
        var a = $("<a style='display: none;'/>");
        var url = window.URL.createObjectURL(new Blob([response.data], {type: "data:attachment/text"}));
        a.attr("href", url);
        a.attr("download", 'myFile.csv');
        $("body").append(a);
        a[0].click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }, function (error) {
        logger.error(error);
      });
    };

    $ctrl.addTask = function addTask() {
      logger.info("Adding new task");
      $ctrl.newTask = {};
    };



    $ctrl.cancelAddTask = function cancelAddTask() {
      logger.info("Adding new task");
      $ctrl.newTask = null;
    };

    $ctrl.saveTask = function saveTask() {
      logger.info("Saving task");
      var res = tasksService.createTask($ctrl.newTask);
      res.then(function (response) {
        logger.info("Created Task");
        $ctrl.newTask = null;
        activate();
      }, function (error) {
        logger.error(error);
      });
    };

    $ctrl.showTask = function showTask(task) {
      $state.go("task", {task: task});
    };

    $ctrl.getPosters = function getPosters() {
      var res = tasksService.getPosters();
      res.then(function (response) {
        logger.info("Got Posters");
        $ctrl.posters = response.data.content ? response.data.content : [];
      }, function (error) {
        logger.error(error);
      });

      // $state.go("task", {task: task});
    };

    $ctrl.runValidation = function runValidation() {
      logger.info("Running validation");
      tasksService.runValidation();
    };

    $ctrl.toggleEndDate = function toggleEndDate() {
      $ctrl.endDateOpened = !$ctrl.endDateOpened;
    };

    $ctrl.toggleStartDate = function toggleStartDate() {
      $ctrl.startDateOpened = !$ctrl.startDateOpened;
    };


  }
})();
