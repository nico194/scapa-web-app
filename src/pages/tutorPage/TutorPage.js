import React, { Component } from 'react';
import Navbar from '../../components/molecules/navbar/Navbar';

class TutorPage extends Component {
    render() {
        const linksLeft = [
            {
                goTo: '#',
                text: 'Pacientes'
            },
            {
                goTo: '#',
                text: 'Rutinas'
            },
            {
                goTo: '#',
                text: 'Solicitudes Pendientes'
            }
        ]

        const linksRight = [
            {
                goTo: '#',
                text: 'Nombre Tutor'
            },
            {
                goTo: '#',
                text: 'Salir'
            }
        ]

        return (
            <div className="tutor-page">
                <Navbar leftLinks={linksLeft} rightLinks={linksRight}/>
            </div>
        )
    }
}

export default TutorPage;
