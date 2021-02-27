import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import gql from 'graphql-tag'
import { request } from 'graphql-request'
import fetch from 'isomorphic-fetch'
import Button from './button'
import '../styles/table.css'
import Form from './Form'
import { customStyles } from './reactModalStyles'
import UpdateForm from './UpdateForm'
import Loader from './Loader'


const GET_CLIENTS = gql`
    query{
        getClients{
            firstName,
            lastName,
            id,
            phone,
            avatarUrl
        }
    }
`



const Table: React.FC = () => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [clients, setClients] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(async () => {
        try {
            await request('https://test-task.expane.pro/api/graphql', GET_CLIENTS)
                .then(res => setClients(res.getClients))
        } catch (error) {
            alert('Something wrong, open console for details')
            console.log(error)
        }

    }, [])

    const addClient = async data => {
        try {
            setIsLoading(true)
            await fetch('https://test-task.expane.pro/api/graphql', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `
            mutation{
                addClient(
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
        } catch (error) {
            alert('Something wrong, open console for details')
            console.log(error)
        } finally {
            request('https://test-task.expane.pro/api/graphql', GET_CLIENTS).then(res => setClients(res.getClients))
            setIsLoading(false)
        }
    }
    const openModal = () => {
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    if (isLoading) return <Loader />

    return (
        <div className='flex flex-col my-auto items-center bgimg bg-cover table_background'>
            <header className = 'w-full sticky top-0 text-center addclient_block'>
                <Button name={'Add Client'} onClick={openModal} />
            </header>

            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                onRequestClose={closeModal}
                ariaHideApp={false}
            >
                <Form closeModal={closeModal} addClient={addClient} />
            </Modal>
            <div>
                {clients.map(item => {
                    return (
                        <div className='space-x-2 m-1 flex item'>
                            <div className="inline-block img_block">
                                <img src={item.avatarUrl} className='avatar' alt="Client avatar" />
                            </div>
                            <div className='information_block'>
                                <div className="">
                                    <h4>Name : {item.firstName}</h4>
                                </div>
                                <div className="">
                                    <h4>Last Name : {item.lastName}</h4>
                                </div>
                                <div className="">
                                    <h4>Phone : {item.phone}</h4>
                                </div>
                            </div>
                            <UpdateForm item={item} getClients={GET_CLIENTS} setClients={setClients} />
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Table;