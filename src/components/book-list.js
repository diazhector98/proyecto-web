import React from 'react'
import UserBook from './user-book'

const BookList = ({title, books, onUpdateBookCurrentPage, showProgress}) => {
    return (
        <div>
            <h1>{title}</h1>
            {books ? books.map((book, index) => {
                console.log({book})
                return (
                <UserBook 
                    key={index} 
                    book={book} 
                    onUpdateBookCurrentPage={onUpdateBookCurrentPage}
                    showProgress={showProgress}
                />)
            }) : null}
        </div>
    )
}

export default BookList