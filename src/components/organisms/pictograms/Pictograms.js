import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPictograms, addPictogram, deletePictogram, updatePictogram, selectPictogramToPhrase } from '../../../redux/actions/pictograms'
import { getCategories } from '../../../redux/actions/categories'
import Pictogram from '../../molecules/pictogram/Pictogram';
import Button from '../../atoms/button/Button';
import TextField from '../../atoms/textfield/TextField';
import Uploadfile from '../../atoms/uploadFile/Uploadfile';
import Dropdown from '../../atoms/dropdown/Dropdown';
import './Pictograms.scss';
import Categories from '../categories/Categories';

class Pictograms extends Component {
    constructor(props){
        super(props);
        this.state = {
            add : false,
            edit: false,
            idCategory: 0,
            description: '',
            image: null,
        }

        this.onChangeField = this.onChangeField.bind();
        this.selectCategory = this.selectCategory.bind();
    }
    
    componentDidMount(){
        this.props.getPictograms();
    }
    
    showAddPictogram = () => {
        this.setState({add: !this.state.add, edit: false})
    }

    onChangeField = (e, field) => {
        field === 'image' ? this.setState({ image: e.target.files[0]}) : this.setState({ [field] : e.target.value });
    }

    selectCategory = (e) => {
        this.setState({ idCategory: e.target.value})
    }

    addPictogram = () => {
        const pictogram = {
            description: this.state.description,
            image: this.state.image,
            idCategory: this.state.idCategory
        }
        this.props.addPictogram(pictogram);
        this.setState({ add: false });
    }

    deletePictogram = (id) => {
        this.props.deletePictogram(id);
    }
    
    // updatePictogram = () => {
    //     this.props.updatePictogram(this.state.idCategory, this.state.newDescriptionCategory);
    // }

    selectPictogram = pictogram => {
        this.props.selectPictogramToPhrase(pictogram);
    }

    render() {
        const { pictograms, categories, loadingPictograms, routines } = this.props;
        const { add, edit } = this.state;
        const titleDivAddEdit = add ? 'Nuevo Pictograma: ' : (edit && 'Editar Pictograma : ')
        const listPictograms = pictograms &&  pictograms !== undefined? pictograms.map(pictogram => {
            return (
                <div key={pictogram.id} className="pictogram">
                    <Pictogram image={pictogram.image} description={pictogram.description} onClick={ routines ? () => this.selectPictogram(pictogram) : () => {} } />
                    {!routines &&
                        <div className='buttons'>
                        <Button text='Eliminar' onClick={() => this.deletePictogram(pictogram.id)} />
                        {/* <Button text='Editar' onClick={() => this.deletePictogram(pictogram)} /> */}
                    </div>}
                </div>
            )
        }) : 'error'
        
        return (
            <div className='pictograms-component'>
                <div className={!routines ? 'pictograms-list' : 'pictograms-list routines'}>
                    <p>Pictograms</p>
                    <Categories list={true} />
                    {loadingPictograms ?
                        <h2>Cargando...</h2>
                        :
                        (pictograms.length === 0 ?
                            <h3>No hay pictogramas</h3>
                            :
                            <div className="pictograms">
                                {listPictograms}
                            </div>
                        )                        
                    }
                    
                    {!routines && <Button className='primary' text='Agregar Pictograma' onClick={this.showAddPictogram}/>}
                </div>
                {(add || edit) &&
                    <div className='add-edit'>
                        <h1>{titleDivAddEdit}</h1>
                        <Uploadfile label='Imagen: ' onChange={ e => { this.onChangeField(e, 'image') }} />
                        <TextField label='Descripcion: ' onChange={ e => { this.onChangeField(e, 'description') }} />
                        <Dropdown list={categories} onChange={this.selectCategory} label='Categoria' />
                        <Button text='Agregar' onClick={this.addPictogram} />
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loadingPictograms: state.pictograms.loading,
        categories: state.categories.categories,
        pictograms: state.pictograms.pictograms,
        pictogramsSelected: state.pictograms.pictogramsSelected,
        err: state.pictograms.err
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPictograms: () => dispatch(getPictograms()),
        getCategories: () => dispatch(getCategories()),
        addPictogram: pictogram => dispatch(addPictogram(pictogram)),
        deletePictogram: id => dispatch(deletePictogram(id)),
        // updatePictogram: (id, newDescription) => dispatch(updatePictogram(id, newDescription)),
        selectPictogramToPhrase: pictogram => dispatch(selectPictogramToPhrase(pictogram))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pictograms);
