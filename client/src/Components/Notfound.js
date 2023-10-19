import React from 'react'
import image from '../error.webp'


export default function Notfound() {
    return (
        <div className='center'>
            <h2>404 Not Found</h2>
            <img src={image} alt="Girl in a jacket" width="500" height="600" />
        </div>
    )
}
