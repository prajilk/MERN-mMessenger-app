import React, { useContext, useEffect, useRef, useState } from 'react'
import { HiArrowLeft, HiPaperAirplane } from 'react-icons/hi2'
import { getAvatar } from '../../../api/avatarUrl';
import { AppContext } from '../../../context/AppContext';
import { SocketContext } from '../../../context/SocketContext';

function MessageBody() {

    const { activeMessage, setActiveMessage, chats, setChats, user } = useContext(AppContext);
    const socket = useContext(SocketContext);

    const [currentMessages, setCurrentMessages] = useState([]);
    const [isOnline, setIsOnline] = useState(false);
    const [onlineStatus, setOnlineStatus] = useState('online');

    let currentChat = chats.filter((chat) => {
        return chat.receiver_details._id === activeMessage;
    })
    currentChat = currentChat[0];

    useEffect(() => {
        if(chats.length !== 0)
            setCurrentMessages(currentChat.chats);
    }, [currentChat, chats.length])

    let width = window.innerWidth;

    function goBackToFriends() {
        document.getElementById('friends-nav').style.display = 'block';
        document.getElementById('chat-area').style.display = 'none';
    }

    const inputRef = useRef();
    socket.on('recieve-message', ({sender, message, timestamp})=>{
        
        const newObject = {sender: sender, message: message, timestamp: timestamp}

        const newData = chats.map((chat) => {
            if (chat.receiver_details._id === sender) {
                return {
                    ...chat,
                    chats: [newObject, ...chat.chats],
                };
            } else {
                return chat;
            }
        });
        setChats(newData);
    })

    const sendMsg = (e) => {
        e.preventDefault();
        const msg = inputRef.current.value;
        // Send message to server
        socket.emit('send-message', {message: msg, timestamp: new Date()}, user._id, activeMessage);

        const newObject = {sender: '', message: msg, timestamp: new Date()}

        const newData = chats.map((chat) => {
            if (chat.receiver_details._id === activeMessage) {
                return {
                    ...chat,
                    chats: [newObject, ...chat.chats],
                };
            } else {
                return chat;
            }
        });
        setChats(newData);

        inputRef.current.value = '';
    }

    const GetTime = ({dateObj}) =>{
        dateObj = new Date(dateObj);
        const time = dateObj.toLocaleTimeString('en-IN',{hour12:true, hour: "numeric", minute: "numeric"})
        return (<span>{time}</span>)
    }

    useEffect(()=>{
        socket.emit('check-online', activeMessage, (response)=>{
            setIsOnline(response);
        })
    },[currentChat, activeMessage, socket])

    const showMessage = () =>{
        document.getElementById('chat-area').style.display = 'none';
        document.getElementById('friends-nav').style.display = 'block';
        setActiveMessage(null);
    }

    const sendTyping = () => {
        socket.emit('sendTyping', user, activeMessage);
    }

    useEffect(()=>{
        socket.on('sendTyping', (receiver)=>{
            if(receiver === activeMessage){
                setOnlineStatus('typing...');
                setTimeout(() => {
                    setOnlineStatus('online');
                }, 3000);
            }
        });
    },[onlineStatus, activeMessage, socket])

    return (
        <div className='chat-container'>
            <div className="chat-header d-flex">
                {width <= 767 ?
                    <div onClick={width <= 480 ? goBackToFriends : ''}>
                        {width <= 767 ? <span className='text-white me-2' onClick={showMessage}><HiArrowLeft /></span> : ''}
                        {chats.length !== 0 && <img src={getAvatar(currentChat.receiver_details.fullname, currentChat.receiver_details.color)} alt="..." width={'50px'} />}
                    </div> :
                    <>{chats.length !== 0 && <img src={getAvatar(currentChat.receiver_details.fullname, currentChat.receiver_details.color)} alt="..." width={'50px'} />}</>
                    
                }
                <div className={isOnline ? 'online':'offline'}></div>
                <div className='name-conatiner user-details ms-3'>
                    {chats.length !== 0 && <h6>{currentChat.receiver_details.fullname}</h6>}
                    <small className={isOnline && 'online-status'}>{isOnline ? onlineStatus : 'offline'}</small>
                </div>
            </div>
            <div className='body-container'>
                <div className="chat-body mt-4">
                    {currentMessages.map((chat, index) => {
                        return <div 
                                    className={chat.sender === activeMessage ? "chat-message" : "chat-message-sender"} 
                                    key={index}>
                                        {chat.message}
                                        <GetTime dateObj={chat.timestamp}/>
                                </div>
                    })}
                </div>
            </div>
            <form onSubmit={sendMsg}>
                <input type="text" name="message" ref={inputRef} onChange={sendTyping} placeholder='Message...' />
                <button className='send-button' type='button' onClick={sendMsg}><HiPaperAirplane /></button>
            </form>
        </div>
    )
}

export default MessageBody
