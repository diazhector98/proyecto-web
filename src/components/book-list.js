import React from 'react'

const BookList = ({title, books}) => {
    return (
        <div>
            <h1>{title}</h1>
            {books ? books.map(book => {
                return (
                    <div>
                        <p>{book.title}</p>
                    </div>
                )
            }) : null}
        </div>
    )
}

export default BookList