(function() {
  'use strict';

  angular
    .module('app.clients')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'clients',
        config: {
          url: '/',
          templateUrl: 'app/clients/clients.html',
          controller: 'ClientsController',
          controllerAs: '$ctrl',
          title: 'Клиенты',
          settings: {
            nav: 1,
            content: '<i class="fa fa-lock"></i> Клиенты'
          }
        }
      }
    ];
  }
})();
