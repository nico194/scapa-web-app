import React, { Component } from 'react';
import Navbar from '../../components/molecules/navbar/Navbar';
import config from '../../config';

class Home extends Component {
    render() {
        const { homeNavbarLeft , homeNavbarRight} = config;
        return (
            <div className="home-page">
                <Navbar leftLinks={homeNavbarLeft} rightLinks={homeNavbarRight}/>
            </div>
        )
    }
}

export default Home;
