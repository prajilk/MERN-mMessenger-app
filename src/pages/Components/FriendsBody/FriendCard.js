import React, { useContext } from 'react'
import { getAvatar } from '../../../api/avatarUrl'
import { AppContext } from '../../../context/AppContext'
import { SocketContext } from '../../../context/SocketContext';

function FriendCard({ friends, setState, setNav }) {

    const socket = useContext(SocketContext);
    const { user, setActiveMessage } = useContext(AppContext);


    function hideFindFriend() {
        document.getElementById('find-friend-div').style.transform = 'translateX(100%)';
    }

    const readyToSendMessage = (recipientId) => {
        socket.emit('ready-to-send-message', user, recipientId);
        setActiveMessage(recipientId)
        hideFindFriend();
        setNav('chat');
        setState(true)
        window.location.reload();
    }

    return (
        <>
            {friends.length !== 0 ? friends.map((friend, index) => {
                return (
                    <div className="frnd-card d-flex p-3 mb-2" key={index}>
                        <img src={getAvatar(friend.fullname, friend.color)} alt=".." width={'50px'} />
                        <div className='name-conatiner ms-3'>
                            <h6>{friend.fullname}</h6>
                            <small>@{friend.username}</small>
                        </div>
                        <div>
                            <button className='frnd-card-lg-btn' onClick={() => readyToSendMessage(friend._id)}>Message</button>
                        </div>
                    </div>
                )
            }) : <p>No result found!</p>}
        </>
    )
}

export default FriendCard
