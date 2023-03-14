import React from 'react'
import { HiSearch, HiUserAdd, HiX } from 'react-icons/hi';

function FindFriend() {

    function hideFindFriend() {
        document.getElementById('find-friend-div').style.transform = 'translateX(100%)';
    }

    return (
        <div className='find-friend-div' id='find-friend-div'>
            <div className='find-friend-heading'>
                <h5>Find Friends</h5>
                <button className='findFriend closefind' onClick={() => hideFindFriend()}><HiX /></button>
            </div>
            <div className='find-friend-input'>
                <form action="" className='m-0 p-0'>
                    <input type="text" name='find-friend' placeholder='Enter name' />
                    <button type='submit'><HiSearch /></button>
                </form>
            </div>
            <div className="find-friends-body">

                <div className='find-friends-body-title'>
                    <h6>Search results</h6>
                    <div className="card">
                        <div className='friends-card'>
                            <img src={`https://ui-avatars.com/api/?name=Prajil+K&background=0D8ABC&color=fff`} alt="" width={'40px'} />
                            <div className='name-conatiner ms-3'>
                                <h6>Prajil</h6>
                                <small>@prajil2001</small>
                            </div>
                            <div className='add-req'>
                                <button><p><HiUserAdd/></p></button>
                            </div>
                        </div>
                        <hr className='m-0' />
                    </div>
                </div>

                <div className='find-friends-body-title'>
                    <h6>Friend requests</h6>
                    <div className="card">
                        <div className='friends-card'>
                            <img src={`https://ui-avatars.com/api/?name=Prajil+K&background=0D8ABC&color=fff`} alt="" width={'40px'} />
                            <div className='name-conatiner ms-3'>
                                <h6>Prajil</h6>
                                <small>@prajil2001</small>
                            </div>
                            <div>
                                <button className='cancel-req'><HiX /></button>
                                <button className='accept-req'>+ Accept</button>
                            </div>
                        </div>
                        <hr className='m-0' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FindFriend;