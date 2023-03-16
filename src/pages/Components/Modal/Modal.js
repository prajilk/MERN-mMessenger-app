import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import './Modal.css'

function Modal({ closeModal }) {

    const navigate = useNavigate();

    const signOutUser = () => {
        axios.get('/signout')
            .then(()=>{
                navigate('/signin');
            }).catch((err)=>{
                console.log(err);
            })
    }

    return (
        <div className='overlay' onClick={() => closeModal(false)}>
            <div className="signoutModal">
                <div className="modalHead">
                    <h5>Signout</h5>
                </div>
                <div className="modalBody">
                    <h6>Are you sure you wnat to sign out?</h6>
                </div>
                <div className="modalFooter">
                    <button className='btn btn-sm bg-danger' onClick={()=>closeModal(false)}>Cancel</button>
                    <button className='btn btn-sm bg-primary' onClick={signOutUser}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default Modal

