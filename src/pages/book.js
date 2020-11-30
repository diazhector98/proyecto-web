
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
import Library from '../utils/library'
import Mongo from '../utils/mongo'
import ManageUser from '../utils/manageUser'
import app from "../base.js"
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../pages/assets/logo_web.png'
import NavBarSearch from '../utils/navbarSearch'

import {
    useParams
} from "react-router-dom";
const BookPage = ({ history }) => {
    let { bookId } = useParams();
    const [userOnline, setUserOnline] = useState([])
    let [findBooks, setBooks] = useState([])
    const manage = new ManageUser()
    manage.allowAccess({ history })
    const LogOut = (() => {
        manage.logOutUser({ history })
    });
    let [textQuery, setTextQuery] = useState("")
    const [date, onDateChanged] = useState(new Date())
    const [currentPage, setCurrentPage] = useState(undefined)
    const [totalPages, setTotalPages] = useState(undefined)
    const [modalShow, setModalShow] = useState(false)
    const [bookInfo, setBookInfo] = useState({
        id: "",
        title: "",
        authors: [],
        categories: [],
        averageRating: null,
        imageLinks: {},
        publishedDate: "",
    })
    const [userInfo, setUserInfo] = useState({
        userId: "",
    })

    useEffect(() => {
        const library = new Library()
        library.getBook({ bookId }).then((result) => {
            const postBookData = {
                ...result.data,
                bookId: result.data.id,
                imageLink: result.data.imageLinks ? result.data.imageLinks.thumbnail : null
            }
            library.postBook(postBookData).then((res) => {
            })
            setBookInfo(result.data)
        }).catch((e) => {
            console.log({ e })
        })

        app.auth().onAuthStateChanged((user) => {
            if (user != null) {
                setUserOnline(user)
                const uid = user.uid;
                setUserInfo({
                    userId: uid
                })
            }
        })

    }, [])

    const searchBooks = () => {
 
        const library = new Library()
        library.searchBooks({
            textQuery
        }).then(result => {
            console.log({
                result
            })
            const {
                books
            } = result.data
            setBooks(books)
            history.push(`/books`)
        })
    }

    const onReadingNowClicked = () => {
        const mongo = new Mongo()
        mongo.addReadingNowBook({
            firebaseId: userInfo.userId,
            bookId: bookInfo.id,
            currentPage,
            totalPages,
            dateStarted: date.toISOString()
        }).then((result) => {
            alert("Libro agregado a Libros Leyendo")
            history.push('/profile')

        })
    }

    const onPlannningToReadClicked = () => {
        const mongo = new Mongo()
        mongo.addPlanningToReadBook({
            firebaseId: userInfo.userId,
            bookId: bookInfo.id
        }).then((result) => {
            history.push('/profile')
        })
    }

    const onBookSelected = (bookId) => {
        history.push(`/book/${bookId}`)
      }

    const NavBarStatus = ({ }) => {
        if (userOnline) {
            return [<Nav.Link href="/profile" key={3}> Profile </Nav.Link>,
            <Button variant="light" key={4} onClick={LogOut}>Log Out</Button>]
        }
        else {
            return [<Nav.Link href="/login" key={0}> Log In </Nav.Link>,
            <Nav.Link href="/signup" key={2}> Sign Up </Nav.Link>]
        }
    }

    return (
        <div>
            <Navbar bg="light"
                variant="light" >
                <Navbar.Brand href="/home" >
                    <img src={logo} alt="Logo" height="60px" width="90" />
                </Navbar.Brand>

                <Nav className="mr-auto" >
                    <Nav.Link href="/books" > Mis libros </Nav.Link>
                </Nav >

                <Form inline >
                    <NavBarStatus />
                    <Form.Control type="text"
                        placeholder="Busca un libro"
                        className="mr-sm-2"
                        onChange={
                            (e) => setTextQuery(e.target.value)
                        } />
                    <Button id="buscarLibro" variant="outline-primary" onClick={searchBooks} > Search </Button>
                </Form >
            </Navbar>
            <div>
            </div>
            <img src={bookInfo.imageLinks.thumbnail} />
            <p>Id: {bookInfo.id}</p>
            <p>Title: {bookInfo.title}</p>
            <p>Published Date: {bookInfo.publishedDate}</p>
            <p>Average Rating: {bookInfo.averageRating}</p>
            <Button onClick={() => setModalShow(true)}>Leyendo Ahora</Button>
            <Button onClick={onPlannningToReadClicked}>Planeo Leer</Button>

            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>¡Woohoo! ¿En donde vas?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onReadingNowClicked}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Página Actual</Form.Label>
                            <Form.Control
                                placeholder="Introduce la página en donde vas"
                                onChange={(e) => setCurrentPage(parseInt(e.target.value))}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Total De Páginas</Form.Label>
                            <Form.Control
                                placeholder="Introduce el total de páginas"
                                onChange={(e) => setTotalPages(parseInt(e.target.value))}
                            />
                        </Form.Group>
                        <Form.Label>¿Cuando empezaste a leerlo?</Form.Label>
                        <Calendar
                            onChange={onDateChanged}
                            value={date}
                        />
                        <Button variant="primary" onClick={onReadingNowClicked}>
                            Guardar
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalShow(false)}>
                        Cerrar
                </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default BookPage;