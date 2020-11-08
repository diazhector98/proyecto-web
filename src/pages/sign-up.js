import React, {useCallback} from 'react';
import {withRouter} from "react-router";
import app from "../base.js"
import Button from 'react-bootstrap/Button';

const SignUpPage = ({history}) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        try {
            await app
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error){
            alert(error);
        }
    }, [history]); 

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <label>
                    Email
                    <input type="email" placeholder="Email" name="email" required/>
                </label>
                <label>
                    Password
                    <input type="password" placeholder="Password" name="password" required/>
                    <Button type = "submit">Sign up</Button>
                </label>
            </form>
        </div>
    )
}

export default withRouter(SignUpPage);