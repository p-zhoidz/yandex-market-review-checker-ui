(function () {
  'use strict';

  angular
    .module('yandexMarketReview')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        template: 'test'
      });
    $urlRouterProvider.otherwise('/');
  }

})();
