import React, { Component } from 'react'
import Routines from '../../components/organisms/routines/Routines';
import Navbar from '../../components/molecules/navbar/Navbar';
import config from '../../config';

class RoutinesPage extends Component {
    render() {
        const { tutorNavbarLeft, tutorNavbarRight } = config;
        return (
            <div className="routines-page">
                <Navbar leftLinks={tutorNavbarLeft} rightLinks={tutorNavbarRight}/>
                <Routines />
            </div>
        )
    }
}

export default RoutinesPage
