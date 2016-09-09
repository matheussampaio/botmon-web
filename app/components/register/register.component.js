(function () {

  class RegisterController {
    /* @ngInject */
    constructor($state, AuthService, LoadingService) {
      this.$state = $state;

      this.AuthService = AuthService;
      this.LoadingService = LoadingService;

      this.loading = false;
      this.data = {
        email: null,
        confirmEmail: null,
        password: null,
        confirmPassword: null
      };
      this.error = {
        show: null,
        message: {
          EMAIL_TAKEN: 'The specified email address is already in use.',
          PASSWORD_NOT_MATCH: 'The confirm password should match.',
          EMAIL_NOT_MATCH: 'The confirm email should match.'
        },
        last: null
      };
    }

    register() {
      if (this.data.email !== this.data.confirmEmail) {
        this.error.show = 'EMAIL_NOT_MATCH';
      } else if (this.data.password !== this.data.confirmPassword) {
        this.error.show = 'PASSWORD_NOT_MATCH';
      } else if (!this.loading) {
        this.loading = true;
        this.LoadingService.start();
        this.AuthService.createUser(this.data)
          .then(() => {
            this.$state.go('app.home');
          })
          .catch((error) => {
            if (!this.error.message[error.code]) {
              this.error.show = 'LAST';
              this.error.message.last = error;
            } else {
              this.error.show = error.code;
            }

            this.LoadingService.stop();
            this.loading = false;
          });
      }
    }
  }

  angular
    .module('botmon')
    .component('register', {
      controller: RegisterController,
      templateUrl: 'register/register.html'
    });

})();
