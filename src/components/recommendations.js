import React, {useState, useEffect} from 'react'
import Library from '../utils/library'
import BookList from './book-list'

const Recommendations = ({bookIds}) => {
    console.log({bookIds})

    const [recommendedBooks, setRecommendedBooks] = useState([])


    useEffect(() => {
        const library = new Library()
        console.log("Using effect")
        library.getBooksWithIds({bookIds: bookIds.recommendedBookIds}).then((result) => {
            console.log({result})
            setRecommendedBooks(result.data)
        })
    }, [])
    return (
        <div>
            <h3> Recomendaciones basadas en usuarios que han leído los mismos libros</h3>
            <BookList 
                title="Libros Planeando Leer" 
                books={recommendedBooks} 
                onMoreInfoClicked={() => 2}
            />
        </div>
    )
}

export default Recommendations
