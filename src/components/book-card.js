import React from 'react'
import Card from 'react-bootstrap/Card'
import ReactStars from "react-rating-stars-component";

const BookCard = ({book, onBookSelected}) => {
    return (
        <Card 
            style={
                { 
                    boxShadow: '5px 5px 5px #888888', 
                    margin: 40,
                    width: 300,
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    padding: 10 
                }
            } 
            onClick={() => onBookSelected(book.id)}
        >
            <img 
                style={{ width: 120, height: 240 }} 
                src={book.imageLinks ? book.imageLinks.smallThumbnail : "Alt text"} 
            />
            <p style={{
                fontSize: 20,
                color: 'black',
                fontWeight: 'bold'
            }}>{book.title}</p >
            <p>{book.subtitle} </p>
            {book.averageRating !== 0 && book.averageRating !== undefined ? <ReactStars  isHalf={true} size={40} value={book.averageRating} count={5}/> : null}
        </Card >
    )
}

export default BookCard