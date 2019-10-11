import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pictograms from '../pictograms/Pictograms';
import config from '../../../config';
import './Routines.css';

class Routines extends Component {
    render() {
        const { pictogramsSelected } = this.props;
        const phrase = pictogramsSelected && pictogramsSelected !== undefined ? pictogramsSelected.map( pictogram => {
            return Pi
        }) : console.log('error pictograms selected')
        return (
            <div className='routines-component'>
                <p>Rutinas</p>
                <div className="phrases">
                    <Pictograms routines={true}/>
                    <div className="pictograms-selected">
                        <p>Frase:</p>
                        {phrase}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pictogramsSelected: state.pictograms.pictogramsSelected,
    }
}

const mapDispatchToPros = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToPros)(Routines)
