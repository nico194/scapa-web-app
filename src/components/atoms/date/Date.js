import React from 'react'

const date = (props) => {
    const { text, onChange } = props;
    return (
        <div>
            {text} <input type="date" onChange={onChange} />
        </div>
    )
}

export default date
