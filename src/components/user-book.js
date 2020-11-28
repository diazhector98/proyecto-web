import React from 'react'


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
    alignItems: 'flex-start'
}


const UserBook = ({book}) => {
    const {title, authors, imageLink} = book
    return (
        <div style={containerStyles}>
            <img src={imageLink}/>
            <div style={bookDetailsContainerStyles}>
                <h3>{title}</h3>
                <h4>{authors.join(',')}</h4>
            </div>
            
        </div>
    )
}

export default UserBook