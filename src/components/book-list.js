import React from 'react'

const BookList = ({title, books}) => {
    return (
        <div>
            <h1>{title}</h1>
            {books ? books.forEach(book => {
                return (
                    <div>
                        {book.title}
                    </div>
                )
            }) : null}
        </div>
    )
}

export default BookList