(function() {
  'use strict';

  angular
    .module('app.tasks')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'tasks',
        config: {
          url: '/tasks',
          templateUrl: 'app/tasks/tasks.html',
          controller: 'TasksController',
          controllerAs: '$ctrl',
          title: 'Таски',
          settings: {
            nav: 3,
            content: '<i class="fa fa-lock"></i> Таски'
          }
        }
      }
    ];
  }
})();
