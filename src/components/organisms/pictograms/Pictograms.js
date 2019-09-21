import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPictograms, addPictogram, deletePictogram, updatePictogram } from '../../../redux/actions/pictograms'
import { getCategories } from '../../../redux/actions/categories'
import Pictogram from '../../molecules/pictogram/Pictogram';
import Categories from '../categories/Categories';
import Button from '../../atoms/button/Button';
import TextField from '../../atoms/textfield/TextField';
import Uploadfile from '../../atoms/uploadFile/Uploadfile';
import Dropdown from '../../atoms/dropdown/Dropdown';
import './Pictograms.css';

class Pictograms extends Component {
    constructor(props){
        super(props);
        this.state = {
            add : false,
            edit: false,
            idCategory: 0,
        }

        // this.onChangeCategoryName = this.onChangeCategoryName.bind();
        // this.addPictogram = this.addPictogram.bind()
        // this.deletePictogram = this.deletePictogram.bind()
        // this.updatePictogram = this.updatePictogram.bind()
        this.selectCategory = this.selectCategory.bind();
    }
    
    componentDidMount(){
        this.props.getPictograms();
        this.props.getCategories();
    }
    
    showAddPictogram = () => {
        this.setState({add: !this.state.add, edit: false})
    }
    
    selectCategory = (e) => {
        this.setState({ idCategory: e.target.value})
    }

    // showEditCategory = (category) => {
    //     this.setState({edit: true, idCategory: category.id , newDescriptionCategory: category.description, add: false});
    // }

    // onChangeCategoryName = (e) => {
    //     this.setState({ newDescriptionCategory: e.target.value });
    // }
    
    addPictogram = () => {
        this.props.addPictogram();
    }

    // deletePictogram = (id) => {
    //     this.props.deletePictogram(id);
    // }
    
    // updatePictogram = () => {
    //     this.props.updatePictogram(this.state.idCategory, this.state.newDescriptionCategory);
    // }

    render() {
        const { pictograms, categories, loadingPictograms , loadingCategories } = this.props;
        const { add, edit } = this.state;
        console.log('loading categories: ', loadingCategories,)
        const titleDivAddEdit = add ? 'Nuevo Pictograma: ' : (edit && 'Editar Pictograma : ')
        const listPictograms = pictograms &&  pictograms !== undefined? pictograms.map(pictogram => {
            return (
                <div key={pictogram.id} className="pictogram">
                    <Pictogram image={pictogram.image} description={pictogram.description} />
                    <div>
                        <Button onClick={() => this.deletePictogram(pictogram.id)} >Eliminar</Button>
                        <Button onClick={() => this.deletePictogram(pictogram)} >Editar</Button>
                    </div>
                </div>
            )
        }) : 'error'
        
        return (
            <div className='pictograms-component'>
                <div className='pictograms-list'>
                    <h1>Pictograms</h1>
                    <Categories list={true}/>
                    
                    <Button text='Agregar Pictograma' onClick={this.showAddPictogram}/>
                </div>
                {(add || edit) &&
                    <div className='add-edit'>
                        <h1>{titleDivAddEdit}</h1>
                        <Uploadfile label='Imagen: ' plasceholder='Selecione una imagen...'/>
                        <TextField text='Descripcion: ' />
                        <Dropdown list={categories} onChange={this.selectCategory} label='Categoria' />
                        <Button text='Agregar' onClick={this.addPictogram} />
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('redux-state: ', state)
    return {
        loadingPictograms: state.pictograms.loading,
        loadingCategories: state.categories.loading,
        categories: state.categories.categories,
        pictograms: state.pictograms.pictograms,
        err: state.pictograms.err
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPictograms: () => dispatch(getPictograms()),
        getCategories: () => dispatch(getCategories()),
        // addPictogram: description => dispatch(addPictogram(description)),
        // deletePictogram: id => dispatch(deletePictogram(id)),
        // updatePictogram: (id, newDescription) => dispatch(updatePictogram(id, newDescription))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pictograms);
