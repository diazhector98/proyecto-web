
import React, { useCallback, useEffect } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

const LandingPage = ({ history }) => {

    const createAccountButtonClicked = () => {
        history.push("/signup");
    }
    
    return (
        <div>
            <Jumbotron>
                <h1>Libros Tec</h1>
                <p>
                    Mejora tus hábitos de lectura teniendo la mejor herramienta para registrar y buscar libros.
                </p>
                <p>
                    <Button variant="primary" onClick={createAccountButtonClicked} >Crear Cuenta</Button>
                </p>
            </Jumbotron>
        </div>

    )
}

export default LandingPage;