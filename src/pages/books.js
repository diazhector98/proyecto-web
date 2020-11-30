import React, { useState, useEffect } from 'react'
import Mongo from '../utils/mongo'
import ManageUser from '../utils/manageUser'
import Library from '../utils/library'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../pages/assets/logo_web.png'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import app from "../base.js"

const BooksPage = ({ history }) => {

  let [textQuery, setTextQuery] = useState("")
  let [books, setBooks] = useState([])
  const [userOnline, setUserOnline] = useState([])
  const manage = new ManageUser()
  manage.allowAccess({history})
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setUserOnline(user)
    })
  })
  const NavBarStatus = () => {
    if (userOnline) {
      return [<Nav.Link href="/profile" key={3}> Profile </Nav.Link>,
      <Button variant="light" key={4} onClick={LogOut}>Log Out</Button>]
    }
    else {
      return [<Nav.Link href="/login" key={0}> Log In </Nav.Link>,
      <Nav.Link href="/signup" key={2}> Sign Up </Nav.Link>]
    }
  }

  const LogOut = (() => {
    manage.logOutUser({history})
});

  const onBookSelected = (bookId) => {
    history.push(`/book/${bookId}`)
  }

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
    })
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
        <div style={{ display: "flex", flexWrap: "wrap" }} >
          {books.map((book, index) => {
            return (
              <div style={{ margin: 40, width: 200 }} onClick={() => onBookSelected(book.id)}>
                <img style={{ width: 100, height: 200 }} src={book.imageLinks ? book.imageLinks.smallThumbnail : "Alt text"} />
                <p key={index} > < b > {book.title} </b> </p >
                <p> {book.subtitle} </p>
              </div >
            )
          })
          } </div>
      </div>
    </div>
  )
}

export default BooksPage

/*
 const onInsertUser = () => {
    const mongo = new Mongo()
    mongo.insertUser({
      firebaseId: "testId",
      name: "testName",
      email: "testEmail"
    }).then(result => {
      console.log({
        result
      })
    })
  }
*/