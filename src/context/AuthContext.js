import React, { createContext, useState, useEffect } from "react";
import { auth } from "../auth/firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, GoogleAuthProvider, signInWithPopup,sendPasswordResetEmail} from "firebase/auth"
import {useNavigate} from "react-router-dom"
import {toastSuccessNotify, toastErrorNotify, toastWarnNotify} from "../helper/ToastNotify"


export const AuthContext = createContext();


const AuthContextProvider = ({ children }) => {
let navigate = useNavigate() 
const [currentUser, setCurrentUser] = useState(false)

useEffect(() => {
 userObserver()
}, [])


    const createUser = async (email, password, displayName) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName
        // displayName:displayName  - same as above
      })
      navigate("/")
      toastSuccessNotify(`${displayName} Registered Successfully!`)

    } catch (error) {
      console.log(error.message)
    }
  };

  const logIn = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password)
        navigate("/")
        toastSuccessNotify("Logged in successfully!")
    } catch (error) {
        console.log(error.message);
       
    }
  }


  const logOut = ()=>{
    signOut(auth)
    toastSuccessNotify("Logged out successfully!")
  }



const userObserver = ()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
        const {email, displayName, photoURL}=user;
        setCurrentUser ({email, displayName, photoURL});
        } else {
          setCurrentUser(false)
        }})

}

const forgotPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toastWarnNotify("Please check your mail box!");
      })
      .catch((err) => {
        toastErrorNotify(err.message);
      });
  };


const signUpProvider = ()=>{
const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
.then((result) => {
console.log(result);
navigate("/")
}).catch((error) => {
console.log(error);     
});


}


const values = {
    createUser,
    logIn,
    logOut,
    userObserver,
    currentUser,
    signUpProvider,
    forgotPassword
}

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
