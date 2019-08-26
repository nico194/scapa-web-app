import React, { Component } from 'react'
import Image from '../../atoms/image/Image';
import Link from '../../atoms/link/Link';
import Logo from '../../../public/logo/logo-desktop.jpg';
import Portada from '../../../public/portada/portada-desktop.jpg'
import './Navbar.css';

class Navbar extends Component {
    render() {
        const { leftLinks, rightLinks } = this.props;

        const linkLeft = leftLinks.map((link, index) => {
            return <li><Link key={index} goTo={link.goTo} text={link.text} /></li>
        }) 
        const linkRight = rightLinks.map((link, index) => {
            return <li><Link key={index} goTo={link.goTo} text={link.text} /></li>
        })

        return (
            <div className='navbar-component'>
                <Image className='portada' src={Portada} alt='portada'/>
                <div className="nav">
                    <div className="left-content">
                        <Image className='logo' src={Logo} alt='logo'/>
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
