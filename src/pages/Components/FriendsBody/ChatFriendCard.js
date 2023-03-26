import React, { useContext, useEffect } from 'react'
import { getAvatar } from '../../../api/avatarUrl'
import { AppContext } from '../../../context/AppContext'
import { SocketContext } from '../../../context/SocketContext';

function ChatFriendCard({ chats, setChats }) {

    const { activeMessage, setActiveMessage } = useContext(AppContext);
    const socket = useContext(SocketContext);

    useEffect(() => {

        socket.on('recieve-message', ({ sender, message, timestamp }) => {

            document.getElementById(sender).style.cssText = 'color: #3380fc; font-weight: bolder;';
            document.getElementById(sender+'msgCount').style.display = 'block';

            const newObject = { sender: sender, message: message, timestamp: timestamp }

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
    }, [chats, setChats, socket])

    let width = window.innerWidth;
    const showMessages = (id) => {
        if (width <= 767) {
            document.getElementById('chat-area').style.display = 'block';
            document.getElementById('friends-nav').style.display = 'none';
        }

        if(document.getElementById(id) !== null){
            document.getElementById(id).style.cssText = 'color: ; font-weight: 400;';
            document.getElementById(id+'msgCount').style.display = 'none';
        }
        setActiveMessage(id);
    }

    const GetTime = ({ dateObj }) => {
        dateObj = new Date(dateObj);
        const time = dateObj.toLocaleTimeString('en-IN', { hour12: true, hour: "numeric", minute: "numeric" })
        return (<span className='time'>{time}</span>)
    }

    return (
        <>
            {chats.map((chat, index) => {
                return (
                    <div className={activeMessage === chat.receiver_details._id ? "frnd-card d-flex p-3 mb-2 active" : "frnd-card d-flex p-3 mb-2"} key={index} style={{ cursor: 'pointer' }} onClick={() => showMessages(chat.receiver_details._id)}>
                        <img src={getAvatar(chat.receiver_details.fullname, chat.receiver_details.color)} alt=".." width={'50px'} />
                        <div className='name-conatiner ms-3'>
                            <div className='d-flex justify-content-between w-100'>
                                <h6>{chat.receiver_details.fullname}</h6>
                                {chat.chats.length !== 0 && <GetTime dateObj={chat.chats[0].timestamp} />}
                            </div>
                            <div className='d-flex justify-content-between w-100'>
                                {chat.chats.length !== 0 && <small id={chat.receiver_details._id}>{chat.chats[0].message}</small>}
                                {chat.chats.length !== 0 && <div className="new-message-alert" id={chat.receiver_details._id+'msgCount'}><small>new</small></div>}
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default ChatFriendCard