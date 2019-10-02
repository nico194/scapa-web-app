import React from 'react';
import './Checkbox.css';

const Checkbox = (props) => {
    const { text, onChange, checked } = props
    console.log(props)
    return (
        <div>
            <p>{text}</p>
            <label className="switch">
                <input type="checkbox" onChange={onChange} checked={checked}/>
                <span class="slider round"></span>
            </label>
        </div>
        
    )
}

export default Checkbox;
