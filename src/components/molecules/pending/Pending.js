import React from 'react'
import Pictogram from '../pictogram/Pictogram';

const Pending = (props) => {
    const { image, namePatient, namePictogram } = props
    return (
        <div className='pending-component'>
            <Pictogram image={image} description={namePictogram}/>
            <label>{namePatient}</label>
        </div>
    )
}

export default Pending
