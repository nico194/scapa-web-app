import React from 'react'

const TextField = (props) => {
    const { text, placeholder , onChange, id } = props;
    return (
        <div>
            <label>{text}</label>
            <input type='text' id={id} onChange={onChange} placeholder={placeholder} />
        </div>
    )
}

export default TextField
