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

                <div style={{
                    display: "flex",
                    flexWrap: "wrap"
                }}>
                    {
                        books.map((book, index) => {
                            return (

                                <div style={{
                                    margin: 40,
                                    width: 200
                                }}>
                                    <img style={{
                                        width: 100,
                                        height: 200
                                    }}src={book.imageLinks ? book.imageLinks.smallThumbnail : ""} />
                                    <p key={index}><b>{book.title}</b></p>
                                    <p>{book.subtitle}</p>
                                </div>

                            
                            
                            )
                        })
                    }
                </div>
            </div>
            
        </div>
    )
}

export default Test