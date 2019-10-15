import React from 'react'
import Button from '../../atoms/button/Button';
import './Modal.scss'

const Modal = (props) => {
    const { functionModal,closeModal, show, children } = props
    const showModalClass = show ? 'modal display-block' : 'modal display-none';
    return (
        <div className={showModalClass}>
            <div className="modal-main">
                {children}
                <Button text='Listo' onClick={functionModal} />
                <Button text='Cerrar' onClick={closeModal} />
            </div>
        </div>
    )
}

export default Modal
