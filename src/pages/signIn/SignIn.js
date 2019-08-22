import React, { Component } from 'react'
import './SignIn.css'
import TextField from '../../components/atoms/textfield/TextField';
import Button from '../../components/atoms/button/Button';
class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            signIn: false
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
        fetch("http://10.170.10.50:8000/tutors/signIn", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                }
            )
            .then( response => {
                response.ok ? this.setState({signIn: true}) : console.log('error')
            })
            .catch( err => {throw err;});

    }

    render() {
        const { signIn } = this.state;
        return (
            <div className="sign-in-component">
                <h1>SignIn</h1>
                <TextField text='Email' onChange={(e) => {this.onChangeTextField(e, 'email')}} placeholder='Ingrese su email...'/>
                <TextField text='Password' onChange={(e) => {this.onChangeTextField(e, 'password')}} placeholder='Ingrese su password...'/>
                <Button text='Ingresar' onClick={this.onClickLogin}/>
                {signIn && 
                    <h2>Login Exitoso!</h2>
                }
            </div>
        )
    }
}

export default SignIn
