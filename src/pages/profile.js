
import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Button, Navbar } from "react-bootstrap"
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import logo from '../pages/assets/logo_web.png'
import * as firebase from "firebase/app";
import "firebase/auth";
import app from "../base.js"


const ProfilePage = ({ history }) => {
    var fname, lname, username, email, uid;
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        userId: "",
    })

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            console.log({user})
            if (user != null) {
                console.log({user})
                const db = firebase.firestore()
                username = user.displayName;
                email = user.email;
                uid = user.uid;
                const mongo = new Mongo()
                console.log({uid})
                mongo.getUser({
                    firebaseId: uid
                }).then((result) => {
                    const userData = result.data
                    setUserInfo(userData)
                    mongo.getUserBooks({
                        firebaseId: uid
                    }).then((result) => {
                        console.log({result})
                        if (result.data === "Error") {
                            return
                        }
                        setUserBooks(result.data)

                        const books = result.data
                        let readingBooks = []
                        let planningBooks = []
                        let readBooks = []

                        books.forEach(book => {
                            const {bookId} = book
                            if (userData.planningToRead && bookIdInBooks(bookId, userData.planningToRead)) {
                                planningBooks.push(book)
                            }

                            if (userData.readingNow && bookIdInBooks(bookId, userData.readingNow)) {
                                readingBooks.push(book)
                            }
                        })
                        setPlanningToReadBooks(planningBooks)
                        setReadingNowBooks(readingBooks)

                    })
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
        console.log(fname)
        return userInfo.firstName + ' ' + userInfo.lastName;
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
                    <Nav.Link href="/category">Categorias</Nav.Link>
                </Nav>

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
                            UserId: {userInfo.userId}
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