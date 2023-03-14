import axios from '../api/axios'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './homePage.css'
import { HiChatAlt2, HiUsers } from 'react-icons/hi';
import MessageBody from './Components/MessageBody';
import ChatBody from './Components/ChatBody';
import FriendsBody from './Components/FriendsBody';

function ChatsPage() {

    const navigate = useNavigate();

    const [activeMessage, setActiveMessage] = useState(null);
    const [user, setUser] = useState({});

    const [navActive, setNavActive] = useState('chat');

    const [chatBody, setChatBody] = useState(true);

    useEffect(() => {
        try {
            axios.get('/session')
                .then((res) => {
                    if (res.data.user === undefined) {
                        navigate('/signin')
                    } else {
                        setUser(res.data.user);
                    }
                })
        } catch { }
    }, [])

    useEffect(()=>{
        const friendActive = document.getElementById('friend-active');
        const chatActive = document.getElementById('chat-active');

        friendActive.addEventListener('click', ()=>{
            setNavActive('friend');
            setChatBody(false);
        })

        chatActive.addEventListener('click', ()=>{
            setNavActive('chat');
            setChatBody(true);
        })

    },[])

    return (
        <div className="home-page">
            <div class="row justify-content-center w-100" style={{ height: '100%' }}>
                <div class="user-nav col-md-1">
                    <div className="logo-container mt-3">
                        <img src={process.env.PUBLIC_URL + "/logo.png"} alt="..." style={{ width: '45px' }} />
                    </div>
                    <div className='nav-container'>
                        <div className={`chat-frnd p-4 ${navActive === 'chat' ? 'active' : ''}`} id='chat-active'>
                            <p><HiChatAlt2 /></p>
                        </div>
                        <div className={`chat-frnd p-4 ${navActive === 'friend' ? 'active' : ''}`} id='friend-active'>
                            <p><HiUsers /></p>
                        </div>
                    </div>
                    <div className='avatar-container'>
                        <img
                            src={`https://ui-avatars.com/api/?name=${user.fullname}&background=0D8ABC&color=fff`}
                            alt=".."
                            width={'40px'} />
                    </div>
                </div>
                <div class="friends-nav col-md-3 p-3">
                    {chatBody ? <ChatBody setState={setChatBody} setNav={setNavActive} /> : <FriendsBody setState={setChatBody} setNav={setNavActive} />}
                </div>
                <div class="chat-area col-md-8 p-3">
                    {!activeMessage === null ? (
                        <MessageBody />
                    ) : (
                        <div className='no-message-active'>
                            <img src={process.env.PUBLIC_URL + '/logo_w.png'} alt="..." width={'200px'} />
                            <p>Start sending messages to friends.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ChatsPage;