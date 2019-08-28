import React, { Component } from 'react';
import Category from '../../molecules/category/Category';
import Button from '../../atoms/button/Button';
import TextField from '../../atoms/textfield/TextField';
import config from '../../../config';
import './Categories';

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
        this.showCategories = this.showCategories.bind();
        this.showAddCategory = this.showAddCategory.bind();
        this.onChangeCategoryName = this.onChangeCategoryName.bind();
        this.addCategory = this.addCategory.bind()
        this.deleteCategory = this.deleteCategory.bind()
        this.updateCategory = this.updateCategory.bind()
    }

    showCategories = () => {
        fetch(`${config.ip}/categories`)
            .then(response => {
                        return response.json()
                    }
                )
            .then(categories => {this.setState({categories: categories})})
            .catch(error => { throw error});
    }

    componentDidMount(){
        this.showCategories();
    }

    showAddCategory = () => {
        this.setState({add: !this.state.add})
    }

    showEditCategory = (category) => {
        this.setState({editCategory: category});
        this.setState({edit: !this.state.edit})
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
                    this.setState({categories: categories});
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
                    this.setState({categories: categories});
                }
            }
        )
        .catch(error => { throw error});
    }

    render() {
        const { list } = this.props;
        const { categories, add, newCategory, edit } = this.state;
        const listCategories = categories.map(category =>{
            if(list) {
                return <li key={category.id}><Category description={category.description} list={list}/></li>
                
            } else {
                return (
                    <tr key={category.id}>
                        <td>{category.description}</td>
                        <td><i className="fas fa-trash-alt" onClick={() => this.deleteCategory(category)}></i></td>
                        <td><i className="fas fa-edit" onClick={() => this.showEditCategory(category)}></i></td>
                    </tr>
                )
            } 
        })
        
        return (
            <div className="categories-component">
                <div className="list-categories">
                    {list ?
                        <ul>
                            {listCategories}
                        </ul>
                        :
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
                    }
                    <Button className='primary' text='Agregar Categoria' onClick={this.showAddCategory} />
                </div>
                {add &&
                    <div>
                        <h1>Add</h1>
                        <TextField text='Nombre de la categoria:  ' onChange={this.onChangeCategoryName} />
                        {newCategory}
                        <Button text='Agregar' onClick={this.addCategory} />
                    </div>
                }
                {edit &&
                    <div>
                        <h1>Edit</h1>
                        <TextField text='Nuevo nombre de la categoria:  ' onChange={this.onChangeCategoryName} />
                        {newCategory}
                        <Button text='Modificar' onClick={() => this.updateCategory()} />
                    </div>
                }
            </div>
        )
    }
}

export default Categories;
