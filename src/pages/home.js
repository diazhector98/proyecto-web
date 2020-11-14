import React from 'react'

//Agregar el logo
import logo from '../pages/assets/logo1.png'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import stylesheet from '../pages/assets/styleTable.css'
import {
  ReactiveBase,
  DataSearch,
  SingleRange,
  ResultCard
} from '@appbaseio/reactivesearch';


const homePage = () => {
    return (
        <div>
          <Navbar bg="light" variant="light">
            <Navbar.Brand href="/home">
              {/* 71 y 100 */}
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

            <DataSearch
              componentId="mainSearch"
              dataField={["original_title", "original_title.search", "authors", "authors.search"]}
              queryFormat="and"
              iconPosition="left"
            />
            <SingleRange
              componentId="ratingsFilter"
              dataField="average_rating"
              title="Book Ratings"
              data={[
                { start: 4, end: 5, label: "★★★★ & up" },
                { start: 3, end: 5, label: "★★★ & up" },
                { start: 2, end: 5, label: "★★ & up" },
                { start: 1, end: 5, label: "★ & up" },
              ]}
              react={{
                and: "mainSearch"
              }}
            />
            <ResultCard
              componentId="results"
              dataField="original_title"
              react={{
                "and": ["mainSearch", "ratingsFilter"]
              }}
              onData={(res)=>({
                "image": res.image,
                "title": res.original_title,
                "description":  res.average_rating + " ★ "
              })}
            />
      </div>
    )
}

export default homePage
