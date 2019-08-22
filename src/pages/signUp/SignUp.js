import React, { Component } from 'react';
import TextField from '../../components/atoms/textfield/TextField';
import Button from '../../components/atoms/button/Button';
import './SignUp.css';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            signUp: false
        }
        this.onChangeTextField = this.onChangeTextField.bind();
        this.onClickLogin = this.onClickLogin.bind();
    }

    onChangeTextField = (e, field) => {
        console.log(`${field}: ${e.target.value}`)
        this.setState({ [field] : e.target.value })
    }

    onClickLogin = () => {
        

    }

    render() {
        const { signUp } = this.state;
        return (
            <div className="sign-up-component">
                <h1>SignUp</h1>
                <TextField text='Email' onChange={(e) => {this.onChangeTextField(e, 'email')}} placeholder='Ingrese su email...'/>
                <TextField text='Password' onChange={(e) => {this.onChangeTextField(e, 'password')}} placeholder='Ingrese su password...'/>
                <TextField text='Nombre' onChange={(e) => {this.onChangeTextField(e, 'password')}} placeholder='Ingrese su nombre...'/>
                <Button text='Registrarse' onClick={this.onClickLogin}/>
                {signUp && 
                    <h2>SignUp Exitoso!</h2>
                }
            </div>
        )
    }
}

export default SignUp