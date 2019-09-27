import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SignIn.css';
import { signIn } from '../../redux/actions/tutors'
import TextField from '../../components/atoms/textfield/TextField';
import Button from '../../components/atoms/button/Button';
import Link from '../../components/atoms/link/Link';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
        this.onChangeTextField = this.onChangeTextField.bind();
    }

    onChangeTextField = (e, field) => {
        this.setState({ [field] : e.target.value })
    }

    onClickLogin = () => {
        const tutor = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.signIn(tutor);
    }

    render() {
        const { loading, signInAdmin, signInTutor } = this.props;

        return (
            <div className="sign-in-page">
                <div className="wrapper-sign-in">
                    <h1>SignIn</h1>
                    <TextField label='Email: ' onChange={(e) => {this.onChangeTextField(e, 'email')}} placeholder='Ingrese su email...'/>
                    <br/>
                    <TextField label='Password: ' onChange={(e) => {this.onChangeTextField(e, 'password')}} placeholder='Ingrese su password...'/>
                    <br/>
                    <Button text='Ingresar' onClick={this.onClickLogin}/>
                    <br/>
                    <span> No tienes cuenta <Link text='Resgistrate aquí' goTo='/signup'/></span>
                    {loading && 
                        <h2>Cargando...</h2>
                    }
                    {signInAdmin &&
                        <Redirect to='/categories' />
                    }
                    {signInTutor &&
                        <Redirect to='/patients' />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        signInAdmin: state.tutors.signInAdmin,
        signInTutor: state.tutors.signInTutor,
        loading: state.tutors.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: tutor => dispatch(signIn(tutor)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
