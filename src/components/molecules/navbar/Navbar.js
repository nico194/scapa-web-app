import React, { Component } from 'react'
import Image from '../../atoms/image/Image';
import Link from '../../atoms/link/Link';
import Logo from '../../../public/logo/logo-desktop.jpg';
import Portada from '../../../public/portada/portada-desktop.jpg'
import './Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div className='navbar-component'>
                <Image className='portada' src={Portada} alt='portada'/>
                <div className="nav">
                    <div className="left-content">
                        <Image className='logo' src={Logo} alt='logo'/>
                        <ul className='links'>
                            <li><Link goTo='/' text='SCAPA'/></li>
                        </ul>
                    </div>
                    <div className="right-content">
                        <ul className='links'>
                            <li><Link goTo='/signin' text='Sign In'/></li>
                            <li><Link goTo='/signup' text='Sign Up'/></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;
