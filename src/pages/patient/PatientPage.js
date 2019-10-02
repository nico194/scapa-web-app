import React, { Component } from 'react'
import Patient from '../../components/molecules/patient/Patient'
import Navbar from '../../components/molecules/navbar/Navbar';
import config from '../../config';

class PatientPage extends Component {
    render() {
        const { match } = this.props;
        const { tutorNavbarLeft, tutorNavbarRight } = config;
        return (
            <div className='patient-page'>
                <Navbar leftLinks={tutorNavbarLeft} rightLinks={tutorNavbarRight}/>
                <Patient id={match.params.id} />
            </div>
        )
    }
}

export default PatientPage
