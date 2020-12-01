import React from 'react'
import UserBook from './user-book'

const BookList = ({
    title, 
    books, 
    onUpdateBookCurrentPage, 
    showProgress,
    onFinishBookClicked,
    onMoreInfoClicked
}) => {
    return (
        <div>
            {books ? books.map((book, index) => {
                return (
                <UserBook 
                    key={index} 
                    book={book} 
                    onUpdateBookCurrentPage={onUpdateBookCurrentPage}
                    showProgress={showProgress}
                    onFinishBookClicked={onFinishBookClicked}
                    onMoreInfoClicked={onMoreInfoClicked}
                />)
            }) : null}
        </div>
    )
}

export default BookList