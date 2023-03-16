import React, { useState } from 'react'
import { FaUserPlus } from 'react-icons/fa';
import { HiX, HiSearch } from 'react-icons/hi';
import ChatBody from './ChatBody';
import FriendCard from './FriendCard';

function FriendsBody() {

    const [friends, setFriends] = useState(null);

    const [width, setWidth] = useState('0');
    const [border, setBorder] = useState('0');
    const [icon, setIcon] = useState(<HiSearch />);

    function openSearch() {
        setWidth(width === '0' ? 'calc(100% - 30px)' : '0');
        setBorder(border === '0' ? '1px solid #01acfc' : '0');
        setIcon(icon.type === HiSearch ? <HiX /> : <HiSearch />);
    }

    function showFindFriend() {
        document.getElementById('find-friend-div').style.transform = 'translateX(0)';
    }

    return (
        <div style={{ padding: '20px' }}>
            <div className='heading'>
                <h4>Friends</h4>
                <div className='search-field d-flex'>
                    <input type="text" className='searchInput' style={{ width: width, border: border }} placeholder="Search friends" />
                    <button onClick={openSearch} className='friendSearch trans-btn'>{icon}</button>
                </div>
                <button
                    className='findFriend'
                    onClick={() => showFindFriend()}>
                    <FaUserPlus />
                    <span className='notification-badge'></span>
                </button>
            </div>
            <div className="chat-friend-list pt-4">
                {!friends === null ? (
                    <FriendCard />
                ) : (
                    <div className='no-chats'>
                        <h5>No friends available !</h5>
                        <p>Add new friends now.</p>
                        <button onClick={() => {
                            showFindFriend()
                        }}>Add now</button>
                        
                    </div>
                )}
            </div>
        </div>
    )
}

export default FriendsBody
