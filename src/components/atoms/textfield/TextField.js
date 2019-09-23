import React from 'react'

const TextField = (props) => {
    const { label, placeholder , onChange, id } = props;
    return (
        <div>
            <label>{label}</label>
            <input type='text' id={id} onChange={onChange} placeholder={placeholder} />
        </div>
    )
}

export default TextField
