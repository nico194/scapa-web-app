import React, { Component } from 'react'
import Navbar from '../../components/molecules/navbar/Navbar';
import config from '../../config';
import Categories from '../../components/organisms/categories/Categories';
import './CategoriesPage.css';

export default class CategoriesPage extends Component {
    render() {
        const { adminNavbarLeft, adminNavbarRight} = config
        return (
            <div className='categories-page'>
                <Navbar leftLinks={adminNavbarLeft} rightLinks={adminNavbarRight} admin={false} />
                <Categories />
            </div>
        )
    }
}
