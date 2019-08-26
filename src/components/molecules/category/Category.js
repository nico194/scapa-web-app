import React from 'react'
import Button from '../../atoms/button/Button';

const Category = (props) => {
    const {description, onClick, list} = props
    return (
        <div className='category-component'>
            <span className={list? 'list' : 'button'}><Button text={description} onClick={onClick} /></span>
        </div>
    )
}

export default Category
