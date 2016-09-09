(function () {

  class CreateBotController {
    /* @ngInject */
    constructor(FirebaseRef, AuthService) {
      this.FirebaseRef = FirebaseRef;
      this.AuthService = AuthService;
    }

    $onInit() {
      console.log('CreateBotController::$onInit');
    }

    $onDestroy() {
      console.log('CreateBotController::$onDestroy');
    }

    createBot() {
      const newBotKey = this.FirebaseRef.database.ref('bots').push().key;

      const updateUserPromise = this.FirebaseRef.database.ref(`users/${this.AuthService.user.uid}/bots`)
        .update({
          [newBotKey]: true
        });

      const createBotPromise = this.FirebaseRef.database.ref('bots/' + newBotKey)
        .set({
            status: 'offline',
            user: this.AuthService.user.uid,
            timestamp: new Date().getTime()
        });

      Promise.all([
        updateUserPromise,
        createBotPromise
      ])
      .then(...args => {
        console.log('then', args);
      })
      .catch(...args => {
        console.log('catch', args);
      });
    }
  }

  angular
    .module('botmon')
    .component('createBot', {
      controller: CreateBotController,
      templateUrl: 'create-bot/create-bot.html'
    });

})();
