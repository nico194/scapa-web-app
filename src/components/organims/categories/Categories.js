import React, { Component } from 'react';
import Category from '../../molecules/category/Category';

class Categories extends Component {
    render() {
        const { list, categories } = this.props;
        const listCategories = categories.map((category, index) =>{
            return <li><Category description={category.description} list={false}/></li>
        })
        return (
            <div className="categories-component">
                <ul>
                </ul>
            </div>
        )
    }
}

export default Categories;
