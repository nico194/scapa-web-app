import React, { Component } from 'react';
import Navbar from '../../components/molecules/navbar/Navbar';

class Home extends Component {
    render() {
        const linksLeft = [
            {
                goTo: '/',
                text: 'SCAPA'
            }
        ]

        const linksRight = [
            {
                goTo: '/signin',
                text: 'Login'
            },
            {
                goTo: '/signup',
                text: 'Resistrarse'
            }
        ]

        return (
            <div className="home-page">
                <Navbar leftLinks={linksLeft} rightLinks={linksRight}/>
            </div>
        )
    }
}

export default Home;
