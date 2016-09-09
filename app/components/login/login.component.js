(function () {

  class LoginController {
    /* @ngInject */
    constructor($state, $log, AuthService, LoadingService) {
      this.$state = $state;
      this.$log = $log;

      this.AuthService = AuthService;
      this.LoadingService = LoadingService;

      this.loading = false;
      this.data = {
        email: null,
        password: null,
        remember: true
      };

      this.error = {
        show: null,
        message: {
          INVALID_EMAIL: 'Email or password invalid.',
          INVALID_PASSWORD: 'Email or password invalid.'
        }
      };
    }

    login() {
      if (!this.loading) {
        this.LoadingService.start();
        this.loading = true;

        this.AuthService.login(this.data)
          .then(authData => {
            this.LoadingService.stop();
            this.$state.go(this.$state.params.from);
          }).catch(error => {
            this.error.show = error.code;
            this.LoadingService.stop();
            this.loading = false;
          });
      }
    }
  }

  angular
    .module('botmon')
    .component('login', {
      controller: LoginController,
      templateUrl: 'login/login.html'
    });

})();
