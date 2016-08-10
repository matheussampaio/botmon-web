(function () {
  let DEBUG_MODE = false; // eslint-disable-line

  // gulp-inject-debug-mode

  let FIREBASE_CONFIG = {
    API_KEY: 'AIzaSyAvjGhE7SdL1jQ4pHmu1CEmo1jck7Thams',
    AUTH_DOMAIN: 'meowth-aed86.firebaseapp.com',
    DATABASE_URL: 'https://meowth-aed86.firebaseio.com/',
    STORAGE_BUCKET: 'meowth-aed86.appspot.com'
  };

  angular
    .module('fmsc')
    .constant('FirebaseConfig', FIREBASE_CONFIG);

})();
