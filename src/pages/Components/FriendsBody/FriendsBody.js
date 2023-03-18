import React, { useState, useContext, useEffect } from 'react'
import { FaUserPlus } from 'react-icons/fa';
import { HiX, HiSearch } from 'react-icons/hi';
import ChatBody from './ChatBody';
import FriendCard from './FriendCard';
import { AppContext } from '../../../context/AppContext';
import { SocketContext } from '../../../context/SocketContext';
import axios from '../../../api/axios';

function FriendsBody() {

    const [friends, setFriends] = useState([]);
    const [width, setWidth] = useState('0');
    const [border, setBorder] = useState('0');
    const [icon, setIcon] = useState(<HiSearch />);

    const { reqNotification } = useContext(AppContext);
    const socket = useContext(SocketContext);

    useEffect(() => {
        try {
            axios.get('/get-friends')
            .then((response)=>{
                setFriends(response.data.friendsList);
            })
            socket.on('update-friend-list', (frndList)=>{
                setFriends(frndList);
            })
        } catch (error) {
            
        }
    }, [])

    function openSearch() {
        setWidth(width === '0' ? 'calc(100% - 30px)' : '0');
        setBorder(border === '0' ? '1px solid #01acfc' : '0');
        setIcon(icon.type === HiSearch ? <HiX /> : <HiSearch />);
    }

    function showFindFriend() {
        document.getElementById('find-friend-div').style.transform = 'translateX(0)';
    }

    const searchForFriend = (e) =>{
        console.log(friends.filter(frnd => frnd.username.includes(e.target.value)));
    }

    return (
        <div style={{ padding: '20px' }}>
            <div className='heading'>
                <h4>Friends</h4>
                <div className='search-field d-flex'>
                    <input type="text" className='searchInput' onChange={searchForFriend} style={{ width: width, border: border }} placeholder="Search friends" />
                    <button onClick={openSearch} className='friendSearch trans-btn'>{icon}</button>
                </div>
                <button
                    className='findFriend'
                    onClick={() => showFindFriend()}>
                    <FaUserPlus />
                    {reqNotification && <span className='notification-badge'></span>}
                </button>
            </div>
            <div className="chat-friend-list pt-4">
                {friends.length !== 0 ? (
                    <FriendCard friends={friends}/>
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
