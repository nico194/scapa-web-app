import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pictograms from '../pictograms/Pictograms';
import Pictogram from '../../molecules/pictogram/Pictogram';
import { unselectPictogramToPhrase } from '../../../redux/actions/pictograms';
import './Routines.css';

class Routines extends Component {

    unselectPictogram = index => {
        this.props.unselectPictogramToPhrase(index);
    }

    render() {
        const { pictogramsSelected } = this.props;
        const phrase = pictogramsSelected && pictogramsSelected !== undefined ? pictogramsSelected.map( (pictogram, index) => {
            return ( 
                <div key={index} className="pictogram">
                    <Pictogram description={pictogram.description} image={pictogram.image} onClick={()=> this.unselectPictogram(index)} />
                </div>
            )
        }) : console.log('error pictograms selected')
        return (
            <div className='routines-component'>
                <p>Rutinas</p>
                <Pictograms routines={true}/>
                <div className="pictograms-selected">
                    <p>Rutina:</p>
                    <div className="pictograms-list">
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
        unselectPictogramToPhrase: index => dispatch(unselectPictogramToPhrase(index)),
    }
}

export default connect(mapStateToProps, mapDispatchToPros)(Routines)
