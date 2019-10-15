import React from 'react';
import './Checkbox.scss';

const Checkbox = (props) => {
    const { text, onChange, checked } = props
    const check = checked === null ? false : checked;
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
