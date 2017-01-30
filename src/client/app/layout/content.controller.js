(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('ContentController', ContentController);

  ContentController.$inject = ['$rootScope', '$timeout', 'config', 'logger'];
  /* @ngInject */
  function ContentController($rootScope, $timeout, config, logger) {
    var vm = this;
    vm.busyMessage = 'Please wait ...';
    vm.isBusy = true;
    $rootScope.showSplash = true;

    activate();

    function activate() {
      logger.success(config.appTitle + ' loaded!', null);
      hideSplash();
    }

    function hideSplash() {
      //Force a 1 second delay so we can see the splash.
      $timeout(function() {
        $rootScope.showSplash = false;
      }, 1000);
    }
  }
})();
