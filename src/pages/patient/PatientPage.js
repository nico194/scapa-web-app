import React, { Component } from 'react'
import Patient from '../../components/molecules/patient/Patient'

class PatientPage extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className='patient-page'>
                <Patient id={match.params.id} />
            </div>
        )
    }
}

export default PatientPage
