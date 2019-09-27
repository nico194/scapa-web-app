import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../../../redux/actions/tutors'
import Link from '../../atoms/link/Link';
import Logo from '../../../public/logo/logo-desktop.jpg';
import Portada from '../../../public/portada/portada-desktop.jpg'
import './Navbar.css';

class Navbar extends Component {

    logOut = () => {
        this.props.logOut();
    }

    render() {
        const { leftLinks, rightLinks, admin = true, tutor } = this.props;

        const nameTutor = Object.keys(tutor).length > 0 ? tutor.name : JSON.parse(localStorage.getItem('tutor')).name

        const linkLeft = leftLinks.map((link, index) => {
            return <li key={index}><Link goTo={link.goTo} text={link.text} /></li>
        }) 
        const linkRight = rightLinks !== undefined && rightLinks.map((link, index) => {
            return link.goTo === '/profile' ? <li key={index}><Link goTo={link.goTo} text={nameTutor !== '' ? nameTutor : link.text} /></li> : (link.goTo === '/signin' ? <li key={index}><Link goTo={nameTutor === 'admin' ? '/categories' : (nameTutor === 'tutor' ? '/patients' : link.goTo )} text={link.text} /></li> : <li key={index}><Link goTo={link.goTo} text={link.text} /></li> )
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
                            {window.location.pathname !== '/' &&
                                <li onClick={this.logOut}><Link goTo='/' text='Salir' /></li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        tutor: state.tutors.tutor
    }
}

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(logOut())
})


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
