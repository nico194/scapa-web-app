import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SignIn.scss';
import { signIn } from '../../redux/actions/users'
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
        this.props.signIn(this.state);
    }

    render() {
        const { loading, user } = this.props;
        const signIn = user.type_user;
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
                    {signIn === 'admin' ?
                        <Redirect to='/categories' />
                        :
                        signIn === 'tutor' && <Redirect to='/patients' />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
        loading: state.users.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: tutor => dispatch(signIn(tutor)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
