import React from 'react'

const Button : React.FC = (props) => {
    return (
        <button className='mx-10 my-10 text-2xl text-white font-bold bg-purple-700 hover:bg-purple-800 py-2 px-4 rounded'
            onClick={props.onClick}>
            {props.name}
        </button>
    )
}
export default Button;