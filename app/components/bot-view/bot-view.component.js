(function () {

  class BotViewController {
    /* @ngInject */
    constructor($log, $rootScope, $stateParams, $firebaseObject, FirebaseRef) {
      this.$log = $log;
      this.$rootScope = $rootScope;
      this.$stateParams = $stateParams;
      this.$firebaseObject = $firebaseObject;
      this.FirebaseRef = FirebaseRef;

      this.logsRef = null;
      this.logs = '';
    }

    $onInit() {
      this.$log.log('BotViewController::$onInit');
      this.logDiv = document.getElementById("logView");

      this.logsRef = this.FirebaseRef.database.ref(`bots/${this.$stateParams.id}/logs`)

      this.logsRef.on('child_added', data => {
        this.logDiv.innerHTML += ansi_up.ansi_to_html(data.val() + '<br>');
        this.logDiv.scrollTop = this.logDiv.scrollHeight;
      });

      this.logsRef.on('child_changed', data => {
        this.logDiv.innerHTML += ansi_up.ansi_to_html(data.val() + '<br>');
        this.logDiv.scrollTop = this.logDiv.scrollHeight;
      });

    }

    $onDestroy() {
      this.$log.log('BotViewController::$onDestroy');

      if (this.logsRef) {
        this.logsRef.off('child_added');
        this.logsRef.off('child_changed');
        this.logsRef = null;
      }
    }
  }

  angular
    .module('botmon')
    .component('botView', {
      controller: BotViewController,
      templateUrl: 'bot-view/bot-view.html',
      binginds: {
        bot: '<'
      }
    });

})();
