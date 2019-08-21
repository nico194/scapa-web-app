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
                    <Image className='logo' src={Logo} alt='logo'/>
                    <ul className='links'>
                        <li><Link goTo='/' text='Home'/></li>
                        <li><Link goTo='/signin' text='Sign In'/></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Navbar;
