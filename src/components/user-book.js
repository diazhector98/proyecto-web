import React from 'react'

const UserBook = ({book}) => {
    const {title, imageLink} = book
    console.log({book})
    return (
        <div>
            <img src={imageLink}/>
            <h1>{title}</h1>
        </div>
    )
}

export default UserBook