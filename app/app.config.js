(function () {

  angular.module('botmon')
    .run(botmonRun)
    .config(botmonConfig);

  function botmonRun($state, $rootScope, AuthService) {
    $rootScope.$on('$stateChangeStart', (event, toState) => {

      const isAuthenticated = AuthService.isAuthenticated();
      const isPrivateAction = angular.isObject(toState.data) && toState.data.private === true;
      const isPublicOnlyAction = angular.isObject(toState.data) && toState.data.publicOnly === true;

      if (isAuthenticated) {
        if (isPublicOnlyAction) {
          event.preventDefault();
          $state.go('app.dashboard');
        }
      } else {
        if (isPrivateAction) {
          event.preventDefault();
          $state.go('app.login', { from: toState.name });
        }
      }
    });
  }

  function botmonConfig($stateProvider, $urlRouterProvider) {
    const appState = {
      url: '',
      template: '<app></app>'
    };

    const homeState = {
      url: '/home',
      template: '<home></home>',
      data: {
        publicOnly: true
      }
    };

    const dashboardState = {
      url: '/dashboard',
      template: '<dashboard></dashboard>',
      data: {
        private: true
      }
    };

    const createState = {
      url: '/create',
      template: '<create-bot></create-bot>',
      data: {
        private: true
      }
    };

    const botViewState = {
      url: '/bot/:id',
      template: '<bot-view></bot-view>',
      data: {
        private: true
      }
    }

    const profileState = {
      url: '/profile',
      template: '<profile></profile>',
      data: {
        private: true
      }
    };

    const loginState = {
      url: '/login',
      template: '<login></login>',
      data: {
        publicOnly: true
      },
      params: {
        from: 'app.home'
      }
    };

    const registerState = {
      url: '/register',
      template: '<register></register>',
      data: {
        publicOnly: true
      }
    };

    const resetPasswordState = {
      url: '/reset',
      template: '<reset-password></reset-password>',
      data: {
        publicOnly: true
      }
    };

    const changePasswordState = {
      url: '/change',
      template: '<change-password></change-password>',
      data: {
        private: true
      }
    };

    $stateProvider
      .state('app', appState)
        .state('app.change', changePasswordState)
        .state('app.home', homeState)
        .state('app.dashboard', dashboardState)
          .state('app.dashboard.create', createState)
          .state('app.dashboard.bot', botViewState)
        .state('app.login', loginState)
        .state('app.profile', profileState)
        .state('app.register', registerState)
        .state('app.reset', resetPasswordState);

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/dashboard');
  }

})();
