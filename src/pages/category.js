import React from 'react'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
//Agregar el logo
import logo from '../pages/assets/logo1.png'

const categoryPage = () => {
    return (
        <div>
   
   <Navbar bg="light" variant="light">
    <Navbar.Brand href="/home">
      
    <img src={logo} alt="Logo" height = "61px" width = "90" />
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
        </div>
    )
}

export default categoryPage
