import React from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const booksPage = () => {
    return (
        <div>
   
   <Navbar bg="light" variant="light">
    <Navbar.Brand href="#home">Logo</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Categorias</Nav.Link>
      <Nav.Link href="#pricing">Mis libros</Nav.Link>
    </Nav>
    <Form inline>
      <Form.Control type="text" placeholder="Busca un libro" className="mr-sm-2" />
      <Button variant="outline-primary">Buscar</Button>
    </Form>
  </Navbar>
        </div>
    )
}

export default booksPage
