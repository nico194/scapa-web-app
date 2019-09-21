import React from 'react'

const Uploadfile = (props) => {
    const{ label, placeholder } = props
    return (
        <div>
            <label>{label}</label>
            <input type="file" name="" id="" placeholder={placeholder}/>
        </div>
    )
}

export default Uploadfile
