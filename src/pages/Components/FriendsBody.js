import React, { useState } from 'react'
import { HiX, HiSearch, HiUserAdd } from 'react-icons/hi';
import ChatBody from './ChatBody';

function FriendsBody({ setState, setNav }) {

    const [friends, setFriends] = useState(null);

    const [width, setWidth] = useState('0');
    const [border, setBorder] = useState('0');
    const [icon, setIcon] = useState(<HiSearch />);

    function openSearch() {
        setWidth(width === '0' ? 'calc(100% - 30px)' : '0');
        setBorder(border === '0' ? '1px solid #01acfc' : '0');
        setIcon(icon.type === HiSearch ? <HiX /> : <HiSearch />);
    }

    function showFindFriend(){
        document.getElementById('find-friend-div').style.transform = 'translateX(0)';
    }

    return (
        <div style={{padding: '20px'}}>
            <div className='heading'>
                <h4>Friends</h4>
                <div className='search-field d-flex'>
                    <input type="text" className='searchInput' style={{ width: width, border: border }} placeholder="Search friends" />
                    <button onClick={openSearch} className='friendSearch'>{icon}</button>
                </div>
                <button 
                    className='findFriend' 
                    onClick={()=>showFindFriend()}>
                        <HiUserAdd/>
                        <span className='notification-badge'></span>
                </button>
            </div>
            <div className="chat-friend-list pt-4">
                {!friends === null ? (
                    // <FriendCard />
                    <>Hi</>
                ) : (
                    <div className='no-chats'>
                        <h5>No friends available !</h5>
                        <p>Add new friends now.</p>
                        <button onClick={()=>{
                            setState(true)
                            setNav('chat')
                        }}>Add now</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FriendsBody
