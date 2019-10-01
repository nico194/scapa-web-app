import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../atoms/button/Button';
import { getPatientsByTutor, unlinkPatient } from '../../../redux/actions/patients';
import config from '../../../config';
import './Pacients.css';

class Patients extends Component {
    constructor(props) {
        super(props);

        this.showPatientProfile = this.showPatientProfile.bind()
    }

    componentDidMount() {
        this.props.getPatientsByTutor(this.props.tutor.id)
    }

    unlinkPatient = (id) => {
        this.props.unlinkPatient(id);
    }

    showPatientProfile = id => {
        window.location.href= `${config.pathName}/patients/${id}`;
    }

    render() {
        const { patients } = this.props
        const listPatients = patients.map( patient => {
            return (
                <tr key={patient.id}>
                    <td>Image</td>
                    <td>{patient.name}</td>
                    <td>{config.getAge(patient.birthday)}</td>
                    <td><Button text='Ver Perfil' onClick={() => this.showPatientProfile(patient.id)}/></td>
                    <td><Button text='Desvincular' onClick={() => this.unlinkPatient(patient.id)}/></td>
                </tr>
            )
        })
        return (
            <div className='patients-component'>
                <p>Pacientes</p>
                <table className='patients-table'>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Edad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listPatients}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    patients: state.patients.patients,
    tutor: state.tutors.tutor
})

const mapDispatchToProps = dispatch => {
    return {
        getPatientsByTutor: id => dispatch(getPatientsByTutor(id)),
        unlinkPatient: id => dispatch(unlinkPatient(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Patients)
