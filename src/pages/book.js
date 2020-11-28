
import React, { useCallback, useEffect, useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Library from '../utils/library'
import Mongo from '../utils/mongo'
import app from "../base.js"

import {
    useParams
  } from "react-router-dom";
const BookPage = ({ history }) => {
    let { bookId } = useParams();
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
            alert("Libro agregado a Libros Planeando Leer")
        })
    }

    return (
        <div>
            <img src={bookInfo.imageLinks.thumbnail}/>
            <p>Id: {bookInfo.id}</p>
            <p>Title: {bookInfo.title}</p>
            <p>Published Date: {bookInfo.publishedDate}</p>
            <p>Average Rating: {bookInfo.averageRating}</p>
            <Button onClick={onReadingNowClicked}>Leyendo Ahora</Button>
            <Button onClick={onPlannningToReadClicked}>Planeo Leer</Button>
        </div>

    )
}

export default BookPage;