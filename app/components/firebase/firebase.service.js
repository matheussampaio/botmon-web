(function () {

  angular
    .module('botmon')
    .service('FirebaseRef', FirebaseRef);

  function FirebaseRef($window, $firebaseAuth, FirebaseConfig) {
    // const firebase = $window.firebase;

    // Initialize Firebase
    const config = {
      apiKey: FirebaseConfig.API_KEY,
      authDomain: FirebaseConfig.AUTH_DOMAIN,
      databaseURL: FirebaseConfig.DATABASE_URL,
      storageBucket: FirebaseConfig.STORAGE_BUCKET,
    };

    firebase.initializeApp(config);

    const service = {
      database: firebase.database(),
      auth: $firebaseAuth()
    };

    return service;
  }

})();
