import React from 'react'

const Uploadfile = (props) => {
    const{ label, onChange } = props
    return (
        <div>
            <label>{label}</label>
            <input type="file" name="" onChange={onChange}/>
        </div>
    )
}

export default Uploadfile
