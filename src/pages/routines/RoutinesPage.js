import React, { Component } from 'react'
import Navbar from '../../components/molecules/navbar/Navbar';
import config from '../../config';

class RoutinesPage extends Component {
    render() {
        const { tutorNavbarLeft, tutorNavbarRight } = config;
        return (
            <div className="routines-page">
                <Navbar leftLinks={tutorNavbarLeft} rightLinks={tutorNavbarRight}/>
                <h1>Routines Page</h1>
            </div>
        )
    }
}

export default RoutinesPage
