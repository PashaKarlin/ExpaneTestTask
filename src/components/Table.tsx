import React, { useState,useEffect } from 'react'
import Modal from 'react-modal'
import Button from './button'
import '../styles/table.css'
import Form from './Form'
import { customStyles } from './reactModalStyles'
import { useQuery } from 'react-query'
// import Loader from './Loader'



const Table: React.FC = () => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [trueData, setData] = useState([])
    const {isLoading,error,data} = useQuery('data', () =>
        fetch('https://test-task.expane.pro/api/graphql').then(res =>
         console.log(res.json())))
    const getData = newData => {
        setData([...trueData, newData])
    }
    const openModal = () => {
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false)
    }
     
    



    return (
        <div className='flex flex-col h-screen my-auto items-center bgimg bg-cover'>
            <Button name={'Add Client'} onClick={openModal} />
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                onRequestClose={closeModal}
                ariaHideApp={false}
            >
                <Form closeModal={closeModal} getData={getData} />
            </Modal>
            <table className='table-auto'>
                <thead>
                    <tr>
                        <th className=' '>First Name</th>
                        <th className=' '>Last Name</th>
                        <th className=' '>Phone</th>
                        <th className=' '>AvatarUrl</th>
                    </tr>
                </thead>
                <tbody>
                    {trueData.map(item => {
                        return (
                            <tr>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.phone}</td>
                                <td>{item.avatarUrl}</td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </div>
    )
}

export default Table;