import React, { useContext } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { AppContext } from '../../../context/AppContext';
import { getAvatar } from '../../../api/avatarUrl';

function UserProfile() {

    const { user } = useContext(AppContext);

    function hideUserProfile() {
        document.getElementById('user-profile-div').style.transform = 'translateX(-100%)';
    }

    return (
        <div className='user-profile-div' id='user-profile-div'>
            <div className="header">
                <button onClick={hideUserProfile} className='trans-btn'><FaArrowLeft /></button>
                <h5>Profile</h5>
            </div>
            <div className='body'>
                <img src={getAvatar(user.fullname, user.color)} alt="..." />
                <div className='d-flex justify-content-between align-items-center'>
                    <h3 id='name'>{user.fullname}</h3>
                </div>
                <p>@{user.username}</p>
            </div>

        </div>
    )
}

export default UserProfile;
