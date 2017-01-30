(function () {
  'use strict';

  angular
    .module('app.client')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'client',
        config: {
          url: '/client',
          params: {
            client: null
          },
          templateUrl: 'app/client/client.html',
          controller: 'ClientController',
          controllerAs: '$ctrl',
          title: 'Клиент'
        }
      }
    ];
  }
})();
