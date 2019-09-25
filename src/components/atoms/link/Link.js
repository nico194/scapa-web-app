import React from 'react';
import { Link } from 'react-router-dom';
import './Links.css';

const link = (props) => {
    const {text, goTo} = props;
    return (
        <Link className='link' to={goTo}>{text}</Link> 
    )
}

export default link;
