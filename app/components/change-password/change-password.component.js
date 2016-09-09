(function () {

  class ChangePasswordController {
    /* @ngInject */
    constructor(_, UtilsService, LoadingService, AuthService) {
      this._ = _;

      this.AuthService = AuthService;
      this.UtilsService = UtilsService;
      this.LoadingService = LoadingService;

      this.data = null;
      this.error = false;
      this.success = false;
      this.userLoaded = false;
      this.passwordMatch = false;
    }

    $onInit() {
      this.LoadingService.start();
      this.AuthService.getUser().then(() => {
        this.LoadingService.stop();
        this.userLoaded = true;
      });
    }

    refresh() {
      if (this.data.newPassword === this.data.newConfirmPassword) {
        this.passwordMatch = true;
      } else {
        this.passwordMatch = false;
      }
    }

    changePassword() {
      this.LoadingService.start();

      this.AuthService.changePassword(this.data)
        .then(() => {
          this.success = true;
        })
        .catch(() => {
          this.error = true;
        })
        .then(() => {
          this.LoadingService.stop();
        });
    }
  }
  angular
    .module('botmon')
    .component('changePassword', {
      controller: ChangePasswordController,
      templateUrl: 'change-password/change-password.html',
      bindings: {
        user: '<'
      }
    });

})();
