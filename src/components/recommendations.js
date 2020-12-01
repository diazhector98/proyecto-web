import React, {useState, useEffect} from 'react'
import Library from '../utils/library'

const Recommendations = ({bookIds}) => {
    console.log({bookIds})

    useEffect(() => {
        const library = new Library()
        console.log("Using effect")
        library.getBooksWithIds({bookIds: bookIds.recommendedBookIds}).then((result) => {
            console.log({result})
        })
    }, [])
    return (
        <div>
            <h3> Recomendaciones basadas en usuarios que han leído los mismos libros</h3>
        </div>
    )
}

export default Recommendations
