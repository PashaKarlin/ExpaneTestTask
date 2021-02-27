import React from 'react'
import { useForm } from "react-hook-form";
import '../styles/form.css'

type Inputs = {
    example: string,
    exampleRequired: string,
};

const Form: React.FC = ({ closeModal, addClient, test }) => {
    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit = data => {
        addClient(data)
        closeModal()
    }
    return (
        <>
            <h1>Add Client</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form_item'>
                    <label>First Name : </label>
                    <input
                        className='form_input'
                        name="firstName"
                        ref={register({
                            required: true,
                            pattern: /^[A-Za-zА-Яа-я\-]+$/i
                        })} />
                </div>
                <div className='form_item'>
                    <label>Last Name : </label>
                    <input
                        className='form_input'
                        name="lastName"
                        ref={register({
                            required: true,
                            pattern: /^[A-Za-zА-Яа-я\-]+$/i
                        })} />
                </div>
                <div className='form_item'>
                    <label>Phone : </label>
                    <input
                        className='form_input'
                        name="phone"
                        ref={register({
                            required: true,
                            pattern: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
                        })} />
                </div>
                <div className='form_item'>
                    <label>Avatar : </label>
                    <input
                        className='form_input'
                        name="avatarUrl"
                        ref={register({
                            required: true,
                            pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g
                        })} />
                </div>
                <input type="submit" value='Submit' />
            </form>
        </>

    )
}

export default Form;