import React, { Component } from 'react'
import { connect } from 'react-redux';
import config from '../../../config';
import Categories from '../../organisms/categories/Categories';
import { getCategoriesByPatient } from '../../../redux/actions/categories';
import { getPatientById } from '../../../redux/actions/patients';
import './Patient.css';
import Checkbox from '../../atoms/checkbox/Checkbox';

class Patient extends Component {

    componentDidMount(){
        const { id } = this.props;
        this.props.getPatientById(id)
    }

    render() {
        const { patient, loading } = this.props;
        console.log('props', this.props)
        return (
            <div className='patient-component'>
                {loading ?
                    <h3>Cargando...</h3>
                    :
                    <div className="patient">
                        <img src={patient.image ? `${config.server}/${patient.image}` : config.image} alt={patient.name}/>
                        <h2>{patient.name}</h2>
                        <p>Email: {patient.email}</p>
                        <p>Edad: {config.getAge(patient.birthday)}</p>
                        <Checkbox text='Asistente de Voz: ' onChange={() => {}} checked={patient.voice}/>
                    </div>
                }
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        patient: state.patients.patient,
        loading: state.patients.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCategoriesByPatient: id => dispatch(getCategoriesByPatient(id)),
        getPatientById: id => dispatch(getPatientById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Patient)
