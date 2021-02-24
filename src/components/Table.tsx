import React, { useState } from 'react'
import Modal from 'react-modal'
import Button from './button'
import '../styles/table.css'
import Form from './Form'
import { customStyles } from './reactModalStyles'
// import Loader from './Loader'



const Table: React.FC = () => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [data, setData] = useState([])
    const getData = newData => {
        setData([...data, newData])
    }
    const openModal = () => {
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    console.log(data)
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
                    {data.map(item => {
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