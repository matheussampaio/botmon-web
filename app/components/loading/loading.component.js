(function () {

  class LoadingController {
    /* @ngInject */
    constructor(LoadingService) {
      this.LoadingService = LoadingService;
    }
  }

  angular
    .module('botmon')
    .component('loading', {
      controller: LoadingController,
      templateUrl: 'loading/loading.html'
    });

})();
