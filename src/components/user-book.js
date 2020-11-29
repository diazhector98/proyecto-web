import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Line, Circle } from 'rc-progress';
import Button from 'react-bootstrap/Button'

const containerStyles = {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    boxShadow: "5px 10px 18px #888888"
}

const bookDetailsContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    margin: 10, 
    alignItems: 'flex-start',
    width: '100%'
}

const pageButtonsStyles = {
    marginLeft: 5,
    marginRight: 5,
}


const UserBook = ({book}) => {
    const {
        title, 
        authors, 
        imageLink,
    } = book

    const [currentPage, setCurrentPage] = useState(null)
    const [totalPages, setTotalPages] = useState(null)
    const [saveButtonEnabled, setSaveButtonEnabled] = useState(false)

    useEffect(() => {
        if (book.currentPage && book.totalPages) {
            setCurrentPage(book.currentPage)
            setTotalPages(book.totalPages)
        }
    }, [])

    const changeCurrentPage = (newCurrentPage) => {
        if (newCurrentPage > 0 && newCurrentPage < totalPages) {
            setCurrentPage(newCurrentPage)
            setSaveButtonEnabled(true)
        }
    }


    console.log({book})
    return (
        <Card style={containerStyles}>
            <img src={imageLink}/>
            <div style={bookDetailsContainerStyles}>
                <h3>{title}</h3>
                <h4>{authors.join(',')}</h4>
                {
                    currentPage && totalPages ?
                    <div style={{width: '100%'}}>
                        <div style={{display: 'flex', justifyItems: 'center'}}>
                            <p> {currentPage} / {totalPages} - {Math.round(currentPage / totalPages * 100).toString()} %</p>
                            <Button style={pageButtonsStyles} variant="light" onClick={() => changeCurrentPage(currentPage - 1)}> - </Button>
                            <Button style={pageButtonsStyles} variant="light" onClick={() => changeCurrentPage(currentPage + 1)}> + </Button>

                            {
                                saveButtonEnabled ? 
                                <Button style={pageButtonsStyles}  variant="light">Guardar</Button> :
                                null
                            
                            }
                        </div>
                        
                        <Line percent={(currentPage / totalPages * 100).toString()} strokeWidth="4" strokeColor="#2db7f5" />
                        

                    </div> :
                    null
                    
                }
                
            </div>
            
        </Card>
    )
}

export default UserBook