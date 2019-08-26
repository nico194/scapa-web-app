import React, { Component } from 'react'
import './SignIn.css'
import TextField from '../../components/atoms/textfield/TextField';
import Button from '../../components/atoms/button/Button';
import Link from '../../components/atoms/link/Link';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            signIn: false,
            loading: false
        }
        this.onChangeTextField = this.onChangeTextField.bind();
        this.onClickLogin = this.onClickLogin.bind();
    }

    onChangeTextField = (e, field) => {
        this.setState({ [field] : e.target.value })
    }

    onClickLogin = () => {
        this.setState({loading: true})
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
                response.ok ? this.setState({loading: false, signIn: true}) : console.log('error')
            })
            .catch( err => {throw err;});

    }

    render() {
        const { signIn, loading } = this.state;
        return (
            <div className="sign-in-page">
                <div className="wrapper-sign-in">
                    <h1>SignIn</h1>
                    <TextField text='Email: ' onChange={(e) => {this.onChangeTextField(e, 'email')}} placeholder='Ingrese su email...'/>
                    <br/>
                    <TextField text='Password: ' onChange={(e) => {this.onChangeTextField(e, 'password')}} placeholder='Ingrese su password...'/>
                    <br/>
                    <Button text='Ingresar' onClick={this.onClickLogin}/>
                    <br/>
                    <span> No tienes cuenta <Link text='Resgistrate aquí' goTo='/signup'/></span>
                    {loading && 
                        <h2>Cargando...</h2>
                    }
                    {signIn && 
                        <Redirect to="/main" />
                    }
                </div>
            </div>
        )
    }
}

export default SignIn
