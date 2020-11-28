
import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Button, Navbar } from "react-bootstrap"
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import logo from '../pages/assets/logo1.png'
import "firebase/auth";
import app from "../base.js"
import Mongo from '../utils/mongo'
import BookList from '../components/book-list'
import Card from 'react-bootstrap/Card'
import UserNavBar from '../utils/updatedNavBar'

const READING = 0
const PLANNING = 1
const READ = 2

const ProfilePage = ({ history }) => {
    var fname, lname, username, email, uid;
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        firebaseId: "",
    })
    const [userBooks, setUserBooks] = useState([])
    const [readingNowBooks, setReadingNowBooks] = useState([])
    const [planningToReadBooks, setPlanningToReadBooks] = useState([])
    const [readBooks, setReadBooks] = useState([])
    const [section, setSection] = useState(READING)

    const bookIdInBooks = (id, books) => {
        for(let i = 0; i < books.length; i++) {
            const book = books[i]
            const {bookId} = book
            if (id === bookId) {
                return true
            }
        }
        return false
    }
  
    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            if (user != null) {
                uid = user.uid;
                const mongo = new Mongo()
                mongo.getUser({
                    firebaseId: uid
                }).then((result) => {
                    const userData = result.data
                    setUserInfo(userData)
                    mongo.getUserBooks({
                        firebaseId: uid
                    }).then((result) => {
                        
                        if(result.data === "Error") {
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
            <Card style={{
                display: 'flex',
                flexDirection: 'row',
                padding: 30
            }}>
                <Card style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: 20,
                    padding: 10
                }}>
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
                </Card>

                <div>
                    <div style={{
                        display: 'flex',
                    }}>
                        <Button onClick={() => setSection(READING)}> Leyendo </Button>
                        <Button onClick={() => setSection(PLANNING)}> Planeando Leer </Button>
                        <Button onClick={() => setSection(READ)}> Leídos </Button>
                    </div>

                    {
                        section == READING ?
                        <BookList title="Libros Leyendo" books={readingNowBooks} /> :
                        section == PLANNING ?
                        <BookList title="Libros Planeando Leer" books={planningToReadBooks} /> :
                        section == READ ?
                        <BookList title="Libros Leidos" books={readBooks} /> :
                        null
                    }
                </div>


                

            </Card>
        </div>

    )
}

export default ProfilePage;