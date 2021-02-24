import React from 'react'
import { useForm } from "react-hook-form";
import '../styles/form.css'


type Inputs = {
    example: string,
    exampleRequired: string,
};

const Form: React.FC = ({closeModal,getData}) => {
    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit = data => {
        getData(data)
        closeModal()
    }
    // console.log(watch("firstName"))
    return (
        <>
            <h1>Add Client</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className = 'form_item'>
                    <label>First Name : </label>
                    <input className='form_input' name="firstName" ref={register({ required: true })} />
                </div>
                <div className = 'form_item'>
                    <label>Last Name : </label>
                    <input className='form_input' name="lastName" ref={register({ required: true })} />
                </div>
                <div className = 'form_item'> 
                    <label>Phone : </label>
                    <input className='form_input' name="phone" ref={register({ required: true })} />
                </div>
                <div className = 'form_item'>
                    <label>Avatar : </label>
                    <input className='form_input' name="avatarUrl" ref={register({ required: true })} />
                </div>
                <input type="submit" />
            </form>
        </>

    )
}

export default Form;