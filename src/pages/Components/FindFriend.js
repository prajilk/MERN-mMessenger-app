import React from 'react'
import { HiSearch, HiX } from 'react-icons/hi';

function FindFriend() {

    function hideFindFriend(){
        document.getElementById('find-friend-div').style.transform = 'translateX(100%)';
    }

    return (
        <div className='find-friend-div' id='find-friend-div'>
            <div className='find-friend-heading'>
                <h5>Find Friends</h5>
                <button className='findFriend closefind'onClick={()=> hideFindFriend()}><HiX /></button>
            </div>
            <div className='find-friend-input'>
                <form action="" className='m-0 p-0'>
                    <input type="text" name='find-friend' placeholder='Enter name' />
                    <button type='submit'><HiSearch/></button>
                </form>
            </div>
        </div>
    )
}

export default FindFriend;