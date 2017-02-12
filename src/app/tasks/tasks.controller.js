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
      var url = "http://127.0.1.1:8080/api/tasks";


      var res = tasksService.getTasks(url, page);
      res.then(function (response) {
        logger.info("Got Tasks");
        $ctrl.tasks = response.data._embedded ? response.data._embedded.taskResourceList : [];
      }, function (error) {
        logger.error(error);
      })
    }

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
        $ctrl.posters = response.data._embedded ? response.data._embedded.posterResourceList : [];
      }, function (error) {
        logger.error(error);
      });

      // $state.go("task", {task: task});
    };

    $ctrl.toggleEndDate = function toggleEndDate() {
      $ctrl.endDateOpened = !$ctrl.endDateOpened;
    }

    $ctrl.toggleStartDate = function toggleStartDate() {
      $ctrl.startDateOpened = !$ctrl.startDateOpened;
    }


  }
})();
