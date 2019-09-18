import React, { Component } from 'react'
import Link from '../../atoms/link/Link';
import Logo from '../../../public/logo/logo-desktop.jpg';
import Portada from '../../../public/portada/portada-desktop.jpg'
import './Navbar.css';

class Navbar extends Component {
    render() {
        const { leftLinks, rightLinks, admin = true } = this.props;

        const linkLeft = leftLinks.map((link, index) => {
            return <li key={index}><Link goTo={link.goTo} text={link.text} /></li>
        }) 
        const linkRight = rightLinks.map((link, index) => {
            return <li key={index}><Link goTo={link.goTo} text={link.text} /></li>
        })

        return (
            <div className='navbar-component'>
                { admin &&
                    <img className='portada' src={Portada} alt='portada'/>
                }
                <div className="nav">
                    <div className="left-content">
                        <img className='logo' src={Logo} alt='logo'/>
                        <ul className='links'>
                            {linkLeft}
                        </ul>
                    </div>
                    <div className="right-content">
                        <ul className='links'>
                            {linkRight}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;
