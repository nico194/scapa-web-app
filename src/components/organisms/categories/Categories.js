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
            newCategory: ''
        }
        this.showAddCategory = this.showAddCategory.bind();
        this.onChangeCategoryName = this.onChangeCategoryName.bind();
    }
    componentDidMount(){
        fetch(`${config.ip}/categories`)
            .then(response => {
                        return response.json()
                    }
                )
            .then(categories => {
                    this.setState({categories: categories})                    
                }
            )
            .catch(error => { throw error});
    }

    showAddCategory = () => {
        this.setState({add: !this.state.add})
    }

    onChangeCategoryName = (e) => {
        this.setState({ newCategory: e.target.value });
    }
    
    addCategory = () => {
        console.log('click');
        const category = { description : this.state.newCategory}
        fetch(`${config.ip}/categories`, {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        })
        .then(response => response.json())
        .then(add => {
            console.log('Se agrego: ', add);
        })
        .catch(error => { throw error});
    }

    render() {
        const { list } = this.props;
        const { categories, add, newCategory } = this.state;
        const listCategories = categories.map((category, index) =>{
            if(list) {
                return <li key={index}><Category description={category.description} list={list}/></li>
                
            } else {
                return (
                    <tr key={index}>
                        <td>{category.description}</td>
                        <td><i className="fas fa-trash-alt"></i></td>
                        <td><i className="fas fa-edit"></i></td>
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
                
                
            </div>
        )
    }
}

export default Categories;
