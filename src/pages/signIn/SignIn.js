import React, { Component } from 'react';
import './SignIn.css';
import config from '../../config';
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
            signInAdmin: false,
            signInTutor: false,
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
        fetch(`${config.ip}/tutors/signIn`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                }
            )
            .then( response => { return response.json()})
            .then( data => {
                if(data.token){
                    if(this.state.email === 'admin'){
                        this.setState({ loading: false, signInAdmin: true});
                    } else {
                        this.setState({ loading: false, signInTutor: true});
                    }
                }  
            })
            .catch( err => { throw err; });

    }

    render() {
        const { loading, signInAdmin, signInTutor } = this.state;
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
                        <Redirect to='/menu' />
                    }
                </div>
            </div>
        )
    }
}

export default SignIn
