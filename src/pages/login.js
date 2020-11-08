import React, {useCallback, useContext} from 'react'
import {withRouter, Redirect} from 'react-router-dom'
import app from "../base.js"
import { AuthContext } from "../Auth.js"
import Button from 'react-bootstrap/Button';


const Login = ({ history }) => {
    const handleLogin = useCallback(
      async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
          await app
            .auth()
            .signInWithEmailAndPassword(email.value, password.value);
          history.push("/");
        } catch (error) {
          alert(error);
        }
      },
      [history]
    );

//
//    const { currentUser } = useContext(AuthContext);

//    if (currentUser) {
//      return <Redirect to="/" />;
//    }
  

    return (
    <div>
        <h1>Log in</h1>
        <form onSubmit = {handleLogin}>
            <label>
                Email
                <input name = "email" type = "email" placeholder = "Email" required />
            </label>
            <label>
                Password
                <input name = "password" type = "password" placeholder = "Password" required />
            </label>
            <Button type = "submit">Log in</Button>
        </form>
    </div>
    );
};


export default withRouter(Login)