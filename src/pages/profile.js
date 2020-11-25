import React, { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import logo from '../pages/assets/logo1.png'
import * as firebase from "firebase/app";
import "firebase/auth";

const ProfilePage = () => {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("SOmeone is up")
        } else {
            console.log("This should not happen")
        }
    });

    var user = firebase.auth().currentUser;
    var name, email, uid;

    if (user != null) {
        name = user.displayName;
        email = user.email;
        uid = user.uid;  
    }

    return (
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
            <div class="container">
                <h1>Sign Up</h1>
                <form>
                    <div>
                        <label>
                            Name: 
                        </label>
                    </div>
                    <div>
                            Email:
                    </div>
                    <div>
                        <Button type="submit">Log in</Button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default ProfilePage;