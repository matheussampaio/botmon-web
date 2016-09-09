(function () {

  class ToolbarController {
    /* @ngInject */
    constructor($state, $log, AuthService) {
      this.$state = $state;

      this.AuthService = AuthService;

      this.isOpen = false;
    }

    logout() {
      this.AuthService.logout();
      this.$state.go('app.home');
    }
  }
  angular
    .module('botmon')
    .component('toolbar', {
      controller: ToolbarController,
      templateUrl: 'toolbar/toolbar.html'
    });

})();
