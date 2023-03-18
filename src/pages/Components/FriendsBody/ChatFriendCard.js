import React from 'react'
import { getAvatar } from '../../../api/avatarUrl'

function ChatFriendCard({ friends }) {
    return (
        <>
            {friends.map((friend)=>{
                return (
                    <div className="frnd-card d-flex p-3 mb-2">
                        <img src={getAvatar(friend.fullname, friend.color)} alt=".." width={'50px'} />
                        <div className='name-conatiner ms-3'>
                            <h6>{friend.fullname}</h6>
                            <small>@{friend.username}</small>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default ChatFriendCard