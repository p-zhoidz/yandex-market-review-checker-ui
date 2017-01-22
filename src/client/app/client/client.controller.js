(function () {
  'use strict';

  angular
    .module('app.client')
    .controller('ClientController', ClientController);


  ClientController.$inject = ['logger', 'clientService', '$stateParams'];
  /* @ngInject */
  function ClientController(logger, clientService, $stateParams) {

    var vm = this;
    vm.title = 'Клиент';

    vm.currentPage = 1;
    vm.maxSize = 2;
    vm.edit = false;


    activate();

    function activate() {
      if ($stateParams.client) {
        var selected = $stateParams.client;
        vm.clientUrl = selected._links.self;
        vm.storeUrl = selected._links.stores;
        logger.info(vm.clientUrl);
        vm.copy = angular.copy(selected);
        getStores(0);
        getClient();
      }

    }

    vm.newStore = function addNewStore() {
      vm.edit = true;
    };

    vm.updateClient = function updateClient() {
      logger.info("UPDATING!!!!");
      var res = clientService.updateClient(vm.clientUrl, vm.copy);
      res.then(function (response) {
        vm.client = response.data
      }, function (error) {
        logger.error(error);
      });
      vm.client = vm.copy;
      vm.edit = false;
    };

    vm.cancelEditing = function cancelEditing() {
      logger.info("CANCELED!!!!");
      vm.copy = vm.client;
      vm.edit = false;
    };

    function getStores(page) {
      var res = clientService.getStores(page, vm.storeUrl);
      res.then(function (response) {
        vm.stores = response.data.content;
        vm.totalItems = response.data.totalElements;
      }, function (error) {
        logger.error(error);
      })
    }

    function getClient() {
      var res = clientService.getClient(vm.clientUrl);
      res.then(function (response) {
        vm.client = response.data;
      }, function (error) {
        logger.error(error);
      })
    }

    vm.addStore = function addStore() {
      logger.info("Adding new STORE");
      logger.info(new Date());
      vm.inserted = {
        id: null,
        url: '',
        active: true,
        created: new Date(),
        desiredReviewsNumber: 0
      };
      vm.stores.push(vm.inserted);
    };


    vm.saveStore = function (store) {
      vm.selected = store;
      if (store.number) {
        updateStore(store);
      } else {
        createStore(store);
      }
    };


    var createStore = function (store) {
      var res = clientService.createStore(store, vm.storeUrl);
      res.then(function (response) {
        angular.extend(vm.selected, response.data);
      }, function (error) {
        logger.error(error);
      });
    };

    var updateStore = function (store) {
      var res = clientService.updateStore(store);
      res.then(function (response) {
        logger.info("Updated");
        angular.extend(vm.selected, response.data);
      }, function (error) {
        logger.error(error);
      });
    };
  }
})();
