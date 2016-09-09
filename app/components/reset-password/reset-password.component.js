(function () {

  class ResetPasswordController {
    /* @ngInject */
    constructor(AuthService, LoadingService) {
      this.AuthService = AuthService;
      this.LoadingService = LoadingService;

      this.loading = false;
      this.data = {
        email: null
      };

    }

    reset() {
      if (!this.loading) {
        this.LoadingService.start();
        this.loading = true;

        this.AuthService.resetPassword(this.data)
          .then(() => {
            this.success = true;
          }).catch(() => {
            // we omit reset fails...
          })
          .then(() => {
            this.success = true;
            this.loading = false;
            this.LoadingService.stop();
          });
      }
    }
  }

  angular
    .module('botmon')
    .component('resetPassword', {
      controller: ResetPasswordController,
      templateUrl: 'reset-password/reset-password.html'
    });

})();
