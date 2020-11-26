
import React, { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import logo from '../pages/assets/logo1.png'
import * as firebase from "firebase/app";
import "firebase/auth";

const ProfilePage = ({ history }) => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("SOmeone is up")
            console.log(user)
        } else {
            console.log("This should not happen")
        }
    });

    const LogOut = useCallback(async event => {
        event.preventDefault();
        event.preventDefault();
        try {
            firebase.auth().signOut().then(()=>{
                console.log("User has left")
            })

            history.push("/home");
        } catch (error) {
            alert(error);
        }
    }, [history]);


    getUser
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
                <h1>Profile</h1>
                <form>
                    <div>
                        <label>
                            Name: {name}
                        </label>
                    </div>
                    <div>
                        Email: {email}
                    </div>
                    <div>
                        UserId: {uid}
                    </div>
                    <div>
                        <Button type="LogOut" onClick={LogOut}>Log Out</Button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default ProfilePage;