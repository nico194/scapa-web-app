import React from 'react';
import config from '../../../config';
import './Pictogram.css';

const Pictogram = (props) => {
    const {image , description, onClick} = props;
    return (
        <div className='pictogram-component'>
            <img src={image ? `${config.server}/${image}` : config.image} alt={description} onClick={onClick}/>
            <span>{description}</span>
        </div>
    )
}

export default Pictogram
