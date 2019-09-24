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
            description: '',
            image: null,

        }

        // this.onChangeCategoryName = this.onChangeCategoryName.bind();
        // this.addPictogram = this.addPictogram.bind()
        // this.deletePictogram = this.deletePictogram.bind()
        // this.updatePictogram = this.updatePictogram.bind()
        this.selectCategory = this.selectCategory.bind();
    }
    
    componentDidMount(){
        this.props.getPictograms();
    }
    
    showAddPictogram = () => {
        this.setState({add: !this.state.add, edit: false})
    }
    
    
    // showEditCategory = (category) => {
    //     this.setState({edit: true, idCategory: category.id , newDescriptionCategory: category.description, add: false});
    // }

    // onChangeCategoryName = (e) => {
    //     this.setState({ newDescriptionCategory: e.target.value });
    // }
    
    onChangeDescription = (e) => {
        this.setState({ description : e.target.value });
    }

    onChangeImage = (e) => {
        this.setState({ image: e.target.files[0]});
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

    render() {
        const { pictograms, categories, loadingPictograms , loadingCategories } = this.props;
        const { add, edit } = this.state;
        const titleDivAddEdit = add ? 'Nuevo Pictograma: ' : (edit && 'Editar Pictograma : ')
        const listPictograms = pictograms &&  pictograms !== undefined? pictograms.map(pictogram => {
            return (
                <div key={pictogram.id} className="pictogram">
                    <Pictogram image={pictogram.image} description={pictogram.description} />
                    <div className='buttons'>
                        <Button text='Eliminar' onClick={() => this.deletePictogram(pictogram.id)} />
                        {/* <Button text='Editar' onClick={() => this.deletePictogram(pictogram)} /> */}
                    </div>
                </div>
            )
        }) : 'error'
        
        return (
            <div className='pictograms-component'>
                <div className='pictograms-list'>
                    <p>Pictograms</p>
                    <Button onClick={this.allPictograms} text='Todos'/>
                    <Categories list={true}/>
                    {pictograms.length === 0 &&
                        <h3>No hay pictogramas</h3>
                    }
                    {loadingPictograms ?
                        <h2>Cargando...</h2>
                        :
                        <div className="pictograms">
                            {listPictograms}
                        </div>
                    }
                    
                    <Button className='primary' text='Agregar Pictograma' onClick={this.showAddPictogram}/>
                </div>
                {(add || edit) &&
                    <div className='add-edit'>
                        <h1>{titleDivAddEdit}</h1>
                        <Uploadfile label='Imagen: ' onChange={this.onChangeImage} />
                        <TextField label='Descripcion: ' onChange={this.onChangeDescription} />
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
        addPictogram: pictogram => dispatch(addPictogram(pictogram)),
        deletePictogram: id => dispatch(deletePictogram(id)),
        // updatePictogram: (id, newDescription) => dispatch(updatePictogram(id, newDescription))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pictograms);
