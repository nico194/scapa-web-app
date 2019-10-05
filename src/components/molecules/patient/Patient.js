import React, { Component } from 'react'
import { connect } from 'react-redux';
import config from '../../../config';
import Categories from '../../organisms/categories/Categories';
import { getCategoriesByPatient } from '../../../redux/actions/categories';
import { getPatientById, changeVoiceAssistant } from '../../../redux/actions/patients';
import './Patient.css';
import Checkbox from '../../atoms/checkbox/Checkbox';
import Button from '../../atoms/button/Button';

class Patient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: false,
            routines: false
        }
    }

    componentDidMount(){
        const { id } = this.props;
        this.props.getPatientById(id);
    }

    changeVoiceAssistant = patient => {
        patient.voice = !patient.voice;
        this.props.changeVoiceAssistant(patient);
    }

    render() {
        const { patient, loading, loadingVoice, loadingCategories } = this.props;
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
                        {loadingVoice ?
                            <p>Cargando...</p>
                            :
                            <Checkbox text='Asistente de Voz: ' onChange={() => this.changeVoiceAssistant(patient)} checked={patient.voice}/>
                        }
                    </div>
                }
                <div className="categories-routines-patient">
                    <div className="buttons">
                        <Button text='Categorias Asignadas' onClick={()=>{}} />
                        <Button text='Rutinas Asignadas' onClick={()=>{}} />
                    </div>
                    {loadingCategories ?
                        <p>Cargando...</p>
                        :
                        ''
                    }
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('patient', state.patients.patient)
    return {
        patient: state.patients.patient,
        loading: state.patients.loading,
        loadingVoice: state.patients.loadingVoice,
        loadingCategories: state.categories.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCategoriesByPatient: id => dispatch(getCategoriesByPatient(id)),
        getPatientById: id => dispatch(getPatientById(id)),
        changeVoiceAssistant : patient => dispatch(changeVoiceAssistant(patient))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Patient)
