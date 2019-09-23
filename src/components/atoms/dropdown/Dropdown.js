import React from 'react'

const Dropdown = (props) => {
    const { list, onChange, label} = props;
    const options = list.map(element => {
        return (
            <option key={element.id} value={element.id}>{element.description}</option>
        )
    });

    return (
        <div>
        <label>{label} :</label>
            {list !== undefined && list.length < 0 ?
                <span>Cargando...</span>
                :
                <select onChange={onChange}>
                    <option value="selected">Seleccione {label}...</option>
                    {options}
                </select>
            }
        </div>
    )
}

export default Dropdown
