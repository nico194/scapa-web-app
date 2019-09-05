import React, { Component } from 'react';
import Category from '../../molecules/category/Category';
import Button from '../../atoms/button/Button';
import TextField from '../../atoms/textfield/TextField';
import config from '../../../config';
import './Categories.css';

class Categories extends Component {
    constructor(props){
        super(props);
        this.state = {
            categories: [],
            add : false,
            edit: false,
            newCategory: '',
            editCategory: {}
        }

        this.showAddCategory = this.showAddCategory.bind();
        this.onChangeCategoryName = this.onChangeCategoryName.bind();
        this.addCategory = this.addCategory.bind()
        this.deleteCategory = this.deleteCategory.bind()
        this.updateCategory = this.updateCategory.bind()
    }

    componentDidMount(){
        fetch(`${config.ip}/categories`)
            .then(response => {
                        return response.json()
                    }
                )
            .then(categories => {this.setState({categories: categories})})
            .catch(error => { throw error});
    }

    showAddCategory = () => {
        this.setState({add: !this.state.add, edit: false})
    }

    showEditCategory = (category) => {
        this.setState({edit: true, editCategory: category, add: false});
    }

    onChangeCategoryName = (e) => {
        this.setState({ newCategory: e.target.value });
    }
    
    addCategory = () => {
        const category = { description : this.state.newCategory }
        fetch(`${config.ip}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        })
        .then(response => { return response.json(); })
        .then(data => {
                if(data.insert === 'success') {
                    let categories = this.state.categories;
                    categories.push({id: data.id, description: this.state.newCategory});
                    this.setState({newCategory: '' , categories: categories, add: false});
                } else {
                    console.log('error');
                }
            }
        )
        .catch(error => { throw error});
    }

    deleteCategory = (category) => {
        console.log('Category before: ', this.state.categories);
        const cat = category;
        fetch(`${config.ip}/categories/${category.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
                return response.json();
            }
        )
        .then(data => {
                if(data.delete === 'success'){
                    let categories = this.state.categories;
                    for(let i = 0; i < categories.length; i++){
                        if(categories[i].id === cat.id) {
                            console.log('index: ', i)
                            const element = categories.splice(i, 1);
                            console.log(element)
                        }
                    }
                    console.log('Category after: ', categories);
                    this.setState({categories: categories});
                } else {
                    console.log('error');
                }
            }
        )
        .catch(error => { throw error });
    }
    
    updateCategory = () => {
        const editCategory = this.state.editCategory;
        fetch(`${config.ip}/categories/${editCategory.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editCategory)
        })
        .then(response => {
                return response.json();
            }
        )
        .then(data => {
                if(data.update === 'success') {
                    let categories = this.state.categories;
                    categories.forEach( category => {
                        if(category.id === editCategory.id){
                            category.description = this.state.newCategory
                        }
                    })
                    this.setState({editCategory: {}, newCategory:'', edit: false, categories: categories});
                }
            }
        )
        .catch(error => { throw error});
    }

    render() {
        const { list } = this.props;
        const { categories, add, edit, editCategory } = this.state;
        const listCategories = categories.map(category =>{
            if(list) {
                return <li key={category.id}><Category description={category.description} list={list}/></li>
            } else {
                return (
                    <tr key={category.id}>
                        <td>{category.description}</td>
                        <td><Button onClick={() => this.deleteCategory(category)}/></td>
                        <td><Button  onClick={() => this.showEditCategory(category)}/></td>
                    </tr>
                )
            }
        })
        return (
            <div className='categories-component'>
                {list ?
                    <div className='categories-list'>
                        <ul>
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
                                    {listCategories}
                                </tbody>
                            </table>
                            <Button text='Agregar Categoria' onClick={this.showAddCategory} />
                        </div>
                        {add &&
                            <div className='category'>
                                <h1>Add Category:</h1>
                                <TextField id='txtAdd' text='Nombre de la categoria:  ' onChange={this.onChangeCategoryName} />
                                <Button text='Agregar' onClick={this.addCategory} />
                            </div>
                        }
                        {edit &&
                            <div className='category'>
                                <h1>Edit Category: {editCategory.description}</h1>
                                <TextField id='txtEdit' text='Nuevo nombre de la categoria:  ' onChange={this.onChangeCategoryName}/>
                                <Button text='Modificar' onClick={() => this.updateCategory()} />
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default Categories;
