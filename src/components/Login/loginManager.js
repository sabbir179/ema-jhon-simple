import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config'

export const initializeLoginFramework = () => {
    
    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

// google provider //
export const handleGoogleSignIn = () =>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(result => {
      const {displayName, photoURL, email} = result.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName, 
        email: email,
        photo: photoURL,
        success: true
      }
      return signedInUser;
    //   console.log(displayName,  email, photoURL)
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }
// ...

// facebook signIn //
  export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      user.success = true;
      return user;
    //   console.log('Fb user after sign in', user);
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
// ...


export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then(() =>{
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        photo: '',
        email: '',
        error: '',
        success: false
      }
      return signedOutUser;
    })
    .catch(err =>{

    })
  }


// Create User with email (gmail) and password
  export const createUserWithEmailAndPassword = (name, email, password) => {
      
     return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        // setUser(newUserInfo);
        updateUserName(name);
        return newUserInfo;
      })
      .catch( error => {
        // Handle Errors here.
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      });
  }
// ...

// signIn with email and password
  export const signInWithEmailAndPassword = (email, password) => {
      
     return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
        // setUser(newUserInfo);
        // setLoggedInUser(newUserInfo);
        // history.replace(from); 
        // console.log('sign in user info', res.user);
      })
      .catch(function(error) {
        // Handle Errors here.
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
        // ...
      });
  }
  // ...

  //update user Information
  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
      // photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
      console.log('user name updated sucessfully');
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });
  }