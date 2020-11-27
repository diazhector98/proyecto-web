
import React, { useCallback, useEffect, useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Library from '../utils/library'

import {
    useParams
  } from "react-router-dom";
const BookPage = ({ history }) => {
    let { bookId } = useParams();
    const [bookInfo, setBookInfo] = useState({
        id: "",
        title: "",
        publishedDate: "",
    })

    useEffect(() => {
        const library = new Library()
        library.getBook({bookId}).then((result) => {
            setBookInfo(result.data)
        }).catch((e) => {
            console.log({e})
        })
    }, [])
    return (
        <div>
            <p>Id: {bookInfo.id}</p>
            <p>Title: {bookInfo.title}</p>
            <p>Published Date: {bookInfo.publishedDate}</p>
        </div>

    )
}

export default BookPage;