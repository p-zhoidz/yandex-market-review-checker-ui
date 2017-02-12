(function () {
  'use strict';

  angular
    .module('yandexMarketReview')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider, toastrConfig) {

    // Add session token to config
    $httpProvider.defaults.withCredentials = true;

    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = true;
    toastrConfig.closeButton = true;
    toastrConfig.closeHtml = "<a class='close-button icon-close_white_24px'></a>";
    toastrConfig.positionClass = "toast-top-full-width";
  }
})();
