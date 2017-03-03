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
        File.save(response.data, function (content) {
          var hiddenElement = document.createElement('a');

          hiddenElement.href = 'data:attachment/csv,' + encodeURI(content);
          hiddenElement.target = '_blank';
          hiddenElement.download = 'myFile.csv';
          hiddenElement.click();
        });


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

    $ctrl.toggleEndDate = function toggleEndDate() {
      $ctrl.endDateOpened = !$ctrl.endDateOpened;
    };

    $ctrl.toggleStartDate = function toggleStartDate() {
      $ctrl.startDateOpened = !$ctrl.startDateOpened;
    };


  }
})();
