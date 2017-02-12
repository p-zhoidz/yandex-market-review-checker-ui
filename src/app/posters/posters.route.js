(function() {
  'use strict';

  angular
    .module('app.posters')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'posters',
        config: {
          url: '/posters',
          templateUrl: 'app/posters/posters.html',
          controller: 'PostersController',
          controllerAs: '$ctrl',
          title: 'Постеры',
          settings: {
            nav: 2,
            content: '<i class="fa fa-lock"></i> Постеры'
          }
        }
      }
    ];
  }
})();
