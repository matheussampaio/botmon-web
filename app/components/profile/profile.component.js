(function () {

  class ProfileController {
    /* @ngInject */
    constructor(_, LoadingService, AuthService) {
      this._ = _;
      this.LoadingService = LoadingService;
      this.AuthService = AuthService;

      this.data = null;
      this.updating = false;
    }

    $onInit() {
      this.LoadingService.start();
      this.AuthService.getUser().then(user => {
        this.LoadingService.stop();
        this.data = {
          name: user.name,
          state: user.state
        };
      });
    }

    update() {
      if (this.data.name !== this.AuthService.user.name) {
        this.updating = true;
      } else {
        this.updating = false;
      }
    }

    cancel() {
      this.data.name = this.AuthService.user.name;
      this.data.state = this.AuthService.user.state;
      this.updating = false;
    }

    save() {
      this.updating = false;

      this.LoadingService.start();

      this.AuthService.update(this.data).then(() => {
        this.LoadingService.stop();
        this.updating = false;
      });
    }
  }


  angular
    .module('botmon')
    .component('profile', {
      controller: ProfileController,
      templateUrl: 'profile/profile.html',
      bindings: {
        user: '<'
      }
    });

})();
