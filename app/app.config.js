(function () {

  angular.module('fmsc')
    .run(fmscRun)
    .config(fmscConfig);

  function fmscRun($state, $rootScope, AuthService) {
    $rootScope.$on('$stateChangeStart', (event, toState) => {

      const isAuthenticated = AuthService.isAuthenticated();
      const isPrivateAction = angular.isObject(toState.data) && toState.data.private === true;
      const isPublicOnlyAction = angular.isObject(toState.data) && toState.data.publicOnly === true;

      if (isAuthenticated) {
        if (isPublicOnlyAction) {
          event.preventDefault();
          $state.go('app.home');
        }
      } else {
        if (isPrivateAction) {
          event.preventDefault();
          $state.go('app.login', { from: toState.name });
        }
      }
    });
  }

  function fmscConfig($stateProvider, $urlRouterProvider) {
    const appState = {
      url: '/',
      template: '<app></app>'
    };

    const homeState = {
      url: 'home',
      template: '<home></home>'
    };

    const profileState = {
      url: 'profile',
      template: '<profile></profile>',
      data: {
        private: true
      }
    };

    const loginState = {
      url: 'login',
      template: '<login></login>',
      data: {
        publicOnly: true
      },
      params: {
        from: 'app.home'
      }
    };

    const registerState = {
      url: 'register',
      data: {
        publicOnly: true
      },
      template: '<register></register>'
    };

    const resetPasswordState = {
      url: 'reset',
      data: {
        publicOnly: true
      },
      template: '<reset-password></reset-password>'
    };

    const changePasswordState = {
      url: 'change',
      data: {
        private: true
      },
      template: '<change-password></change-password>'
    };

    $stateProvider
      .state('app', appState)
        .state('app.change', changePasswordState)
        .state('app.home', homeState)
        .state('app.login', loginState)
        .state('app.profile', profileState)
        .state('app.register', registerState)
        .state('app.reset', resetPasswordState);

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');
  }

})();
