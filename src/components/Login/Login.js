import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';



function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    newUser: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
 
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res => {
          setUser(res);
          setLoggedInUser(res);
          history.replace(from);
        })
  }


  const fbSignIn = () => {
      handleFbSignIn()
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
  }

  const signOut = () => {
      handleSignOut()
      .then(res => {
          setUser(res);
          setLoggedInUser(res);
      })
  }

  const handleBlur = (e) => {
    // console.log(e.target.name, e.target.value);
    let isFormValid = true;
    if(e.target.name === 'email'){
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
      // const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
      // console.log(isEmailValid)
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value); // for password one number is required 
      isFormValid = isPasswordValid && passwordHasNumber;
      // console.log(isPasswordValid && passwordHasNumber);
    }
    if(isFormValid){
      // [...cart, newItem]
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    // console.log(user.email, user.password);
    if(newUser && user.email && user.password){
        createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
            setUser(res);
            setLoggedInUser(res);
            history.replace(from);
        })
      
    }

    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
    }

    e.preventDefault();
  }


  


  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut}> Sign out </button> :
        <button onClick={googleSignIn}> Sign In </button>
        
      }
      <br/>
      <button onClick={fbSignIn} >Sign In using Facebook</button>
      {
        user.isSignedIn && <div>  
        <p>Welcome, {user.name}</p>
        <p>your email: {user.email}</p>
        <img src= {user.photo} alt=""></img>
        </div>
      }

      <h1>Our own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign up</label>
      <br/>
      
      <form onSubmit={handleSubmit}>

        {newUser && <input  type="text" onBlur={handleBlur} name="name" placeholder= "your name" required />} 
        <br/>
        <input type="text" onBlur={handleBlur} name="email" placeholder="Your email address" required />
        <br/>
        <input type="password" onChange={handleBlur} name="password" id="" placeholder="Password" required/>
        <br/>
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p  style={{color: 'red'}} > {user.error} </p>
      { 
        user.success && <p  style={{color: 'green'}} > User { newUser ? 'created' : 'Logged In' } sucessfully </p>
      }
    </div>
  );
}

export default Login;
