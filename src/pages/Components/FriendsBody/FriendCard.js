import React from 'react'

function FriendCard() {
    return (
        <div className="frnd-card active d-flex p-3 mb-2">
            <img src="https://ui-avatars.com/api/?name=Pohn+K&background=0D8ABC&color=fff" alt=".." width={'50px'} />
            <div className='name-conatiner ms-3'>
                <h6>Prajil</h6>
                <small>@prajil2001</small>
            </div>
        </div>
    )
}

export default FriendCard
