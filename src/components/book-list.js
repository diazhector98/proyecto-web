import React from 'react'
import UserBook from './user-book'

const BookList = ({title, books}) => {
    return (
        <div>
            <h1>{title}</h1>
            {books ? books.map(book => {
                return (<UserBook book={book}/>)
            }) : null}
        </div>
    )
}

export default BookList