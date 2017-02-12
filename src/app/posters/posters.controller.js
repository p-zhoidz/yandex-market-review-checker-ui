(function () {
  'use strict';

  angular
    .module('app.posters')
    .controller('PostersController', PostersController);


  PostersController.$inject = ['logger', 'postersService', '$scope', '$uibModal', '$location', '$state'];
  /* @ngInject */
  function PostersController(logger, postersService) {
    var $ctrl = this;
    $ctrl.title = 'Постеры';

    activate();

    function activate() {
      getPosters(0);
    }

    function getPosters(page) {
      var url = "http://127.0.1.1:8080/api/posters";
      var res = postersService.getPosters(url, page);
      res.then(function (response) {
        logger.info("Got Posters");
        $ctrl.posters = response.data._embedded ? response.data._embedded.posterResourceList : [];
      }, function (error) {
        logger.error(error);
      })
    }

    $ctrl.addPoster = function addPoster() {
      logger.info("Adding new poster");
      $ctrl.inserted = {
        number: null,
        email: null,
        name: null,
        velocity: 0,
        active: true,
        created: new Date
      };

      $ctrl.posters.push($ctrl.inserted);
    };

    $ctrl.savePoster = function savePoster(poster) {
      $ctrl.selected = poster;
      if (poster.number) {
        updatePoster(poster);
      } else {
        createPoster(poster);
      }
    };

    $ctrl.validateNotEmpty = function (data) {
      if (!data) {
        return "Поле обязательно для заполнения";
      }
    };

    function updatePoster(poster) {
      var res = postersService.updatePoster(poster);
      res.then(function (response) {
        angular.extend($ctrl.selected, response.data);
      }, function (error) {
        logger.error(error);
      })
    }

    function createPoster(poster) {
      var url = "http://127.0.1.1:8080/api/posters";

      var res = postersService.createPoster(url, poster);
      res.then(function (response) {
        angular.extend($ctrl.selected, response.data);
      }, function (error) {
        logger.error(error);
      })
    }
  }
})();
