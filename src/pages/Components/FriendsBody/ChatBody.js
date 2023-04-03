import React, { useContext, useEffect, useState } from 'react'
import ChatFriendCard from './ChatFriendCard';
import { HiX, HiSearch } from 'react-icons/hi';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';

function ChatBody({ setState, setNav }) {

    const navigate = useNavigate();

    const { chats, setChats, filteredList, setFilteredList } = useContext(AppContext);

    const [width, setWidth] = useState('0');
    const [border, setBorder] = useState('0');
    const [icon, setIcon] = useState(<HiSearch />);

    function openSearch() {
        setWidth(width === '0' ? '100%' : '0');
        setBorder(border === '0' ? '1px solid #01acfc' : '0');
        setIcon(icon.type === HiSearch ? <HiX /> : <HiSearch />);
    }

    useEffect(() => {
        setFilteredList(chats)
    }, [chats, setFilteredList])

    useEffect(() => {
        axios.get('/get-chat-list')
            .then((res) => {
                res.data.map((data) => data.chats.reverse())
                setChats(res.data);
                setFilteredList(res.data)

            }).catch(({ code, message }) => {
                navigate('/error', { state: { code, message }, replace: true })
            })
    }, [navigate, setChats, setFilteredList])

    const searchForFriend = (e) => {
        setFilteredList(chats.filter(chat => chat.receiver_details.username.includes(e.target.value) || chat.receiver_details.fullname.includes(e.target.value)));
    }

    return (
        <div style={{ padding: '20px' }}>
            <div className='heading'>
                <h4>Chats</h4>
                <div className='search-field d-flex'>
                    <input type="text" onChange={searchForFriend} style={{ width: width, border: border }} placeholder="Search chats" />
                    <button onClick={openSearch} className='trans-btn'>{icon}</button>
                </div>
            </div>
            <div className="chat-friend-list pt-4" >
                {chats.length !== 0 ? (
                    <ChatFriendCard chats={filteredList} setChats={setChats} />
                ) : (
                    <div className='no-chats'>
                        <h5>No chats available !</h5>
                        <p>Start a new chat now.</p>
                        <button onClick={() => {
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
