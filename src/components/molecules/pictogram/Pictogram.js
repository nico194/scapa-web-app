import React from 'react';
import config from '../../../config';
import './Pictogram.css';

const Pictogram = (props) => {
    const {image , description} = props
    return (
        <div className='pictogram-component'>
            <img src={image ? image : config.image} alt={description} />
            <span>{description}</span>
        </div>
    )
}

export default Pictogram
