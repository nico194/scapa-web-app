import React from 'react'

const TextField = (props) => {
    const { text, onChange } = props;
    return (
        <div>
            <label>{text}</label>
            <input type='text' onChange={onChange} />
        </div>
    )
}

export default TextField
