import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getCategoriesByPatient } from '../../../redux/actions/categories';

export class Patient extends Component {

    componentDidMount(){
        const { id } = this.props;
        this.props.getCategoriesByPatient(id);
    }

    render() {
        return (
            <div className='patient-component'>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        patient: state.patients.patient
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCategoriesByPatient: id => dispatch(getCategoriesByPatient(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Patient)
