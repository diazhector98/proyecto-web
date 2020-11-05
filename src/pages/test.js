import React from 'react'
import Mongo from '../utils/mongo'

const test = () => {
    const onInsertUser = () => {
        const mongo = new Mongo()
        mongo.insertUser({
            firebaseId: "testId",
            name: "testName",
            email: "testEmail"
        }).then(result => {
            console.log({result})
        })
    }
    return (
        <div>
            <button onClick={onInsertUser}>Insert User</button>
        </div>
    )
}

export default test