import React from 'react'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Line, Circle } from 'rc-progress';

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


const UserBook = ({book}) => {
    const {
        title, 
        authors, 
        imageLink,
        currentPage,
        totalPages
    } = book

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
                        <p> {currentPage} / {totalPages} - {(currentPage / totalPages * 100).toString()} %</p>
                        <Line percent={(currentPage / totalPages * 100).toString()} strokeWidth="4" strokeColor="#2db7f5" />
                    </div> :
                    null
                    
                }
                
            </div>
            
        </Card>
    )
}

export default UserBook