import logo from '../pages/assets/logo_web.png'
import React, { useCallback, useEffect } from 'react';
import Background from '../pages/assets/LandingBackground.jpg'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'



var sectionStyle = {
    width: "100%",
    height: "1000px",
    backgroundImage: `url(${Background})`
};

var jumboStyle = {
    padding: "50px",
    width: "50%",
    opacity: 0.95,
    marginTop: "250px"
};

var container = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const LandingPage = ({ history }) => {

    const createAccountButtonClicked = () => {
        history.push("/signup");
    }
    const logInButtonPushed = () => {
        history.push("/login");
    }

    return (
        <div style={sectionStyle}>
            <div style={container}>
                <Jumbotron style={jumboStyle}>
                    <img src={logo} alt="Logo" height="120px" width="180px" />
                    <h1>Libros Tec</h1>
                    <p>
                        Mejora tus hábitos de lectura teniendo la mejor herramienta para registrar y buscar libros.
                </p>
                    <p>
                        <Button variant="primary" onClick={createAccountButtonClicked} >Crear Cuenta</Button>
                    </p>
                    <p>
                        Ya eres usario? Haz click <p style={{ color: 'blue' }} onClick={logInButtonPushed}> aquí </p>
                    </p>
                </Jumbotron>
            </div>
        </div>

    )
}

export default LandingPage;