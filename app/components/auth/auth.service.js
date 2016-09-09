(function () {

  angular
    .module('botmon')
    .service('AuthService', AuthService);

  function AuthService($q, $log, $firebaseAuth, $firebaseObject, FirebaseRef) {
    const _auth = FirebaseRef.auth;

    const service = {
      user: null,
      getUser,
      login,
      logout,
      createUser,
      isAuthenticated,
      update,
      resetPassword,
      changePassword
    };

    activate();

    return service;

    ///////////////////

    function activate() {
      console.log('activate...');
      _auth.$onAuthStateChanged(loadUser);
    }

    function loadUser(firebaseUser) {
      // TODO: use param to get user instead
      const auth = _auth.$getAuth();

      if (auth === null) {
        service.user = null;
        return $q.reject();
      }

      service.user = $firebaseObject(FirebaseRef.database.ref(`users/${auth.uid}`));
      return service.user.$loaded();
    }

    function getUser() {
      if (!service.user) {
        return loadUser().then(() => service.user);
      }

      return service.user.$loaded().then(() => service.user);
    }

    function login({ email, password, remember }) {
      // TODO: check how to remember user on new firebase
      // , {
      //   remember: remember ? 'default' : 'sessionOnly'
      // }

      return _auth.$signInWithEmailAndPassword(
        email,
        password
      );
    }

    function logout() {
      _auth.$signOut();
      service.user = null;
    }

    function createUser({ email, password, name }) {
      $log.debug({ email, password });

      return _auth.$createUserWithEmailAndPassword(
        email,
        password
      )
      .then((user) => {
        return FirebaseRef.database.ref(`users/${user.uid}`).set({
          name,
          uid: user.uid,
          email
        });
      })
      .then(() => {
        $log.debug('User created.');

        return login({ email, password });
      });
    }

    function update({ name }) {
      service.user.name = name;

      return service.user.$save();
    }

    function isAuthenticated() {
      console.log('isAuthenticated');
      console.log(_auth.$getAuth());
      return _auth.$getAuth() !== null;
    }

    function resetPassword({ email }) {
      return _auth.$sendPasswordResetEmail(email);
    }

    function changePassword({ oldPassword, newPassword }) {
      // TODO: check if it is checking the old password or not
      return _auth.$updatePassword(newPassword);
    }

  }

})();
