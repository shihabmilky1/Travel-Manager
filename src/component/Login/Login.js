import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import './login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const Login = () => {
  const [logInUser, setLogInUser] = useContext(UserContext);
  const [newUser, setNewUser] = useState(false)
  const [users, setUsers] = useState({
    name: '',
    email: '',
    password: '',
    retypePassword: '',
    photo: '',
    isLogIn: false
  });
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = () => {
    if (!newUser && users.password !== '' && users.retypePassword !== '') {
      if (users.password !== users.retypePassword) {
        toast.error("Password dosen't match", {
          position: 'top-center'
        });
      }
      if (!newUser && users.email && users.password) {
        if (users.password === users.retypePassword) {
          firebase.auth().createUserWithEmailAndPassword(users.email, users.password)
            .then((res) => {
              manageUser(users.name);
              toast.success('Account Create Successful', {
                position: 'top-center'
              });
            })
            .catch((error) => {
              var errorMessage = error.message;
              toast.error(errorMessage, {
                position: 'top-center'
              });
            });
        }
      }
    }
    if (newUser && users.email && users.password) {
      firebase.auth().signInWithEmailAndPassword(users.email, users.password)
        .then((res) => {
          toast.success('Login Successful', {
            position: 'top-center'
          });
          setLogInUser(users);
          history.replace(from);
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage, {
            position: 'top-center'
          });
        });
    }
  };
  const handleInput = (e) => {
    let inInputValid = true;
    if (e.target.name === 'email') {
      inInputValid = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(e.target.value)
    }
    if (e.target.name === 'password') {
      inInputValid = (/^[a-zA-Z0-9!@#$%^&*]{6,16}$/).test(e.target.value)
    }
    if (e.target.name === 'retypePassword') {
      inInputValid = (/^[a-zA-Z0-9!@#$%^&*]{6,16}$/).test(e.target.value)
    }

    if (inInputValid) {
      const newUserInfo = { ...users }
      newUserInfo[e.target.name] = e.target.value;
      setUsers(newUserInfo);
    }
  }
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        const userBio = result.user;
        toast.success('Login Successful', {
          position: 'top-center'
        });
        const newUserInfo = { ...users };
        newUserInfo.name = userBio.displayName;
        newUserInfo.email = userBio.email;
        newUserInfo.photo = userBio.photoURL;
        setLogInUser(newUserInfo);
        history.replace(from);
      }).catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage, {
          position: 'top-center'
        });
      });
  }
  const manageUser = (name) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
    }).then((res) => {
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    });
  }
  return (
    <div className="text-center container">
      <form className="m-auto pt-5 mt-5" onSubmit={handleSubmit(onSubmit)}>

        <div className="login-area">
          <div className="name-felid" >
            {!newUser && <input name="name" className="form-control my-3 name-input" placeholder="Name" ref={register({ required: true })} />}
          </div>
          <div className="email-felid" >
            <input onBlur={handleInput} type="email" name="email" className="form-control my-3 email-input" placeholder="Email" ref={register({ required: true })} />
            {errors.email && <span style={{ fontSize: '14px' }}>email is required</span>}
          </div>
          <div className="password-felid">
            <input onBlur={handleInput} name="password" type="password" className="form-control my-3 password-input" placeholder="Password" ref={register({ required: true })} />
            {errors.email && <span style={{ fontSize: '14px' }}>password is required</span>}
          </div>
          <div className="password-felid">
            {!newUser && <input onBlur={handleInput} name="retypePassword" type="password" className="form-control my-3 password-input" placeholder="Confirm Password" ref={register({ required: true })} />}
            {errors.retypePassword && <span style={{ fontSize: '14px' }}>confirm password is required</span>}
          </div>
          <div className="before-login d-flex justify-content-between my-3">
            <div>
              {newUser && <label htmlFor="remember">
                <span><input id="remember" type="checkbox" /> Remember Me</span>
              </label>}
            </div>
            <div>
              {newUser && <span style={{ color: '#00ac96', textDecoration: 'underline', cursor: 'pointer' }}>Forgot Password</span>}
            </div>
          </div>
          <input type="submit" value={!newUser ? 'Create an account' : 'Login'} style={{ borderRadius: '0px' }} className="submit-button btn btn-block btn-outline-info px-4" />
          <p className="mt-2">{!newUser ? "Already have an account" : "Don't have an account"}?<span onClick={() => setNewUser(!newUser)} style={{ color: '#00ac96', textDecoration: 'underline', cursor: 'pointer' }}>{!newUser ? ' Login' : ' Create an account'}</span></p>
        </div>
        <p><b>or</b></p>
      </form>
      <div className="google-login-method mb-5" style={{ maxWidth: "480px", margin: 'auto' }}>
        <button onClick={googleSignIn} className="btn btn-outline-dark btn-block"><FontAwesomeIcon style={{ marginRight: '10px' }} icon={faGoogle} />
 Continue with Google</button>
      </div>
      <ToastContainer />
    </div>


  );
};

export default Login;