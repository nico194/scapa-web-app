import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../atoms/button/Button';

class Patients extends Component {
    
    render() {
        const listPatients = patients.map( patient => {
            return (
                <tr key={patient.id}>
                    <td>Image</td>
                    <td>{patient.description}</td>
                    <td><Button text='Ver Perfil' onClick={() => this.deletePatient(patient.id)}/></td>
                    <td><Button text='Desvincular' onClick={() => this.deletePatient(patient.id)}/></td>
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
                        </tr>
                        <tr>
                            <th>Nombre</th>
                        </tr>
                        <tr>
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
    
})

const mapDispatchToProps = dispatch => {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Patients)
