import React, {useState} from 'react'
import Mongo from '../utils/mongo'
import Library from '../utils/library'

const Test = () => {

    let [textQuery, setTextQuery] = useState("")
    let [books, setBooks] = useState([])

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

    const searchBooks = () => {
        const library = new Library()
        library.searchBooks({
            textQuery
        }).then(result => {
            console.log({result})
            const {books} = result.data
            setBooks(books)
        })
    }

    return (
        <div>
            <div>
                <button onClick={onInsertUser}>Insert User</button>
            </div>

            <div>
                <input type="text" placeholder="Search Book" onChange={(e) =>setTextQuery(e.target.value)}/>
                <button onClick={searchBooks}>Search</button>

                <div>
                    {
                        books.map((book, index) => {
                            return <p key={index}>{book.title}</p>
                        })
                    }
                </div>
            </div>
            
        </div>
    )
}

export default Test