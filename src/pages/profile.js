
import React, { useCallback, useEffect } from 'react';
import { Row, Col, Button, Navbar } from "react-bootstrap"
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import logo from '../pages/assets/logo1.png'
import * as firebase from "firebase/app";
import "firebase/auth";

const ProfilePage = ({ history }) => {

    const LogOut = useCallback(async event => {
        event.preventDefault();
        try {
            firebase.auth().signOut().then(() => {
                console.log("User has left")
            })

            history.push("/home");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    const Delete = useCallback(async event => {
        event.preventDefault();
        try {
            firebase.auth().currentUser.delete().then(function () {
                console.log("User deleted")
            }).catch(function (error) {
                // An error happened.
            });

            history.push("/home");
        } catch (error) {
            alert(error);
        }
    }, [history]);


    var user = firebase.auth().currentUser;
    var fname, lname, username, email, uid;
    const db = firebase.firestore()
    if (user != null) {
        username = user.displayName;
        email = user.email;
        uid = user.uid;
        db.collection('users').doc(uid).get().then((info) => {
            fname = info.data().fname;
            lname = info.data().lname;
            console.log(fname, lname)
        })
    }
    function formatName() {
        console.log(fname)
        return fname + ' ' + lname;
    }


    const ProfileName = () => {

        return React.createElement('div', null, formatName())
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
            <div className="container">
                <h1>Profile</h1>
                <form>
                    <div>
                        <label>
                            Name: <ProfileName />
                        </label>
                    </div>
                    <div>
                        <label>
                            Email: {email}
                        </label>
                    </div>
                    <div>
                        <label>
                            UserId: {uid}
                        </label>
                    </div>
                </form>
                <div>
                    <Row>
                        <Col>
                            <Button type="LogOut" onClick={LogOut}>Log Out</Button>
                        </Col>
                        <Col>
                            <Button type="Danger" onClick={Delete}>Delete Account</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>

    )
}

export default ProfilePage;