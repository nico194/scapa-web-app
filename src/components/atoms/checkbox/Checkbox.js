import React from 'react';
import './Checkbox.css';

const Checkbox = (props) => {
    const { text, onChange, checked } = props
    const check = checked === null ? false : checked;
    console.log(props)
    return (
        <div className='checkbox-component'>
            <p>{text}</p>
            <label className="switch">
                <input type="checkbox" onChange={onChange} checked={check}/>
                <span className="slider round"></span>
            </label>
        </div>
        
    )
}

export default Checkbox;
