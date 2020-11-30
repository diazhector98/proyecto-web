import React, { useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import app from "../base.js"
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import * as firebase from "firebase/app";
import Form from 'react-bootstrap/Form'
import logo from '../pages/assets/logo_web.png'
import '../pages/assets/useraccess.css'
import ManageUser from '../utils/manageUser'

const Login = ({ history }) => {
  const manage = new ManageUser()
  manage.alreadyLogged({history})
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      manage.login({ history, email, password })
    },
    [history]
  );

  const signUpButtonPushed = () => {
    history.push("/signup");
}


  let check = false;
  let checkItem = () => {
    check = !check;
    if (check === true) {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    } else {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    }
}


  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/home">
          {/* 71 y 100 */}
          <img src={logo} alt="Logo" height="60px" width="90" />

        </Navbar.Brand>



      </Navbar>

      <div className="container" style = {{marginTop: "75px"}}>
        <h1>Log in</h1>

        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" type="email" placeholder="Email" required />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Password" required />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" onChange = {checkItem}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
                        </Button>
        </Form>

      </div>
      <p style = {{marginTop: "10px"}}>
        Usuario nuevo? Haz click <p style={{ color: 'blue' }} onClick={signUpButtonPushed}> aquí </p>
      </p>
    </div>
  );
};


export default withRouter(Login)