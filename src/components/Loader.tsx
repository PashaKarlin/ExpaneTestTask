import React from 'react'

const Loader: React.FC = () => {
    return (
        <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export default Loader;