import React from 'react'

const Button : React.FC = (props) => {
    return (
        <button className=' mx-1 my-1 text-2xl text-white font-bold bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded'
            onClick={props.onClick}>
            {props.name}
        </button>
    )
}
export default Button;