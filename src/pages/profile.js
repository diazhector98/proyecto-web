
import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Button, Navbar } from "react-bootstrap"
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import logo from '../pages/assets/logo1.png'
import * as firebase from "firebase/app";
import "firebase/auth";
import app from "../base.js"
import Mongo from '../utils/mongo'
import BookList from '../components/book-list'


const ProfilePage = ({ history }) => {
    var fname, lname, username, email, uid;
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        firebaseId: "",
    })
    const [userBooks, setUserBooks] = useState([])

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            console.log({user})
            if (user != null) {
                uid = user.uid;
                const mongo = new Mongo()
                mongo.getUser({
                    firebaseId: uid
                }).then((result) => {
                    setUserInfo(result.data)
                })

                mongo.getUserBooks({
                    firebaseId: uid
                }).then((result) => {
                    console.log({result})
                    setUserBooks(result.data)
                })
            }
        })
    }, [])

    const LogOut = useCallback(async event => {
        event.preventDefault();
        try {
            app.auth().signOut().then(() => {
                console.log("User has left")
            })

            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    const Delete = useCallback(async event => {
        event.preventDefault();
        try {
            app.auth().currentUser.delete().then(function () {
                console.log("User deleted")
            }).catch(function (error) {
                // An error happened.
            });

            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);


    
    function formatName() {
        return userInfo.name;
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
                            Email: {userInfo.email}
                        </label>
                    </div>
                    <div>
                        <label>
                            UserId: {userInfo.firebaseId}
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

                {/* Libros Leyendo */}
                <BookList title="Libros Leyendo" books={userBooks} />
                {/* Libros Planeando Leer */}
                <BookList title="Libros Planeando Leer" books={userBooks} />
                {/* Libros Leidos */}
                <BookList title="Libros Leidos" books={userBooks} />
            </div>
        </div>

    )
}

export default ProfilePage;