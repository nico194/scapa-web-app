import React from 'react'

const TextField = (props) => {
    const { text, placeholder , onChange } = props;
    return (
        <div>
            <label>{text}</label>
            <input type='text' onChange={onChange} placeholder={placeholder} />
        </div>
    )
}

export default TextField
