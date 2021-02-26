import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import gql from 'graphql-tag'
import {useMutation, useQuery} from 'react-query'
import { request } from 'graphql-request'
import fetch from 'isomorphic-fetch'
// import { request } from 'graphql-request'
// import {useQuery} from 'react-query'
import Button from './button'
import '../styles/table.css'
import Form from './Form'
import { customStyles } from './reactModalStyles'
import { useGQLQuery } from './useGQLQuery'
import axios from 'axios'

// import Loader from './Loader'

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
    
    // const  { data, isLoading, error } = useGQLQuery('getClients', GET_CLIENTS)

    // const fetchClientsData = () => {
    //     setClients([...clients.concat(data.getClients)])
    // }

    useEffect(() => {
        request('https://test-task.expane.pro/api/graphql', GET_CLIENTS).then(res => setClients(res.getClients))
    },[])

    const addClient =  data => {
        fetch('https://test-task.expane.pro/api/graphql',{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({query: `
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
        .then(response => response.json())
        .then(() => {
            request('https://test-task.expane.pro/api/graphql', GET_CLIENTS).then(res => setClients(res.getClients))
        })
        
    }
    const openModal = () => {
        setIsOpen(true);
        console.log(clients)
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    // if (isLoading) return <h1 className='loading_style p-auto'>Loading ... </h1>
    // if (error) return alert(error)



    return (
        <div className='flex flex-col h-screen my-auto items-center bgimg bg-cover'>
            {/* <Button onClick={fetchClientsData} name='fetch data' /> */}
            {/* <Button onClick={logData} name='log data' /> */}
            <Button name={'Add Client'} onClick={openModal} />
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                onRequestClose={closeModal}
                ariaHideApp={false}
            >
                <Form closeModal={closeModal} addClient = {addClient}/>
            </Modal>
            <div>
                {clients.map(item => {
                    return (
                        <div className='space-x-2 item m-1 flex'>
                            <div className="inline-block img_block">
                                <img src={item.avatarUrl} className='avatar' alt="/" />
                            </div>
                            <div className="space-y-2 inline-block m-auto">
                                <div className="block m-auto">
                                    <h4>Name :{item.firstName}</h4>
                                </div>
                                <div className="block m-auto">
                                    <h4>Last Name :{item.lastName}</h4>
                                </div>
                                <div className="block m-auto">
                                    <h4>Phone :{item.phone}</h4>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Table;