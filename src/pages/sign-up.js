import React from 'react'

import Button from 'react-bootstrap/Button';

const SignUpPage = () => {
    return (
        <div>

<input type="text" placeholder="Enter Username" name="uname" required/>
<input type="text" placeholder="Enter password" name="upassword" required/>
<Button>Sign up de bootstrap</Button>

        </div>
    )
}

export default SignUpPage