import React, { useCallback} from 'react'
import { withRouter} from 'react-router-dom'
import app from "../base.js"
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import logo from '../pages/assets/logo1.png'
import '../pages/assets/useraccess.css'


const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/profile");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );


  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/home">
          {/* 71 y 100 */}
          <img src={logo} alt="Logo" height="61px" width="90" />

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

      <div className="container">
        <h1>Log in</h1>

          <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Email" required />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" required />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

      </div>

    </div>
  );
};


export default withRouter(Login)