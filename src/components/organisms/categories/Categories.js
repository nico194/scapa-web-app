import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories, addCategory, deleteCategory, updateCategory, unlinkCategory } from '../../../redux/actions/categories'
import { getPictograms, getPictogramsByCategory } from '../../../redux/actions/pictograms';
import Category from '../../molecules/category/Category';
import Button from '../../atoms/button/Button';
import TextField from '../../atoms/textfield/TextField';
import './Categories.scss';

class Categories extends Component {
    constructor(props){
        super(props);
        this.state = {
            add : false,
            edit: false,
            newDescriptionCategory: '',
            idCategory: 0,
        }

        this.onChangeCategoryName = this.onChangeCategoryName.bind();
        this.addCategory = this.addCategory.bind()
        this.deleteCategory = this.deleteCategory.bind()
        this.updateCategory = this.updateCategory.bind()
    }

    componentDidMount(){
        !this.props.patient && this.props.getCategories();
    }

    showAddCategory = () => {
        this.setState({add: !this.state.add, edit: false})
    }

    showEditCategory = (category) => {
        this.setState({edit: !this.state.edit, idCategory: category.id , newDescriptionCategory: category.description, add: false});
    }

    hideAddCategory = () =>{ 
        this.setState({add: false});
    }

    hideEditCategory = () => {
        this.setState({edit: false});
    }

    onChangeCategoryName = (e) => {
        this.setState({ newDescriptionCategory: e.target.value });
    }
    
    addCategory = () => {
        this.state.newDescriptionCategory !== '' && this.props.addCategory(this.state.newDescriptionCategory);
        this.setState({ add: false });
    }

    deleteCategory = (id) => {
        this.props.deleteCategory(id);
    }
    
    updateCategory = () => {
        this.props.updateCategory(this.state.idCategory, this.state.newDescriptionCategory);
        this.setState({ edit: false });
    }

    getPictograms = () => {
        this.props.getPictograms();
    }

    getPictogramsByCategory = (idCategory) => {
        this.props.getPictogramsByCategory(idCategory);
    }

    unlinkCategory = (idPatient, idCategory) => {
        this.props.unlinkCategory(idPatient, idCategory)
    }

    render() {
        const { categories, loading, list, patient, patientCategories } = this.props;
        const { add, edit, newDescriptionCategory } = this.state;
        let listCategories = [];
        if(list) {
            if(patient) {
                listCategories = patientCategories && patientCategories !== undefined ? patientCategories.map( category =>{
                    return <li key={category.id}><Category onClick={() => this.unlinkCategory(patient.id, category.id)} description={category.description} /></li>
                })
                :
                console.log('error categories patient')
            } else {
                listCategories = categories &&  categories !== undefined ? categories.map(category =>{
                    return <li key={category.id}><Category onClick={() => this.getPictogramsByCategory(category.id)} description={category.description} /></li>
                })
                :
                console.log('error categories list')
            }
        } else {
            listCategories = categories &&  categories !== undefined ? categories.map(category =>{
                return (
                    <tr key={category.id}>
                        <td>{category.description}</td>
                        <td><Button text="Borrar" onClick={() => this.deleteCategory(category.id)}/></td>
                        <td><Button text="Editar" onClick={() => this.showEditCategory(category)}/></td>
                    </tr>
                )
            })
            :
            console.log('error categories rows')
        }

        return (
            <div className='categories-component'>
                {list ?
                    <div className='categories-list'>
                        <p className='title'>Categorias</p>
                        <ul className='list'>
                            {!patient && <li ><Category onClick={this.getPictograms} description='Todos' /></li>}
                            {listCategories}
                        </ul>
                    </div>
                    :
                    <div className='categories-table'>
                        <div className='table'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Categorias</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading?
                                        <tr><td>Cargando...</td></tr>
                                        : listCategories
                                    }
                                </tbody>
                            </table>
                            <Button text='Agregar Categoria' onClick={this.showAddCategory} />
                        </div>
                        {add &&
                            <div className='category'>
                                <h1>Add Category:</h1>
                                <TextField id='txtAdd' label='Nombre de la categoria:  ' onChange={this.onChangeCategoryName} />
                                <Button text='Agregar' onClick={this.addCategory} />
                                <Button text='Cancelar' onClick={this.hideAddCategory } />
                            </div>
                        }
                        {edit &&
                            <div className='category'>
                                <h1>Edit Category: {newDescriptionCategory}</h1>
                                <TextField id='txtEdit' label='Nuevo nombre de la categoria:  ' onChange={this.onChangeCategoryName}/>
                                <Button text='Modificar' onClick={this.updateCategory} />
                                <Button text='Cancelar' onClick={this.hideEditCategory } />
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.categories.loading,
        categories: state.categories.categories,
        patientCategories: state.categories.patientCategories,
        err: state.categories.err
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCategories: () => dispatch(getCategories()),
        addCategory: description => dispatch(addCategory(description)),
        deleteCategory: id => dispatch(deleteCategory(id)),
        updateCategory: (id, newDescription) => dispatch(updateCategory(id, newDescription)),
        getPictograms: () => dispatch(getPictograms()),
        getPictogramsByCategory: idCategory => dispatch(getPictogramsByCategory(idCategory)),
        unlinkCategory: (idPatient, idCategory) => dispatch(unlinkCategory(idPatient, idCategory))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
