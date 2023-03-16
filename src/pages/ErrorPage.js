import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
function ErrorPage() {

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className='d-flex flex-column justify-content-center align-items-center text-white' style={{ height: 'calc(100vh - 40px)' }}>
            <div>
                <h3>{location.state.message}</h3>
                <p className='text-muted'>{location.state.code}</p>
                <button className='btn btn-primary' onClick={()=> navigate('/')}>Reload</button>
            </div>
        </div>
    )
}

export default ErrorPage