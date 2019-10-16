import React, { Component } from 'react'
import Navbar from '../../components/molecules/navbar/Navbar';
import config from '../../config';

class PendingRequestPage extends Component {
    render() {
        const { tutorNavbarLeft, tutorNavbarRight } = config;
        return (
            <div className="pending-request-page">
                <Navbar leftLinks={tutorNavbarLeft} rightLinks={tutorNavbarRight}/>
            </div>
        )
    }
}

export default PendingRequestPage