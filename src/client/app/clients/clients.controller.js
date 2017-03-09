(function () {
  'use strict';

  angular
    .module('app.clients')
    .controller('ClientsController', ClientsController)
    .controller('modalInstanceController', modalInstanceController);


  ClientsController.$inject = ['logger','$uibModal', 'clientsService', '$scope', '$state'];
  /* @ngInject */
  function ClientsController(logger,$uibModal, clientsService, $scope, $state) {
    var $ctrl = this;
    $ctrl.title = 'Клиенты';

    activate();

    function activate() {
      getClients(0);
    }

    function getClients(page) {
      var res = clientsService.getClients(page);
      res.then(function (response) {
        $ctrl.clients = response.data.content ?response.data.content : [];
        $ctrl.totalItems = response.data.totalElements;
      }, function (error) {
      })
    }

    $scope.showClient = function showClient(client) {
      $state.go("client", {client: client});
    };


    $ctrl.currentPage = 1;
    $ctrl.maxSize = 2;

    $ctrl.startNewClient = function startNewClient() {
      $ctrl.newClient = {};
    };

    $ctrl.saveClient = function saveClient() {
      clientsService.saveClient($ctrl.newClient).then(function () {
        $ctrl.newClient = null;
        getClients($ctrl.currentPage-1);
        logger.info("SAVED");
      }, function (error) {
        logger.error(error)
      })

    };


    $ctrl.cancelAddNewClient = function cancelAddNewClient() {
      $ctrl.newClient = null;
    };

    $ctrl.generateReport = function generateReport(clientId) {
        var modalInstance = $uibModal.open({
          animation: $ctrl.animationsEnabled,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'chosenDates.modal.html',
          controller: 'modalInstanceController',
          controllerAs: '$ctrl',
          resolve: {
            itemId: function () {
              return clientId;
            }
          }
        });
      // clientsService.generateReport(clientId).then(function (response) {
      //   if (response.data != null && navigator.msSaveBlob)
      //     return navigator.msSaveBlob(new Blob([response.data], {type: "application/pdf"}), 'myFile.pdf');
      //   var a = $("<a style='display: none;'/>");
      //   var url = window.URL.createObjectURL(new Blob([response.data], {type: "application/pdf"}));
      //   a.attr("href", url);
      //   a.attr("download", 'myFile.pdf');
      //   $("body").append(a);
      //   a[0].click();
      //   window.URL.revokeObjectURL(url);
      //   a.remove();
      //   logger.info("GENERATED");
      // }, function (error) {
      //   logger.error(error)
      // })
    };

    $scope.setPage = function (pageNo) {
      $ctrl.currentPage = pageNo;
    };

    $scope.pageChanged = function () {
      logger.info('Page changed to: ' + $ctrl.currentPage);
      getClients($ctrl.currentPage - 1);
    };

  }

  /* @ngInject */
  function modalInstanceController($uibModalInstance, itemId){
    var $ctrl = this;

    console.log(itemId)

    $ctrl.submit = function () {
      $uibModalInstance.close($ctrl.selected.item);
    };

    $ctrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
