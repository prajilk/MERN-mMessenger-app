import React, { useState } from 'react'
import FriendCard from './FriendCard'
import { HiX, HiSearch } from 'react-icons/hi';

function ChatBody({ setState, setNav }) {

    const [chats, setChats] = useState(null);

    const [width, setWidth] = useState('0');
    const [border, setBorder] = useState('0');
    const [icon, setIcon] = useState(<HiSearch />);

    function openSearch() {
        setWidth(width === '0' ? '100%' : '0');
        setBorder(border === '0' ? '1px solid #01acfc' : '0');
        setIcon(icon.type === HiSearch ? <HiX /> : <HiSearch />);
    }

    return (
        <div style={{padding: '0px'}}>
            <div className='heading'>
                <h4>Chats</h4>
                <div className='search-field d-flex'>
                    <input type="text" style={{ width: width, border: border }} placeholder="Search chats" />
                    <button onClick={openSearch}>{icon}</button>
                </div>
            </div>
            <div className="chat-friend-list pt-4">
                {!chats === null ? (
                    <FriendCard />
                ) : (
                    <div className='no-chats'>
                        <h5>No chats available !</h5>
                        <p>Start a new chat now.</p>
                        <button onClick={()=>{
                            setState(false);
                            setNav('friend');
                        }}>Chat now</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatBody
