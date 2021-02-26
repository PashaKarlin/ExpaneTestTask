import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from 'react-modal'
import { customStyles } from './reactModalStyles'
import { request } from 'graphql-request'



const UpdateForm: React.FC = ({ id, getClients, setClients }) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [ID,setID] = useState()
    const { register, handleSubmit } = useForm()
    const onSubmit = ( data) => {
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
                value = {id}
                onClick={openModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
                        <input className='form_input' name="firstName" ref={register({ required: true })} />
                    </div>
                    <div className='form_item'>
                        <label>Last Name : </label>
                        <input className='form_input' name="lastName" ref={register({ required: true })} />
                    </div>
                    <div className='form_item'>
                        <label>Phone : </label>
                        <input className='form_input' name="phone" ref={register({ required: true })} />
                    </div>
                    <div className='form_item'>
                        <label>Avatar : </label>
                        <input className='form_input' name="avatarUrl" ref={register({ required: true })} />
                    </div>
                    <input type="submit" value='Submit'/>
                </form>
            </Modal>
        </>
    )
}


export default UpdateForm;