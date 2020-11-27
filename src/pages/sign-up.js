import React, { useCallback } from 'react';
import { withRouter } from "react-router";
import app from "../base.js"
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Col, Form } from "react-bootstrap"
import logo from '../pages/assets/logo1.png'
import * as firebase from "firebase/app";

const SignUpPage = ({ history }) => {
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
                    console.log({user});
                    
                    const db = firebase.firestore();
                    db
                      .collection("users")
                      .doc(user.uid)
                      .set({ fname, lname});
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
                        <img src={logo} alt="Logo" height="61px" width="90" />

                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/category">Categorias</Nav.Link>
                        <Nav.Link href="/books">Mis libros</Nav.Link>
                    </Nav>
                    <Form inline>
                        <Form.Control type="text" placeholder="Busca un libro" className="mr-sm-2" />
                        <Button variant="outline-primary">Buscar</Button>
                    </Form>

                </Navbar>
                <div className="container">
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

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>

    )
}

export default withRouter(SignUpPage);