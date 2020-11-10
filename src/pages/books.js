import React, {
  useState
} from 'react'
import Mongo from '../utils/mongo'
import Library from '../utils/library'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../pages/assets/logo1.png'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const BooksPage = () => {

  let [textQuery, setTextQuery] = useState("")
  let [books, setBooks] = useState([])



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
    <Navbar bg = "light"
    variant = "light" >
    <Navbar.Brand href = "/home" >

    <img src = {
      logo
    }
    alt = "Logo"
    height = "61px"
    width = "90" / >
    </Navbar.Brand>

    <Nav className = "mr-auto" >
    <Nav.Link href = "/home" > Home </Nav.Link> 
    <Nav.Link href = "/category" > Categorias </Nav.Link> 
    <Nav.Link href = "/books" > Mis libros </Nav.Link> </Nav > 
    
    
      
    <Form inline >
     
    <Form.Control type = "text"
    placeholder = "Busca un libro"
    className = "mr-sm-2"
    onChange = {
      (e) => setTextQuery(e.target.value)
    }/> 
    
    <Button id ="buscarLibro" variant = "outline-primary" onClick = {
      searchBooks
    } > Search </Button>

   
    </Form > 



    </Navbar>

{/*  
    <div>

    <button onClick = {
      onInsertUser
    } > Insert User </button> 
    </div>
*/}
    <div>
   

    <div style = {
      {
        display: "flex",
        flexWrap: "wrap"
      }
    } > {
      books.map((book, index) => {
        return (

          <div style = {
            {
              margin: 40,
              width: 200
            }
          } >
          <img style = {
            {
              width: 100,
              height: 200
            }
          }
          src = {
            book.imageLinks ? book.imageLinks.smallThumbnail : ""
          }/> <p key = {
            index
          } > < b > {
            book.title
          } </b></p >
          <p> {
            book.subtitle
          } </p> </div >



        )
      })
    } </div> </div>

    </div>
  )
}

export default BooksPage