(function() {
  'use strict';

  angular
    .module('app.task')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'task',
        config: {
          url: '/task/{taskId}',
          templateUrl: 'app/task/task.html',
          controller: 'TaskController',
          controllerAs: '$ctrl',
          title: 'Таска'
        }
      }
    ];
  }
})();
