import React, { Component } from 'react'
import { connect } from 'react-redux';
import config from '../../../config';
import { getCategoriesByPatient, getCategories, addCategoriesToFolder } from '../../../redux/actions/categories';
import { getPatientById, changeVoiceAssistant } from '../../../redux/actions/patients';
import './Patient.css';
import Checkbox from '../../atoms/checkbox/Checkbox';
import Button from '../../atoms/button/Button';
import Modal from '../modal/Modal';
import Categories from '../../organisms/categories/Categories';

class Patient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cat: false,
            rout: false,
            showModal: false,
            categoriesSelected: []
        }

        this.closeModal = this.closeModal.bind()
    }

    componentDidMount(){
        const { id } = this.props;
        this.props.getPatientById(id);
        this.props.getCategoriesByPatient(id);
    }

    changeVoiceAssistant = patient => {
        patient.voice = !patient.voice;
        this.props.changeVoiceAssistant(patient);
    }

    showCategories = () => {
        this.props.getCategories();
        this.setState({ showModal : true });
    }

    selectCategory = id => {
        const { categoriesSelected } = this.state;
        const exits = categoriesSelected.findIndex(idCategory => idCategory === id);
        exits === -1 ? categoriesSelected.push(id) : categoriesSelected.splice(exits, 1);
        console.log('categories selected: ', categoriesSelected);
    }

    addCategoriesToFolder = () =>{
        this.props.addCategoriesToFolder(this.props.id, this.state.categoriesSelected);
        this.setState({ showModal: false });
    }

    closeModal = () => {
        this.setState({ showModal: false });
    }

    render() {
        const { showModal } = this.state;
        const { patient, loading, loadingVoice, loadingCategories, categories, patientCategories } = this.props;
        const listCategories = categories.map(category => {
            return <li key={category.id}><input type='checkbox' onChange={() => this.selectCategory(category.id)}/>{category.description}</li>
        })
        return (
            <div className='patient-component'>
                <Modal show={showModal} closeModal={this.closeModal} functionModal={this.addCategoriesToFolder}>
                    <h2>Seleccione las categorias que desea agregar:</h2>
                    <ul>
                        {loadingCategories ?
                            <p>Cargando...</p>
                            :
                            listCategories
                        }
                    </ul>
                </Modal>
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
                        <Button text='Categorias Asignadas' onClick={this.getCategoriesByPatient} />
                        <Button text='Rutinas Asignadas' onClick={()=>{}} />
                    </div>
                    {patientCategories.length === 0 ?
                        <p>No hay categorias asignadas</p>
                        :
                        showModal ? 
                            <p>Asignando una categoria...</p>
                            :
                            <Categories list={true} patient={patient} />
                    }
                    <Button text='Asignar categoria' onClick={this.showCategories} />
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('redux', state)
    return {
        patient: state.patients.patient,
        loading: state.patients.loading,
        loadingVoice: state.patients.loadingVoice,
        loadingCategories: state.categories.loading,
        categories: state.categories.categories,
        patientCategories: state.categories.patientCategories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCategories: () => dispatch(getCategories()),
        getCategoriesByPatient: id => dispatch(getCategoriesByPatient(id)),
        addCategoriesToFolder: (id, categories) => dispatch(addCategoriesToFolder(id, categories)),
        getPatientById: id => dispatch(getPatientById(id)),
        changeVoiceAssistant : patient => dispatch(changeVoiceAssistant(patient))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Patient)
