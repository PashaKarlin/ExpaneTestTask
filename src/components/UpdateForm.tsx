import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { request } from 'graphql-request'
import Modal from 'react-modal'
import { customStyles } from './reactModalStyles'


const UpdateForm: React.FC = ({ item, getClients, setClients }) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [ID, setID] = useState()
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        fetch('https://test-task.expane.pro/api/graphql', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
            mutation{
                updateClient(
                    id:${ID},
                    firstName:"${data.firstName}",
                    lastName:"${data.lastName}",
                    phone:"${data.phone}",
                    avatarUrl:"${data.avatarUrl}"
                    ){
                    firstName
                    lastName
                    phone
                    avatarUrl
                }
            }`})
        })
            .then(() => {
                request('https://test-task.expane.pro/api/graphql', getClients).then(res => setClients(res.getClients))
            })
        closeModal();
    }
    const openModal = (e) => {
        setID(e.target.value)
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <>
            <button
                value={item.id}
                onClick={openModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded button_update">
                Update Client
            </button>
            <Modal isOpen={modalIsOpen}
                style={customStyles}
                onRequestClose={closeModal}
                ariaHideApp={false}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Update Client</h1>
                    <div className='form_item'>
                        <label>First Name : </label>
                        <input
                            className='form_input'
                            name="firstName" defaultValue={item.firstName}
                            ref={register({ required: true, pattern: /^[A-Za-zА-Яа-я\-]+$/i})}
                        />
                    </div>
                    <div className='form_item'>
                        <label>Last Name : </label>
                        <input
                            className='form_input'
                            name="lastName"
                            defaultValue={item.lastName}
                            ref={register({ required: true , pattern:/^[A-Za-zА-Яа-я\-]+$/i})}
                        />
                    </div>
                    <div className='form_item'>
                        <label>Phone : </label>
                        <input
                            className='form_input'
                            name="phone"
                            defaultValue={item.phone}
                            ref={register({ required: true, pattern : /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/ })}
                        />
                    </div>
                    <div className='form_item'>
                        <label>Avatar : </label>
                        <input
                            className='form_input'
                            name="avatarUrl"
                            defaultValue={item.avatarUrl}
                            ref={register({ required: true ,
                                pattern : /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g})}
                        />
                    </div>
                    <input type="submit" value='Submit' />
                </form>
            </Modal>
        </>
    )
}


export default UpdateForm;