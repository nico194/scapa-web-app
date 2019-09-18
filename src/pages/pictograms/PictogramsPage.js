import React, { Component } from 'react'
import Navbar from '../../components/molecules/navbar/Navbar';
import config from '../../config';
import Pictograms from '../../components/organisms/pictograms/Pictograms';
import './PictogramsPage.css';

export default class PictogramsPage extends Component {
    render() {
        const { adminNavbarLeft, adminNavbarRight} = config
        return (
            <div className='pictograms-page'>
                <Navbar leftLinks={adminNavbarLeft} rightLinks={adminNavbarRight} admin={false} />
                <Pictograms />
            </div>
        )
    }
}
