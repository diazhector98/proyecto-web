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
import BookCard from '../components/book-card'
import {
  useParams
} from "react-router-dom";
import queryString from 'query-string'


const BooksPage = ({ history, location }) => {
  let [textQuery, setTextQuery] = useState("")
  let [books, setBooks] = useState([])
  const [userOnline, setUserOnline] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const manage = new ManageUser()

  manage.allowAccess({history})
  useEffect(() => {
    const values = queryString.parse(location.search)
    console.log({values})
    app.auth().onAuthStateChanged((user) => {
      setUserOnline(user)
    })
    setTextQuery(values.query)
    searchBooks()
  }, [])
  const NavBarStatus = () => {
    if (userOnline) {
      return [<Nav.Link href="/profile" key={3}> Perfíl </Nav.Link>,
      <Button variant="light" key={4} onClick={LogOut}>Salir de Cuenta</Button>]
    }
    else {
      return [<Nav.Link href="/login" key={0}> Log In </Nav.Link>,
      <Nav.Link href="/signup" key={2}> Crear Cuenta </Nav.Link>]
    }
  }

  const LogOut = (() => {
    manage.logOutUser({history})
});

  const onBookSelected = (bookId) => {
    history.push(`/book/${bookId}`)
  }

  const searchBooks = () => {
    console.log({textQuery})
    if (!textQuery) {
      return
    } 
    const library = new Library()
    setIsLoading(true)
    history.push({
      pathname: '/books',
      search: '?query=' + textQuery
    })
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
      setIsLoading(false)
    })
  }

  const onKeyUp = (event) => {
    if (event.key === "Enter") {
      searchBooks()
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
          <Nav.Link href="/books" > Buscar Libros </Nav.Link>
        </Nav >

        <Form inline >
          <NavBarStatus />
        </Form >
      </Navbar>

      <div>
          <div style={{textAlign: 'left', padding: 50}}>

            <h1 style={{fontSize: 150, fontWeight: 'bolder', color: 'black'}}> Busca Un Libro </h1>
            <div style={{display: 'flex'}}>
              <Form.Control 
                type="text"
                placeholder="Harry Potter"
                className="mr-sm-2"
                onChange={
                  (e) => setTextQuery(e.target.value)
                }
                style={{
                  fontSize: 40
                }}
                onKeyPress={onKeyUp} 
                value={textQuery}
              />
              <Button 
                style={{width: 300}}
                id="buscarLibro" 
                variant="primary" 
                disabled={isLoading}
                onClick={searchBooks} > 
                {isLoading ? 'Cargando' : 'Buscar'} 
              </Button>
            </div>
            
            <div style={{ display: "flex", flexWrap: "wrap" }} >
              {books.map((book, index) => {
                return (
                  <BookCard book={book} onBookSelected={onBookSelected} />
                )
              })}
            </div>

          </div> 
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