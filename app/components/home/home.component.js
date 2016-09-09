(function () {

  class HomeController {
    /* @ngInject */
    constructor(LoadingService) {
      this.LoadingService = LoadingService;
    }

    $onInit() {
      this.LoadingService.stop();
    }
  }

  angular
    .module('botmon')
    .component('home', {
      controller: HomeController,
      templateUrl: 'home/home.html'
    });

})();
