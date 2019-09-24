import React from 'react'

const Button = (props) => {
    const { text, onClick, className } = props;
    return (
        <div className={className}>
            <button onClick={onClick}>{text}</button>
        </div>
    )
}

export default Button
