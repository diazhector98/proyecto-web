import React, { useCallback } from 'react';
import { withRouter } from "react-router";
import app from "../base.js"
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Col, Form } from "react-bootstrap"
import logo from '../pages/assets/logo_web.png'
import * as firebase from "firebase/app";
import Mongo from '../utils/mongo'
import ManageUser from '../utils/manageUser'

const SignUpPage = ({ history }) => {
    const logInButtonPushed = () => {
        history.push("/login");
    }

    const manage = new ManageUser()
    manage.alreadyLogged({ history })
    let check = false;
    let checkItem = () => {
        check = !check;
        if (check === true) {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        } else {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        }
    }
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { first_name, last_name, email, password } = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value).then(() => {
                    var user = firebase.auth().currentUser;
                    const displayName = email.value.split("@")[0];
                    return user.updateProfile({ displayName });
                })
                .then(() => {
                    var user = firebase.auth().currentUser;
                    var fname = first_name.value
                    var lname = last_name.value
                    console.log({ user });

                    const mongo = new Mongo();
                    mongo.insertUser({
                        firebaseId: user.uid,
                        name: fname + " " + lname,
                        email: email.value
                    })

                    const db = firebase.firestore();
                    db
                        .collection("users")
                        .doc(user.uid)
                        .set({ fname, lname });
                    history.push("/profile");
                })
                .catch((error) => console.error("Error: ", error));
        } catch (error) {
            alert(error);
        }
    }, [history]);

    return (


        <div className="restof">
            <div>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href="/home">
                        {/* 71 y 100 */}
                        <img src={logo} alt="Logo" height="60px" width="90" />

                    </Navbar.Brand>
                    <Nav className="mr-auto">

                    </Nav>


                </Navbar>
                <div className="container" style={{ marginTop: "75px" }}>
                    <h1>Sign Up</h1>


                    <Form onSubmit={handleSignUp}>
                        <Form.Group>
                            <Form.Row>
                                <Col>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control name="first_name" type="first_name" placeholder="First name" required />
                                </Col>
                                <Col>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control name="last_name" type="last_name" placeholder="Last name" required />
                                </Col>
                            </Form.Row>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Email" required />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" required />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me" onChange={checkItem}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                <p style={{ marginTop: "10px" }}>
                    Ya eres usario? Haz click <p style={{ color: 'blue' }} onClick={logInButtonPushed}> aquí </p>
                </p>
            </div>
        </div>

    )
}

export default withRouter(SignUpPage);