import React, { Component } from 'react'
import Navbar from '../../components/molecules/navbar/Navbar';
import config from '../../config';
import Patients from '../../components/organisms/patients/Patients';

class PatientPage extends Component {
    render() {
        const { tutorNavbarLeft, tutorNavbarRight } = config;
        return (
            <div className="tutor-page">
                <Navbar leftLinks={tutorNavbarLeft} rightLinks={tutorNavbarRight}/>
                <Patients />
            </div>
        )
    }
}

export default PatientPage
