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
            name: '',
            signUp: false
        }
        this.onChangeTextField = this.onChangeTextField.bind();
        this.onClickLogin = this.onClickLogin.bind();
    }

    onChangeTextField = (e, field) => {
        this.setState({ [field] : e.target.value })
    }

    onClickLogin = () => {
        const user = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
        };
        console.log(JSON.stringify(user));
        fetch("http://10.170.10.50:8000/tutors/signup", {
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
        const { signUp } = this.state;
        return (
            <div className="sign-up-component">
                <h1>SignUp</h1>
                <TextField text='Email' onChange={(e) => {this.onChangeTextField(e, 'email')}} placeholder='Ingrese su email...'/>
                <TextField text='Password' onChange={(e) => {this.onChangeTextField(e, 'password')}} placeholder='Ingrese su password...'/>
                <TextField text='Nombre' onChange={(e) => {this.onChangeTextField(e, 'name')}} placeholder='Ingrese su nombre...'/>
                <Button text='Registrarse' onClick={this.onClickLogin}/>
                {signUp && 
                    <h2>SignUp Exitoso!</h2>
                }
            </div>
        )
    }
}

export default SignUp