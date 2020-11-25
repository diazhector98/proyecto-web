import React, { useCallback, useContext } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import app from "../base.js"
import { AuthContext } from "../Auth.js"
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import logo from '../pages/assets/logo1.png'
import stylesheet from '../pages/assets/useraccess.css'


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

      <div class="container">
        <h1>Log in</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              Email
                <input name="email" type="email" placeholder="Email" required />
            </label>
          </div>
          <div>
            <label>
              Password
                <input name="password" type="password" placeholder="Password" required />
            </label>
<<<<<<< HEAD
          </div>
          <div>
            <Button type="submit">Log in</Button>
          </div>
=======
            </div>
            <div>

            <Button type = "submit">Log in</Button>
            </div>
>>>>>>> d74c03cc9a2aeeb3c169717abb874908b1a3c38d
        </form>
      </div>

    </div>
  );
};


export default withRouter(Login)