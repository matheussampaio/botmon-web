(function () {

  class DashboardController {
    /* @ngInject */
    constructor($rootScope, $firebaseObject, AuthService, FirebaseRef) {
      this.$rootScope = $rootScope;
      this.$firebaseObject = $firebaseObject;

      this.AuthService = AuthService;
      this.FirebaseRef = FirebaseRef;

      this.bots = null;
    }

    $onInit() {
      const ref = this.FirebaseRef.database.ref(`users/${this.AuthService.user.uid}/bots`);
      this.bots = this.$firebaseObject(ref);

      this.bots.$loaded(() => {
        this.$rootScope.$evalAsync();
      });
    }

    $onDestroy() {
      if (this.bots) {
        this.bots.$destroy();
        this.bots = null;
      }
    }
  }

  angular
    .module('botmon')
    .component('dashboard', {
      controller: DashboardController,
      templateUrl: 'dashboard/dashboard.html'
    });

})();
