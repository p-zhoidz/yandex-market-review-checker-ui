(function () {
  'use strict';

  angular
    .module('app.clients')
    .controller('ClientsController', ClientsController);


  ClientsController.$inject = ['logger', 'clientsService', '$scope', '$state'];
  /* @ngInject */
  function ClientsController(logger, clientsService, $scope, $state) {
    var vm = this;
    vm.title = 'Клиенты';

    activate();

    function activate() {
      getClients(0);
    }

    function getClients(page) {
      var res = clientsService.getClients(page);
      res.then(function (response) {
        vm.clients = response.data._embedded ?response.data._embedded.clientResourceList : [];
        vm.totalItems = response.data.page.totalElements;
      }, function (error) {
      })
    }

    $scope.showClient = function showClient(client) {
      $state.go("client", {client: client});
    };


    vm.currentPage = 1;
    vm.maxSize = 2;

    vm.startNewClient = function startNewClient() {
      vm.newClient = {};
    };

    vm.saveClient = function saveClient() {
      clientsService.saveClient(vm.newClient).then(function () {
        vm.newClient = null;
        getClients(vm.currentPage-1);
        logger.info("SAVED");
      }, function (error) {
        logger.error(error)
      })

    };


    vm.cancelAddNewClient = function cancelAddNewClient() {
      vm.newClient = null;
    };

    $scope.setPage = function (pageNo) {
      vm.currentPage = pageNo;
    };

    $scope.pageChanged = function () {
      logger.info('Page changed to: ' + vm.currentPage);
      getClients(vm.currentPage - 1);
    };

  }
})();
