
import React, { useCallback, useEffect, useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Library from '../utils/library'
import Mongo from '../utils/mongo'
import app from "../base.js"
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import {
    useParams
  } from "react-router-dom";
const BookPage = ({ history }) => {
    let { bookId } = useParams();
    const [date, onDateChanged] = useState(new Date())
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
        library.getBook({bookId}).then((result) => {
            console.log({result})
            const postBookData = {
                ...result.data,
                bookId: result.data.id,
                imageLink: result.data.imageLinks ? result.data.imageLinks.thumbnail : null
            }
            console.log({postBookData})
            library.postBook(postBookData).then((res) => {
                console.log({res})
            })
            setBookInfo(result.data)
        }).catch((e) => {
            console.log({e})
        })

        app.auth().onAuthStateChanged((user) => {
            if (user != null) {
                const uid = user.uid;
                setUserInfo({
                    userId: uid
                })
            }
        })

    }, [])

    const onReadingNowClicked = () => {
        const mongo = new Mongo()
        console.log({bookInfo, userInfo})
        mongo.addReadingNowBook({
            firebaseId: userInfo.userId, 
            bookId: bookInfo.id
        }).then((result) => {
            console.log({result})
            alert("Libro agregado a Libros Leyendo")
            history.push('/profile')

        })
    }

    const onPlannningToReadClicked = () => {
        const mongo = new Mongo()
        console.log({bookInfo, userInfo})
        mongo.addPlanningToReadBook({
            firebaseId: userInfo.userId, 
            bookId: bookInfo.id
        }).then((result) => {
            console.log({result})
            history.push('/profile')
        })
    }

    return (
        <div>
            <img src={bookInfo.imageLinks.thumbnail}/>
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
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Total De Páginas</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
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