import React, { Component } from 'react';
import config from '../../config';
import TextField from '../../components/atoms/textfield/TextField';
import Button from '../../components/atoms/button/Button';
import './SignUp.css';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            signUp: false,
            loading: false
        }
        this.onChangeTextField = this.onChangeTextField.bind();
        this.onClickLogin = this.onClickLogin.bind();
    }

    onChangeTextField = (e, field) => {
        this.setState({ [field] : e.target.value })
    }

    onClickLogin = () => {
        this.setState({loading: true});
        const user = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
        };
        fetch(`${config.ip}/tutors/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                }
            )
            .then( response => {
                response.ok ? this.setState({signUp: true}) : console.log('error')
            })
            .catch( err => {throw err;});

    }

    render() {
        const { signUp, loading } = this.state;
        return (
            <div className="sign-up-component">
                <div className="wrapper-sign-up">
                    <h1>SignUp</h1>
                    <TextField label='Email: ' onChange={(e) => {this.onChangeTextField(e, 'email')}} placeholder='Ingrese su email...'/>
                    <br/>
                    <TextField label='Password: ' onChange={(e) => {this.onChangeTextField(e, 'password')}} placeholder='Ingrese su password...'/>
                    <br/>
                    <TextField label='Nombre: ' onChange={(e) => {this.onChangeTextField(e, 'name')}} placeholder='Ingrese su nombre...'/>
                    <br/>
                    <Button text='Registrarse' onClick={this.onClickLogin}/>
                    {loading && 
                        <h2>Cargando...</h2>
                    }
                    {signUp && 
                        <h2>SignUp Exitoso!</h2>
                    }
                </div>
            </div>
        )
    }
}

export default SignUp