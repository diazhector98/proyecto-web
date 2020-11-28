import * as firebase from "firebase/app";
import { Button, Nav } from "react-bootstrap"

class UserNavBar {
    getNavBar = async ({ }) => {
        var user = firebase.auth().currentUser;
        if (user) {
            return [<Nav.Link href="/profile" key={3}> Profile </Nav.Link>,
            <Button variant="light" key={4}>Log Out</Button>]
        }
        else {
            return [<Nav.Link href="/login" key={0}> Log In </Nav.Link>,
            <Nav.Link href="/signup" key={2}> Sign Up </Nav.Link>]
        }
    }
}

export default UserNavBar