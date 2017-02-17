(function () {
  'use strict';

  angular
    .module('app.client')
    .controller('ClientController', ClientController);


  ClientController.$inject = ['logger', 'clientService', '$stateParams'];
  /* @ngInject */
  function ClientController(logger, clientService, $stateParams) {

    var $ctrl = this;
    $ctrl.title = 'Клиент';

    $ctrl.currentPage = 1;
    $ctrl.maxSize = 2;
    $ctrl.edit = false;


    activate();

    function activate() {
      if ($stateParams.client) {
        var selected = $stateParams.client;
        $ctrl.clientId = selected.id;
        $ctrl.copy = angular.copy(selected);
        getStores(0);
        getClient();
      }

    }

    $ctrl.newStore = function addNewStore() {
      $ctrl.edit = true;
    };

    $ctrl.updateClient = function updateClient() {
      logger.info("UPDATING!!!!");
      var res = clientService.updateClient($ctrl.copy);
      res.then(function (response) {
        $ctrl.client = response.data
      }, function (error) {
        logger.error(error);
      });
      $ctrl.client = $ctrl.copy;
      $ctrl.edit = false;
    };

    $ctrl.cancelEditing = function cancelEditing() {
      logger.info("CANCELED!!!!");
      $ctrl.copy = $ctrl.client;
      $ctrl.edit = false;
    };

    function getStores(page) {
      var res = clientService.getStores(page, $ctrl.clientId);
      res.then(function (response) {
        $ctrl.stores = response.data.content;
        $ctrl.totalItems = response.data.totalElements;
      }, function (error) {
        logger.error(error);
      })
    }

    function getClient() {
      var res = clientService.getClient($ctrl.clientId);
      res.then(function (response) {
        $ctrl.client = response.data;
      }, function (error) {
        logger.error(error);
      })
    }

    $ctrl.addStore = function addStore() {
      logger.info("Adding new STORE");
      logger.info(new Date());
      $ctrl.inserted = {
        id: null,
        url: null,
        active: true,
        created: new Date(),
        desiredReviewsNumber: 0
      };
      $ctrl.stores.push($ctrl.inserted);
    };


    $ctrl.saveStore = function (store) {
      $ctrl.selected = store;
      if (store.number) {
        updateStore(store);
      } else {
        createStore(store);
      }
    };

    $ctrl.validateNotEmpty = function (data) {
      if (!data) {
        return "Поле обязательно для заполнения";
      }
    };


    var createStore = function (store) {
      var res = clientService.createStore(store, $ctrl.clientId);
      res.then(function (response) {
        angular.extend($ctrl.selected, response.data);
      }, function (error) {
        logger.error(error);
      });
    };

    var updateStore = function (store) {
      var res = clientService.updateStore(store, $ctrl.clientId);
      res.then(function (response) {
        logger.info("Updated");
        angular.extend($ctrl.selected, response.data);
      }, function (error) {
        logger.error(error);
      });
    };
  }
})();
