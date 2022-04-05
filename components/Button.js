import React from 'react'

function Button({ handleClick , cta }) {

    return (
        <button className='button' onClick={handleClick} >{cta}</button>
    )
}
export default Button