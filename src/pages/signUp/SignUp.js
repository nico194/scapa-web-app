import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../redux/actions/users'
import TextField from '../../components/atoms/textfield/TextField';
import Button from '../../components/atoms/button/Button';
import Date from '../../components/atoms/date/Date';
import './SignUp.scss';
import Uploadfile from '../../components/atoms/uploadFile/Uploadfile';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            birthday: '',
            image: null,
            typeUser: ''
        }
        this.onChangeField = this.onChangeField.bind();
        this.onClickSignUp = this.onClickSignUp.bind();
    }

    onChangeField = (e, field) => {
        field === 'image' ? this.setState({ image: e.target.files[0]}) : this.setState({ [field] : e.target.value });
    }

    onClickSignUp = () => {
        this.props.signUp(this.state)
    }

    render() {
        const { loading, user } = this.props;
        const signIn = user.typeUser;

        return (
            <div className="sign-up-component">
                <div className="wrapper-sign-up">
                    <h1>SignUp</h1>
                    <TextField label='Nombre: ' onChange={(e) => {this.onChangeField(e, 'name')}} placeholder='Ingrese su nombre...'/>
                    <br/>
                    <Date text='Fecha de Nacimiento: ' onChange={(e) => {this.onChangeField(e, 'birthday')}}/>
                    <br/>
                    <TextField label='Email: ' onChange={(e) => {this.onChangeField(e, 'email')}} placeholder='Ingrese su email...'/>
                    <br/>
                    <TextField label='Password: ' onChange={(e) => {this.onChangeField(e, 'password')}} placeholder='Ingrese su password...'/>
                    <br/>
                    <Uploadfile label='Imagen: ' onChange={(e) => {this.onChangeField(e, 'image')}} />
                    <br/>
                    <Button text='Registrarse' onClick={this.onClickSignUp}/>
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
        signUp: tutor => dispatch(signUp(tutor)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)