/*import React, { useEffect, useState } from "react";
import app from "./base.js";
import * as firebase from "firebase/app";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    });
  }, []);

  if(pending){
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser: this.state.currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const DB = () => {
  const db = firebase.firestore()
  return db
}
*/