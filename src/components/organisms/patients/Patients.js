import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import Button from '../../atoms/button/Button';
import { getPatientsByTutor, unlinkPatient } from '../../../redux/actions/patients';
import config from '../../../config';
import './Patients.scss';

class Patients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            id: 0
        }
        this.showPatientProfile = this.showPatientProfile.bind()
    }

    componentDidMount() {
        this.props.getPatientsByTutor(this.props.user.id)
    }

    unlinkPatient = (id) => {
        this.props.unlinkPatient(id);
    }

    showPatientProfile = id => {
        this.setState({ redirect: true, id})
    }

    render() {
        const { redirect, id }= this.state
        const { patients, loading } = this.props
        const listPatients = patients !== undefined ? patients.map( patient => {
            return (
                <tr key={patient.id}>
                    <td>Image</td>
                    <td>{patient.name}</td>
                    <td>{config.getAge(patient.birthday)}</td>
                    <td><Button text='Ver Perfil' onClick={() => this.showPatientProfile(patient.id)}/></td>
                    <td><Button text='Desvincular' onClick={() => this.unlinkPatient(patient.id)}/></td>
                </tr>
            )
        }) : <h3>No hay Pacientes vinculados</h3>
        return (
            <div className='patients-component'>
                <p>Pacientes</p>
                {loading ?
                    <h2>Cargando...</h2>
                    :
                    (patients.length === 0 ?
                        <h3>No hay Pacientes vinculados</h3>
                        :
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
                    )                        
                }
                {redirect &&
                    <Redirect to={`/patients/${id}`} />
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    patients: state.patients.patients,
    patient: state.patients.patient,
    loading: state.patients.loading,
    user: state.users.user
})

const mapDispatchToProps = dispatch => {
    return {
        getPatientsByTutor: id => dispatch(getPatientsByTutor(id)),
        unlinkPatient: id => dispatch(unlinkPatient(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Patients)
