import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pictograms from '../pictograms/Pictograms';
import Pictogram from '../../molecules/pictogram/Pictogram';
import Modal from '../../molecules/modal'
import { unselectPictogramToPhrase } from '../../../redux/actions/pictograms';
import { sendRoutine } from '../../../redux/actions/routines'
import './Routines.scss';
import Button from '../../atoms/button/Button';

class Routines extends Component {

    unselectPictogram = index => {
        this.props.unselectPictogramToPhrase(index);
    }

    sendRoutine = () => {
        const pictograms = []
        this.props.pictogramsSelected.forEach(pictogram => {
            pictograms.push(pictogram.id);
        });
        this.props.sendRoutine(this.props.idPatient, pictograms);
    }

    render() {
        const { pictogramsSelected, send } = this.props;
        const phrase = pictogramsSelected && pictogramsSelected !== undefined ? pictogramsSelected.map( (pictogram, index) => {
            return ( 
                <div key={index} className="pictogram">
                    <Pictogram description={pictogram.description} image={pictogram.image} onClick={()=> this.unselectPictogram(index)} />
                </div>
            )
        }) : console.log('error pictograms selected')
        return (
            <div className='routines-component'>
                {send &&
                    <Modal>
                        <h3>Se envio la rutina con exito!</h3>
                        <Button text='Aceptar' onClick={this.acceptRoutine} />
                    </Modal>
                }
                <p>Rutinas</p>
                <Pictograms routines={true}/>
                <div className="pictograms-selected">
                    <p>Rutina:</p>
                    <div className="pictograms-list">
                        {phrase}
                    </div>
                </div>
                <Button text='Enviar Rutina' onClick={this.sendRoutine} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pictogramsSelected: state.pictograms.pictogramsSelected,
        send: state.routines.send,
    }
}

const mapDispatchToPros = dispatch => {
    return {
        unselectPictogramToPhrase: index => dispatch(unselectPictogramToPhrase(index)),
        sendRoutine: (idPatient, pictograms) =>dispatch(sendRoutine(idPatient, pictograms)),
    }
}

export default connect(mapStateToProps, mapDispatchToPros)(Routines)
