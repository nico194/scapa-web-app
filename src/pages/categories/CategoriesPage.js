import React, { Component } from 'react'
import Navbar from '../../components/molecules/navbar/Navbar';
import config from '../../config';

export default class AdminPage extends Component {
    render() {
        const { adminNavbarLeft, adminNavbarRight} = config
        return (
            <div className='admin-page'>
                <Navbar leftLinks={adminNavbarLeft} rightLinks={adminNavbarRight} admin={false} />
                
            </div>
        )
    }
}
