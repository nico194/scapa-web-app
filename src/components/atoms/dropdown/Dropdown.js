import React from 'react'

const Dropdown = (props) => {
    const { options, onChange, label} = props;
    const list = options && options !== undefined ? options.map(element => {
        return (
            <option key={element.id} value={element.id}>{element.description}</option>
        )
    }) : '';
    return (
        <select onChange={onChange}>
            <option value="selected">Seleccione {label}...</option>
            {list}
        </select>
    )
}

export default Dropdown
